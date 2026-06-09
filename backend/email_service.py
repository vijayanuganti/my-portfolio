"""
Send transactional email via Brevo (Sendinblue) API or SMTP relay.
"""
import html
import logging
import os
import smtplib
import ssl
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

import httpx

logger = logging.getLogger(__name__)

BREVO_API_URL = "https://api.brevo.com/v3/smtp/email"


def _get_brevo_config() -> dict:
    api_key = os.environ.get("BREVO_API_KEY", "").strip()
    sender_email = os.environ.get("BREVO_SENDER_EMAIL", "").strip()
    sender_name = os.environ.get("BREVO_SENDER_NAME", "Portfolio Contact").strip()
    recipient_email = os.environ.get("CONTACT_RECIPIENT_EMAIL", "").strip()
    smtp_login = os.environ.get("BREVO_SMTP_LOGIN", "").strip()
    smtp_key = os.environ.get("BREVO_SMTP_KEY", "").strip()

    if not sender_email:
        raise ValueError("BREVO_SENDER_EMAIL is not set in backend/.env")
    if not recipient_email:
        raise ValueError("CONTACT_RECIPIENT_EMAIL is not set in backend/.env")
    if not api_key and not (smtp_login and smtp_key):
        raise ValueError(
            "Set BREVO_API_KEY or both BREVO_SMTP_LOGIN and BREVO_SMTP_KEY in backend/.env"
        )

    return {
        "api_key": api_key,
        "sender_email": sender_email,
        "sender_name": sender_name,
        "recipient_email": recipient_email,
        "smtp_login": smtp_login,
        "smtp_key": smtp_key,
    }


def _build_email_content(*, name: str, email: str, message: str) -> dict:
    safe_name = html.escape(name)
    safe_email = html.escape(email)
    safe_message = html.escape(message)

    subject = f"Portfolio Contact: {name}"
    html_content = f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #6366f1;">New portfolio message</h2>
      <p>You received a new message from your portfolio contact form.</p>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr>
          <td style="padding: 8px 0; font-weight: bold; width: 100px;">Name</td>
          <td style="padding: 8px 0;">{safe_name}</td>
        </tr>
        <tr>
          <td style="padding: 8px 0; font-weight: bold;">Email</td>
          <td style="padding: 8px 0;">
            <a href="mailto:{safe_email}">{safe_email}</a>
          </td>
        </tr>
      </table>
      <div style="background: #f1f5f9; padding: 16px; border-radius: 8px; border-left: 4px solid #10b981;">
        <p style="margin: 0 0 8px; font-weight: bold;">Message</p>
        <p style="margin: 0; white-space: pre-wrap;">{safe_message}</p>
      </div>
      <p style="color: #64748b; font-size: 12px; margin-top: 24px;">
        Reply directly to this email to respond to {safe_name}.
      </p>
    </div>
    """
    text_content = (
        f"New portfolio message\n\n"
        f"Name: {name}\n"
        f"Email: {email}\n\n"
        f"Message:\n{message}\n"
    )
    return {
        "subject": subject,
        "html_content": html_content,
        "text_content": text_content,
    }


def _parse_brevo_error(status_code: int, body: str) -> str:
    if status_code == 401 and "IP address" in body:
        return (
            "Brevo blocked your server IP. Open "
            "https://app.brevo.com/security/authorised_ips and disable "
            "'Authorized IPs' or add your current IP address, then try again."
        )
    if status_code == 401:
        return "Invalid Brevo API key. Check BREVO_API_KEY in backend/.env."
    if status_code == 400 and "sender" in body.lower():
        return (
            "Sender email not verified in Brevo. Go to SMTP & API → Senders & IP "
            "and verify your BREVO_SENDER_EMAIL."
        )
    return f"Brevo rejected the email (HTTP {status_code}). Check Brevo dashboard logs."


async def _send_via_brevo_api(config: dict, *, name: str, email: str, content: dict) -> None:
    payload = {
        "sender": {
            "name": config["sender_name"],
            "email": config["sender_email"],
        },
        "to": [{"email": config["recipient_email"], "name": config["sender_name"]}],
        "replyTo": {"email": email, "name": name},
        "subject": content["subject"],
        "htmlContent": content["html_content"],
        "textContent": content["text_content"],
    }
    headers = {
        "api-key": config["api_key"],
        "Content-Type": "application/json",
        "accept": "application/json",
    }

    async with httpx.AsyncClient(timeout=30.0) as client:
        response = await client.post(BREVO_API_URL, json=payload, headers=headers)

    if response.status_code >= 400:
        logger.error("Brevo API error %s: %s", response.status_code, response.text)
        raise RuntimeError(_parse_brevo_error(response.status_code, response.text))


def _send_via_brevo_smtp(config: dict, *, name: str, email: str, content: dict) -> None:
    msg = MIMEMultipart("alternative")
    msg["Subject"] = content["subject"]
    msg["From"] = f"{config['sender_name']} <{config['sender_email']}>"
    msg["To"] = config["recipient_email"]
    msg["Reply-To"] = f"{name} <{email}>"
    msg.attach(MIMEText(content["text_content"], "plain"))
    msg.attach(MIMEText(content["html_content"], "html"))

    try:
        with smtplib.SMTP("smtp-relay.brevo.com", 587, timeout=30) as server:
            server.starttls(context=ssl.create_default_context())
            server.login(config["smtp_login"], config["smtp_key"])
            server.sendmail(config["sender_email"], [config["recipient_email"]], msg.as_string())
    except smtplib.SMTPException as exc:
        logger.error("Brevo SMTP error: %s", exc)
        raise RuntimeError(
            "Brevo SMTP failed. In Brevo go to SMTP & API and copy your SMTP login "
            "(account email) and SMTP key into BREVO_SMTP_LOGIN and BREVO_SMTP_KEY."
        ) from exc


async def send_contact_notification(*, name: str, email: str, message: str) -> None:
    """Email portfolio owner when a visitor submits the contact form."""
    config = _get_brevo_config()
    content = _build_email_content(name=name, email=email, message=message)
    last_error = None

    if config["api_key"]:
        try:
            await _send_via_brevo_api(config, name=name, email=email, content=content)
            logger.info(
                "Contact notification sent via Brevo API to %s (from %s)",
                config["recipient_email"],
                email,
            )
            return
        except RuntimeError as exc:
            last_error = exc
            logger.warning("Brevo API failed, trying SMTP fallback if configured: %s", exc)

    if config["smtp_login"] and config["smtp_key"]:
        _send_via_brevo_smtp(config, name=name, email=email, content=content)
        logger.info(
            "Contact notification sent via Brevo SMTP to %s (from %s)",
            config["recipient_email"],
            email,
        )
        return

    if last_error:
        raise last_error
    raise RuntimeError("No Brevo delivery method is configured.")
