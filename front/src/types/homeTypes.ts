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

export { PostDataType, UserDataType };
