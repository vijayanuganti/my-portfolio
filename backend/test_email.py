"""Test Brevo email delivery. Run from backend folder: python test_email.py"""
import asyncio
import sys

from dotenv import load_dotenv

load_dotenv(".env")

from email_service import send_contact_notification


async def main():
    print("Sending test contact email...")
    try:
        await send_contact_notification(
            name="Portfolio Test",
            email="visitor-test@example.com",
            message="If you receive this, Brevo email delivery is working.",
        )
    except Exception as exc:
        print("FAILED:", exc)
        sys.exit(1)
    print("SUCCESS: Check your CONTACT_RECIPIENT_EMAIL inbox (and spam folder).")


if __name__ == "__main__":
    asyncio.run(main())
