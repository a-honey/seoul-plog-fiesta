const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const createCertPost = async (userId, certPostData) => {
	try {
		const participants = certPostData.participants || [];
		console.log(certPostData.groupName);
		if (certPostData.isGroupPost && certPostData.groupName) {
			const group = await prisma.group.findUnique({
				where: {
					name: certPostData.groupName,
				},
				select: {
					id: true,
				},
			});
			if (!group) {
				throw new Error('그룹이 존재하지 않음');
			}
			const userInGroup = await prisma.groupUser.findFirst({
				where: {
					groupId: group.id,
					userId: userId,
				},
			});
			if (!userInGroup) {
				throw new Error('그룹에 속해있지 않음');
			}
		}

		return await prisma.certPost.create({
			data: {
				...certPostData,
				writerId: userId,
				participants: {
					create: participants.map((participant) => ({
						participant,
					})),
				},
			},
		});
	} catch (error) {
		throw error;
	}
};

const getAllCertPosts = async () => {
	try {
		const certPosts = await prisma.certPost.findMany({
			include: {
				images: {
					select: {
						imageUrl: true,
					},
				},
				participants: {
					select: {
						participant: true,
					},
				},
				comments: true,
			},
		});

		return certPosts.map((certPost) => {
			const imageUrls = certPost.images.map((image) => image.imageUrl);
			const participants = certPost.participants.map(
				(participant) => participant.participant,
			);
			const comments = certPost.comments.map((comment) => ({
				id: comment.id,
				content: comment.content,
				writerId: comment.writerId,
				createdAt: comment.createdAt,
			}));
			return {
				...certPost,
				comments: comments,
				images: imageUrls,
				participants: participants,
			};
		});
	} catch (error) {
		throw error;
	}
};

const getCertPostDetails = async (certPostId) => {
	try {
		const certPost = await prisma.certPost.findUnique({
			where: {
				id: certPostId,
			},
			include: {
				images: {
					select: {
						imageUrl: true,
					},
				},
				participants: {
					select: {
						participant: true,
					},
				},
				comments: true,
			},
		});
		if (!certPost) {
			throw new Error('인증게시글이 없음');
		}
		const imageUrls = certPost.images.map((image) => image.imageUrl);
		const participants = certPost.participants.map(
			(participant) => participant.participant,
		);
		return {
			...certPost,
			images: imageUrls,
			participants: participants,
		};
	} catch (error) {
		throw error;
	}
};

const updateCertPost = async (certPostId, certPostData) => {
	try {
		const { participants, ...updatedFields } = certPostData;
		const updateData = { ...updatedFields };

		if (participants !== undefined) {
			await prisma.certPostParticipant.deleteMany({
				where: { certPostId: certPostId },
			});

			const newParticipants = participants.map((participant) => ({
				participant: participant,
				certPostId: certPostId,
			}));

			await prisma.certPostParticipant.createMany({
				data: newParticipants,
			});
		}

		return await prisma.certPost.update({
			where: { id: certPostId },
			data: updateData,
		});
	} catch (error) {
		throw error;
	}
};
const deleteCertPostImages = async (certPostId) => {
	try {
		await prisma.certPostImage.deleteMany({
			where: { certPostId: certPostId },
		});
	} catch (error) {
		throw error;
	}
};

const deleteCertPostParticipants = async (certPostId) => {
	try {
		await prisma.certPostParticipant.deleteMany({
			where: { certPostId: certPostId },
		});
	} catch (error) {
		throw error;
	}
};

const deleteCertPost = async (certPostId) => {
	try {
		await prisma.certPost.delete({
			where: { id: certPostId },
		});
	} catch (error) {
		throw error;
	}
};

const getTopMainCertPostContributors = async () => {
	try {
		const certPosts = await prisma.certPost.findMany({
			select: {
				writerId: true,
			},
		});
		const userCounts = certPosts.reduce((acc, post) => {
			acc[post.writerId] = (acc[post.writerId] || 0) + 1;
			return acc;
		}, {});
		const topUserIds = Object.keys(userCounts)
			.sort((a, b) => userCounts[b] - userCounts[a])
			.slice(0, 5);
		const topUsers = [];
		for (let i = 0; i < topUserIds.length; i++) {
			let userId = topUserIds[i];
			const userDetails = await prisma.user.findUnique({
				where: { id: parseInt(userId) },
				select: {
					id: true,
					nickname: true,
					profileImage: {
						select: {
							imageUrl: true,
						},
					},
				},
			});
			userDetails.imageUrl = userDetails.profileImage?.imageUrl || null;
			userDetails.score = userCounts[userId] * 353;
			userDetails.rank = i + 1;
			delete userDetails.profileImage;
			topUsers.push(userDetails);
		}

		return topUsers;
	} catch (error) {
		throw error;
	}
};
const getTopCertPostContributorsUsers = async () => {
	try {
		const certPosts = await prisma.certPost.findMany({
			select: {
				writerId: true,
			},
		});
		const userCounts = certPosts.reduce((acc, post) => {
			acc[post.writerId] = (acc[post.writerId] || 0) + 1;
			return acc;
		}, {});

		const topUserIds = Object.keys(userCounts)
			.sort((a, b) => userCounts[b] - userCounts[a])
			.slice(0, 5);

		const topUsers = [];
		for (let i = 0; i < topUserIds.length; i++) {
			let userId = topUserIds[i];
			const userDetails = await prisma.user.findUnique({
				where: { id: parseInt(userId) },
				select: {
					id: true,
					name: true,
					nickname: true,
					activity: true,
					profileImage: true,
				},
			});
			userDetails.score = userCounts[userId] * 353;
			userDetails.rank = i + 1;
			userDetails.postCount = userCounts[userId];
			topUsers.push(userDetails);
		}
		return topUsers;
	} catch (error) {
		throw error;
	}
};

