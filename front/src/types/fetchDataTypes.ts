type PostDataType = {
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

type UserDataType = {
  id: number;
  nickname: string;
  activity?: string;
  score?: number;
  rank?: number;
  postCount?: number;
};

type RankingUserDataType = {
  id: number;
  nickname: string;
  activity?: string;
  score?: number;
  rank?: number;
  postCount?: number;
  imageUrl: string;
};

export { PostDataType, UserDataType, RankingUserDataType };
