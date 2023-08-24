import chatService from '../services/chatService';

const getUnreadChatList = async (req, res, next) => {
	try {
		const userId = req.user.id;
		const unreadChatList = await chatService.getUnreadChatList(userId);
		if (unreadChatList.length === 0) return res.status(204);

		console.log('읽지 않은 채팅 목록 조회 성공');
		res.status(200).json(unreadChatList);
	} catch (error) {
		console.error(error);
		error.status = 500;
		next(error);
	}
};

module.exports = { getUnreadChatList };