const getTopCertPostContributorsGroups = async () => {
	try {
		const certPosts = await prisma.certPost.findMany({
			select: {
				groupName: true,
			},
		});
		const groupCounts = certPosts.reduce((acc, post) => {
			acc[post.groupName] = (acc[post.groupName] || 0) + 1;
			return acc;
		}, {});

		//todo 여기서 왜 0번째 인덱스에 null이 들어갈까..
		const topGroupNames = Object.keys(groupCounts)
			.sort((a, b) => groupCounts[b] - groupCounts[a])
			.slice(0, 6);

		const topGroups = [];
		for (let i = 0; i < topGroupNames.length; i++) {
			let groupName = topGroupNames[i];
			let groupDetails = await prisma.group.findUnique({
				where: { name: groupName },
				select: {
					id: true,
					name: true,
					managerId: true,
					goal: true,
				},
			});
			if (groupDetails) {
				groupDetails.score = groupCounts[groupName] * 578;
				groupDetails.rank = i;
				groupDetails.postCount = groupCounts[groupName];
				topGroups.push(groupDetails);
			}
		}
		return topGroups;
	} catch (error) {
		throw error;
	}
};

const allCertPosts = async () => {
	return prisma.certPost.findMany({
		where: { isGroupPost: false },
		select: { writerId: true },
	});
};

const getTopUsers = async () => {
	try {
		const certPosts = await allCertPosts();
		const userCounts = certPosts.reduce((acc, post) => {
			acc[post.writerId] = (acc[post.writerId] || 0) + 1;
			return acc;
		}, {});
		const sortedUserIds = Object.keys(userCounts).sort(
			(a, b) => userCounts[b] - userCounts[a],
		);
		const topUsers = [];
		for (let i = 0; i < sortedUserIds.length; i++) {
			let userId = sortedUserIds[i];
			let userDetails = await prisma.user.findUnique({
				where: { id: Number(userId) },
				select: {
					id: true,
					nickname: true,
					activity: true,
				},
			});
			if (userDetails) {
				userDetails.score = userCounts[userId] * 350;
				userDetails.rank = i + 1;
				userDetails.postCount = userCounts[userId];
				topUsers.push(userDetails);
			}
			if (i === 99) {
				break;
			}
		}
		return topUsers;
	} catch (error) {
		throw error;
	}
};

const getUserRank = async (userId) => {
	try {
		const certPosts = await allCertPosts();
		const userCounts = certPosts.reduce((acc, post) => {
			acc[post.writerId] = (acc[post.writerId] || 0) + 1;
			return acc;
		}, {});
		const sortedUserIds = Object.keys(userCounts).sort(
			(a, b) => userCounts[b] - userCounts[a],
		);
		let loggedInUserRank;
		for (let i = 0; i < sortedUserIds.length; i++) {
			if (Number(sortedUserIds[i]) === userId) {
				loggedInUserRank = i + 1;
				break;
			}
		}
		return loggedInUserRank;
	} catch (error) {
		throw error;
	}
};

const getGroupRank = async (groupName) => {
	try {
		const groupPosts = await prisma.certPost.findMany({
			where: { isGroupPost: true },
			select: { groupName: true },
		});
		const groupCounts = groupPosts.reduce((acc, post) => {
			acc[post.groupName] = (acc[post.groupName] || 0) + 1;
			return acc;
		}, {});
		const sortedGroupNames = Object.keys(groupCounts).sort(
			(a, b) => groupCounts[b] - groupCounts[a],
		);
		let groupRank;
		for (let i = 0; i < sortedGroupNames.length; i++) {
			if (sortedGroupNames[i] === groupName) {
				groupRank = i + 1;
				break;
			}
		}
		return groupRank;
	} catch (error) {
		throw error;
	}
};

const getUserCertPostsRegionCount = async (userId) => {
	try {
		const userCertPosts = await prisma.certPost.findMany({
			where: { writerId: userId },
		});
		const regionCount = {};
		for (let post of userCertPosts) {
			if (!regionCount[post.region]) {
				regionCount[post.region] = 0;
			}
			regionCount[post.region]++;
		}
		return regionCount;
	} catch (error) {
		throw error;
	}
};

const getGroupCertPostsRegionCount = async (groupName) => {
	try {
		const groupCertPosts = await prisma.certPost.findMany({
			where: { groupName: groupName },
		});
		const regionCount = {};
		for (let post of groupCertPosts) {
			if (!regionCount[post.region]) {
				regionCount[post.region] = 0;
			}
			regionCount[post.region]++;
		}
		return regionCount;
	} catch (error) {
		throw error;
	}
};

const getAllCertPostsRegions = async () => {
	try {
		const allCertPosts = await prisma.certPost.findMany();
		const regionCount = {};
		for (let post of allCertPosts) {
			if (!regionCount[post.region]) {
				regionCount[post.region] = 0;
			}
			regionCount[post.region]++;
		}
		return regionCount;
	} catch (error) {
		throw error;
	}
};

module.exports = {
	createCertPost,
	getAllCertPosts,
	getCertPostDetails,
	updateCertPost,
	deleteCertPostImages,
	deleteCertPostParticipants,
	deleteCertPost,
	getTopCertPostContributorsUsers,
	getTopCertPostContributorsGroups,
	getTopUsers,
	getUserRank,
	getGroupRank,
	getUserCertPostsRegionCount,
	getGroupCertPostsRegionCount,
	getAllCertPostsRegions,
	getTopMainCertPostContributors,
};