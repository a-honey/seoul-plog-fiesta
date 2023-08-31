import authService from '../services/authService';
import randomToken from '../utils/randomToken';
import sendMail from '../utils/sendMail';
import passwordChangeGuide from '../utils/passwordChangeGuide';
import createRedirectUrl from '../utils/createRedirectUrl';

/** @description 회원가입 -> 새로운 유저를 생성 */
const createUser = async (req, res, next) => {
	try {
		const userData = req.body;
		//비밀번호 확인

		if (userData.password !== userData.confirmPassword)
			throw new Error('비밀번호 확인 불일치');
		const user = await authService.createUser(userData);
		res.status(201).json(user);
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

/** @description 로그인 -> token, 그룹아이디, 친구관계를 반환 */
const login = async (req, res, next) => {
	try {
		const id = req.user.id;
		const groups = await authService.getGroupsByUserId(id);
		const friendships = await authService.getFriendIdsByUserId(id);
		const user = {
			id: id,
			token: req.token,
			email: req.user.email,
			nickname: req.user.nickname,
			groups: groups,
			friendshipsA: friendships,
		};
		res.status(200).json(user);
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

/** @description 이메일 발송 ->
 * 토큰이 포함된 url 발송*/
const sendEmailWithTokenUrl = async (req, res, next) => {
	try {
		const nickname = req.body.nickname;
		const email = req.body.email;
		if (!nickname || !email) throw new Error('닉네임과 이메일을 입력해주세요');
		const existingUser = await authService.getUserByEmail(email);
		if (existingUser.nickname !== nickname)
			throw new Error('일치하는 사용자가 없습니다.');

		//링크에 포함될 랜덤 토큰 생성
		const token = randomToken.createRandomToken();

		const html = passwordChangeGuide(token);
		await sendMail(email, '[SeoulPlogFiesta] 비밀번호 변경 안내', html);

		//사용자의 토큰 업데이트
		const user = await authService.updatePasswordTokenByEmail(email, token);
		res.status(200).json(user);
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

/** @description 이메일 인증 */
const checkEmail = async (req, res, next) => {
	const token = req.query.token;
	try {
		const user = await authService.getUserByPasswordToken(token);
		const updatedUser = await authService.updatePasswordValidByEmail(
			user.email,
		);
		const passwordToken = updatedUser.passwordToken;
		const email = updatedUser.email;
		const redirectURL = createRedirectUrl(passwordToken, email);
		res.redirect(redirectURL);
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

/** @description 비밀번호 변경*/
const changePassword = async (req, res, next) => {
	try {
		//token, email, 변경될 password를 받음
		const { passwordToken, email, password } = req.body;
		const user = await authService.getUserByEmail(email);

		if (!passwordToken || !email || !password) {
			throw new Error('요청 데이터가 부족합니다.');
		}
		if (!user.passwordToken) {
			throw new Error('인증이 확인되지 않았습니다.');
		}
		//현재 시간
		const currentTime = new Date();

		//토큰 유효 시간과 현재 시간 차이
		let diff = Math.abs(currentTime.getTime() - user.passwordValid.getTime());
		diff = Math.ceil(diff / (1000 * 60 * 60 * 24));

		//3일 이상 지났을 때
		if (user.passwordToken == passwordToken && diff > 3) {
			throw new Error('비밀번호 인증 기간이 지났습니다.');
		}
		if (!user.passwordToken == passwordToken) {
			throw new Error('권한이 없습니다.');
		}

		//비밀번호 변경
		const updatedUser = await authService.changePassword(email, password);
		res.status(200).json(updatedUser);
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

/** @description 회원정보 변경*/
const changeInformation = async (req, res, next) => {
	try {
		if (!req.body.password) {
			throw new Error('비밀번호를 입력해주세요');
		}

		const user = {
			id: req.user.id,
			nickname: req.body.nickname || req.user.nickname, //입력하지 않으면 기존 정보 유지
			name: req.body.name || req.user.name,
			about: req.body.about || req.user.about,
			activity: req.body.activity || req.user.activity,
			password: req.body.password,
		};

		const changedUser = await authService.changeInformation(user);
		res.status(200).json(changedUser);
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

const changePasswordByCheckOriginPassword = async (req, res, next) => {
	try {
		const { password, newPassword, newConfirmPassword } = req.body;

		if (newPassword !== newConfirmPassword) {
			throw new Error('비밀번호와 확인 비밀번호가 일치하지 않습니다.');
		}
		const user = {
			id: req.user.id,
			password: password,
			newPassword: newPassword,
		};
		const updatedUser = await authService.changePasswordByCheckOriginPassword(
			user,
		);
		res.status(200).json(updatedUser);
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

/** @description 회원 탈퇴*/
const removeUser = async (req, res, next) => {
	try {
		const id = req.user.id;
		const groups = await authService.getGroupsByUserId(id);
		const friendships = await authService.getFriendIdsByUserId(id);
		if (groups.length !== 0)
			throw new Error('가입하거나 생성한 그룹이 있으면 탈퇴할 수 없습니다');
		/*
      res
        .status(500)
        .json({
          message: '가입하거나 생성한 그룹이 있으면 탈퇴할 수 없습니다.',
        });
        */
		if (friendships.length !== 0)
			throw new Error('친구관계가 있으면 탈퇴할 수 없습니다.');

		//프로필 이미지가 있으면 있으면 삭제
		await authService.deleteUserProfileImageByUserId(id);

		//인증글의 이미지 삭제
		await authService.deleteCertPostImagesByUserId(id);

		//개인 인증글 및 인증글의 댓글 삭제
		await authService.deleteCertPostsAndCommentsByUserId(id);

		//사용자의 모든 댓글 및 댓글 부모 삭제
		await authService.deleteMyCommentsOnOtherUserCertPosts(id);

		//회원 삭제
		const user = await authService.removeUser(id);
		res.status(200).json(user);
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

module.exports = {
	createUser,
	login,
	sendEmailWithTokenUrl,
	changeInformation,
	removeUser,
	checkEmail,
	changePassword,
	changePasswordByCheckOriginPassword,
};
