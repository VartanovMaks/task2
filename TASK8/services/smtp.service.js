const EmailTemplates = require('email-templates');
const smtpMailer = require('nodemailer');
const path = require('path');

const { responseCodesEnum: { NO_CONTENT } } = require('../constants');
const { WRONG_TEMPLATE } = require('../errors/error-messages');
const ErrorHandler = require('../errors/ErrorHandler');

const { constant: { OUTGOING_EMAIL, EMAIL_PASSWORD } } = require('../constants');
const templateData = require('../email-templates');

const templateParser = new EmailTemplates({
  views: {
    root: path.join(process.cwd(), 'email-templates')
  }
});

const smtp = smtpMailer.createTransport({
  service: 'gmail',
  auth: {
    user: OUTGOING_EMAIL,
    pass: EMAIL_PASSWORD
  }
});

const outgoingMail = async (userAddress, action, data) => {
  const templateChoosen = templateData[action];

  if (!templateChoosen) {
    throw new ErrorHandler(NO_CONTENT, WRONG_TEMPLATE.message, WRONG_TEMPLATE.code);
  }
  const message = await templateParser.render(templateChoosen.templateName, data);

  await smtp.sendMail({
    from: 'Pavlo Muharski',
    to: userAddress,
    subject: templateChoosen.subject,
    html: message
  });
};

module.exports = {
  outgoingMail
};
