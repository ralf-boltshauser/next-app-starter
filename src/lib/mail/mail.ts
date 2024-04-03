'use server';
import sgMail from '@sendgrid/mail';

const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
if (SENDGRID_API_KEY !== undefined) {
  sgMail.setApiKey(SENDGRID_API_KEY);
}

export async function sendMail(msg: sgMail.MailDataRequired) {
  if (SENDGRID_API_KEY === undefined) {
    console.error('SENDGRID_API_KEY is not set, email not sent.');
    return;
  }

  console.error(process.env.NODE_ENV);

  if (process.env.NODE_ENV === 'development') {
    console.log('Email not sent in test environment.' + JSON.stringify(msg));
    return;
  }

  try {
    await sgMail.send(msg);
  } catch (error) {
    console.error(error);
  }
}
