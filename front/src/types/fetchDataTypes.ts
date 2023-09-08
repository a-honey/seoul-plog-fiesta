export type PostDataType = {
  id: number;
  writerId: number;
  authorNickname: string;
  title: string;
  region: string;
  location: string;
  distance: string;
  trashAmount: string;
  averagePace: string;
  description: string;
  startTime: string;
  endTime: string;
  createdAt: string;
  isGroupPost?: boolean;
  groupName?: string;
  imageUrl?: string;
  participants: string[];
  comments?: string[];
};

export type CommentDataType = {
  id: number;
  nickname: string;
  parentId: number;
  content: string;
  commenterNickname?: string;
  createdAt: string;
  writerId: number;
};

export type PostMinDataType = {
  id: number;
  title: string;
  createdAt: string;
};

export type UserDataType = {
  id: number;
  nickname: string;
  activity?: string;
  score?: number;
  rank?: number;
  postCount?: number;
  about?: string;
};

export type RankingUserDataType = {
  id: number;
  nickname: string;
  activity?: string;
  score?: number;
  rank?: number;
  postCount?: number;
  imageUrl: string;
};

export type RankingGroupDataType = {
  id: number;
  name: string;
  score?: number;
  rank?: number;
};

export type NoticePostType = {
  id: number;
  writerId: string;
  title: string;
  content: string;
  isNotice: boolean;
  createdAt: string;
};

export type RequestType = {
  nickname: string;
  id: number;
};

export type NetworkGroupType = {
  id: number;
  managerId: number;
  name: string;
  goal: string;
  region: string;
  memberCount: number;
  imageUrl: string;
  memberLimit: number;
};

export type NetworkUserType = {
  id: number;
  email: string;
  nickname: string;
  about: string;
  activity: string;
  imageUrl: string;
};
