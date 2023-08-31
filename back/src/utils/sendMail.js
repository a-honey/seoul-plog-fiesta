const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: process.env.NODE_MAILER_USER,
		pass: process.env.NODE_MAILER_PASS,
	},
});

const sendMail = (to, subject, html) =>
	new Promise((resolve, reject) => {
		const message = {
			to,
			subject,
			html,
		};
		transport.sendMail(message, (err, info) => {
			if (err) {
				reject(err);
				return;
			}
			resolve(info);
		});
	});

module.exports = sendMail;
