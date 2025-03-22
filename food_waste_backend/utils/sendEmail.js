const { Resend } = require('resend');
const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({ to, subject, html }) => {
  try {
    const { data, error } = await resend.emails.send({
      from: 'Food Waste App <onboarding@thefoodshare.dev>', // you can use this in dev mode
      to,
      subject,
      html
    });

    if (error) {
      console.error('Resend email error:', error);
      return false;
    }

    console.log('✅ Email sent:', data);
    return true;
  } catch (err) {
    console.error('Resend sendEmail() failed:', err);
    return false;
  }
};

module.exports = sendEmail;
