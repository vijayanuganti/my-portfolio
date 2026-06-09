export const RESUME_PDF_URL = `${process.env.PUBLIC_URL}/pdfs/Vijay_resume.pdf`;
export const RESUME_DOWNLOAD_NAME = 'Anuganti_Vijay_Kumar_Resume.pdf';

export const viewResume = () => {
  window.open(RESUME_PDF_URL, '_blank', 'noopener,noreferrer');
};

export const downloadResume = () => {
  const link = document.createElement('a');
  link.href = RESUME_PDF_URL;
  link.download = RESUME_DOWNLOAD_NAME;
  link.rel = 'noopener noreferrer';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
