module.exports = (token) =>
	'<h2>안녕하세요. SeoulPlogFiesta입니다.</h2>' +
	'<h2>고객님의 비밀번호 변경을 위해 아래의 링크를 클릭해주세요.</h2>' +
	'<a href= "' +
	process.env.SERVER_URL +
	'/auth/checkEmail?token=' +
	token +
	'">비밀번호 재설정 링크<a>';
