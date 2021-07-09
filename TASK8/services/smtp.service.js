const smtpMailer = require('nodemailer');
const { constant: { OUTGOING_EMAIL, EMAIL_PASSWORD } } = require('../constants');

const smtp = smtpMailer.createTransport({
  service: 'gmail',
  auth: {
    user: OUTGOING_EMAIL,
    pass: EMAIL_PASSWORD
  }
});

const outgoingMail = async (userAddress) => {
  await smtp.sendMail({
    from: 'Pavlo Muharski',
    to: userAddress,
    subject: 'Your registration in base',
    text: ' Bla-bla-bla'
    // html:'<div>Hello new user<div>'
  });
};

module.exports = {
  outgoingMail
};
