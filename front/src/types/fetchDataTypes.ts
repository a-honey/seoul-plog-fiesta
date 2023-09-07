export type PostDataType = {
  id: number;
  writerId: number;
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
  isGroupPost: boolean;
  groupName: string;
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
