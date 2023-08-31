const createRedirectUrl = (passwordToken, email) =>
	process.env.FRONT_URL +
	'/changepassword?email=' +
	email +
	'&token=' +
	passwordToken;

module.exports = createRedirectUrl;
