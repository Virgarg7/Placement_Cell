module.exports = function makeSendEmail({ nodemailer, sendEmailQueue }) {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.DB_EMAIL_USER,
      pass: process.env.DB_EMAIL_PASSWORD,
    },
  });

  sendEmailQueue.process(async (job) => {
    console.log(
      await transporter.sendMail({
        from: 'Placement Tracker <democera@gmail.com>',
        to: job.data.to,
        subject: job.data.subject,
        html: job.data.body,
      })
    );
  });
};
