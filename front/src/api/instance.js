import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import 집게사장 from '../assets/집게사장.jpg';
import 다람이 from '../assets/다람이.jpg';
import 스폰지밥 from '../assets/스폰지밥.jpg';
import 징징이 from '../assets/징징이.jpg';
import 플랑크톤 from '../assets/플랑크톤.jpg';

const baseURL = 'http://localhost:3001';

export const instance = axios.create({
  baseURL,
  timeout: 5000,
});

instance.interceptors.request.use(
  (config) => {
    const userToken = localStorage.getItem('userToken');

    config.headers['Content-Type'] = 'application/json';
    config.headers['Authorization'] = `Bearer ${userToken}`;

    // refreshToken 요청

    return config;
  },
  (error) => {
    console.log('에러를 인터셉트해버리기');
    return Promise.reject(error);
  },
);

export const formDataInstance = axios.create({
  baseURL,
  timeout: 3000,
});

formDataInstance.interceptors.request.use(
  (config) => {
    const userToken = localStorage.getItem('userToken');

    config.headers['Content-Type'] = 'application/json';
    config.headers['Authorization'] = `Bearer ${userToken}`;
    return config;
  },
  (error) => {
    console.log('폼 에러를 인터셉트해버리기');
    return Promise.reject(error);
  },
);

const mock = new MockAdapter(instance);

mock.onGet('/plo/main/five').reply(200, [
  {
    id: 1,
    nickname: '집게사장',
    imageUrl: 집게사장,
    score: 5118,
    rank: 1,
  },
  {
    id: 2,
    nickname: '다람이',
    imageUrl: 다람이,
    score: 3618,
    rank: 2,
  },
  {
    id: 3,
    nickname: '스폰지밥',
    imageUrl: 스폰지밥,
    score: 3600,
    rank: 3,
  },
  {
    id: 4,
    nickname: '징징이',
    imageUrl: 징징이,
    score: 2118,
    rank: 4,
  },
  {
    id: 5,
    nickname: '플랑크톤',
    imageUrl: 플랑크톤,
    score: 1618,
    rank: 5,
  },
]);

mock
  .onPost('/auth/login', { email: 'test@email.com', password: '1234' })
  .reply(200, {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywibmFtZSI6IuyasOuhnO2XrCIsImVtYWlsIjoiamFoNTEyQG5hdmVyLmNvbSIsImlhdCI6MTY5MjUxNDA5NywiZXhwIjoxNjkyNTI0ODk3LCJpc3MiOiJQaW5lYXBwbGUgUGl6emEifQ.Pr3ax-BZcfJq-rYTH15YF-Tk4DenyXZP_y8vo5OZF-w',
    email: 'test@email.com',
    nickname: '테스트계정',
  });

mock.onGet('/plo/count/user/1').reply(200, {
  gangnam: 7,
  gangdong: 5,
  gangbuk: 21,
  gangseo: 17,
  gwanak: 21,
  gwangjin: 6,
  guro: 5,
  geumcheon: 23,
  nowon: 2,
  dobong: 1,
  dongdaemun: 10,
  dongjak: 16,
  mapo: 21,
  seodaemun: 24,
  seocho: 3,
  seongdong: 2,
  seongbuk: 4,
  songpa: 0,
  yangcheon: 7,
  yeongdeungpo: 9,
  yongsan: 20,
  eunpyeong: 10,
  jongno: 5,
  jung: 14,
  jungnang: 13,
});

mock.onGet('/group/certpost').reply(200, {
  posts: [
    {
      id: 77,
      writerId: 103,
      title: '함께하는 플로깅',
      region: 'gangdong',
      location: 'dongjak',
      distance: '6',
      trashAmount: '1',
      averagePace: '4',
      description: '줍줍',
      startTime: '10:00',
      endTime: '12:00',
      createdAt: '2023-08-29T00:26:17.665Z',
      isGroupPost: true,
      groupName: '보글보글스폰지밥',
    },
    {
      id: 77,
      writerId: 103,
      title: '플로깅 멤버 구해요',
      region: 'gangdong',
      location: 'dongjak',
      distance: '6',
      trashAmount: '1',
      averagePace: '4',
      description: '줍줍',
      startTime: '10:00',
      endTime: '12:00',
      createdAt: '2023-08-29T00:26:17.665Z',
      isGroupPost: true,
      groupName: '보글보글스폰지밥',
    },
    {
      id: 77,
      writerId: 103,
      title: '반가워요',
      region: 'gangdong',
      location: 'dongjak',
      distance: '6',
      trashAmount: '1',
      averagePace: '4',
      description: '줍줍',
      startTime: '10:00',
      endTime: '12:00',
      createdAt: '2023-08-29T00:26:17.665Z',
      isGroupPost: true,
      groupName: '보글보글스폰지밥',
    },
    {
      id: 77,
      writerId: 103,
      title: '쓰레기 줍기',
      region: 'gangdong',
      location: 'dongjak',
      distance: '6',
      trashAmount: '1',
      averagePace: '4',
      description: '줍줍',
      startTime: '10:00',
      endTime: '12:00',
      createdAt: '2023-08-29T00:26:17.665Z',
      isGroupPost: true,
      groupName: '보글보글스폰지밥',
    },
    {
      id: 27,
      writerId: 103,
      title: '줍줍',
      region: 'gangdong',
      location: 'dongjak',
      distance: '6',
      trashAmount: '1',
      averagePace: '4',
      description: '줍줍',
      startTime: '10:00',
      endTime: '12:00',
      createdAt: '2023-08-29T00:26:17.665Z',
      isGroupPost: true,
      groupName: '보글보글스폰지밥',
    },
  ],
});

mock.onGet('/user/list/info').reply(200, {
  friendsRecentPost: [
    {
      id: 77,
      writerId: 103,
      title: '한강쓰레기 많다',
      createdAt: '2023-08-29T00:26:17.665Z',
    },
    {
      id: 77,
      writerId: 103,
      title: '쓰레기 줍자',
      createdAt: '2023-08-29T00:26:17.665Z',
    },
    {
      id: 77,
      writerId: 103,
      title: '우리동네 깨끗해요',
      createdAt: '2023-08-29T00:26:17.665Z',
    },
    {
      id: 77,
      writerId: 103,
      title: '2시간 플로깅',
      createdAt: '2023-08-29T00:26:17.665Z',
    },
    {
      id: 77,
      writerId: 103,
      title: '힘들다',
      createdAt: '2023-08-29T00:26:17.665Z',
    },
  ],
});

mock.onGet('/user/cert/list').reply(200, [
  {
    id: 1,
    title: '첫 플로깅했습니다',
    createdAt: '2023-08-27T18:17:03.480Z',
  },
  {
    id: 2,
    title: '플로깅의 매력에 빠져보세요!',
    createdAt: '2023-09-05T09:42:15.720Z',
  },
  {
    id: 3,
    title: '플로깅의 신세계를 여행하다',
    createdAt: '2023-09-12T14:28:30.210Z',
  },
  {
    id: 4,
    title: '플로깅으로 건강과 즐거움을 동시에!',
    createdAt: '2023-09-20T21:09:45.890Z',
  },
  {
    id: 5,
    title: '플로깅은 나만의 힐링이에요',
    createdAt: '2023-10-02T08:55:12.150Z',
  },
  {
    id: 6,
    title: '플로깅의 아름다움을 느껴보세요',
    createdAt: '2023-10-10T17:36:58.320Z',
  },
  {
    id: 7,
    title: '코스를 선택하는 재미, 플로깅에서 찾기',
    createdAt: '2023-10-18T12:44:23.670Z',
  },
  {
    id: 8,
    title: '플로깅으로 새로운 친구들을 만나다',
    createdAt: '2023-10-25T06:31:40.110Z',
  },
  {
    id: 9,
    title: '플로깅의 계절, 가을에 느껴보기',
    createdAt: '2023-11-03T14:20:55.280Z',
  },
  {
    id: 10,
    title: '플로깅의 즐거움을 공유합니다',
    createdAt: '2023-11-11T19:08:10.550Z',
  },
  {
    id: 11,
    title: '플로깅으로 자연 속에서 명상하기',
    createdAt: '2023-11-19T10:57:25.920Z',
  },
  {
    id: 12,
    title: '플로깅은 습관, 건강의 시작',
    createdAt: '2023-11-27T23:45:41.190Z',
  },
  {
    id: 13,
    title: '플로깅의 기쁨을 나눠보세요',
    createdAt: '2023-12-05T15:34:56.460Z',
  },
  {
    id: 14,
    title: '플로깅의 세계로 초대합니다',
    createdAt: '2023-12-13T07:23:11.730Z',
  },
  {
    id: 15,
    title: '플로깅을 통해 자연 속에서 휴식',
    createdAt: '2023-12-21T12:11:27.000Z',
  },
  {
    id: 16,
    title: '플로깅의 즐거움, 언제나 함께',
    createdAt: '2023-12-29T03:59:42.270Z',
  },
  {
    id: 17,
    title: '플로깅의 선물, 건강한 삶',
    createdAt: '2024-01-06T18:47:57.540Z',
  },
  {
    id: 18,
    title: '플로깅의 숨은 미소 찾기',
    createdAt: '2024-01-14T10:36:12.810Z',
  },
  {
    id: 19,
    title: '플로깅으로 자연 속의 흔적을 찾다',
    createdAt: '2024-01-22T22:24:28.080Z',
  },
  {
    id: 20,
    title: '플로깅의 자유, 내 마음대로 즐기기',
    createdAt: '2024-01-30T14:12:43.350Z',
  },
  {
    id: 21,
    title: '플로깅의 힘, 새로운 에너지를 느끼다',
    createdAt: '2024-02-07T06:00:58.620Z',
  },
  {
    id: 22,
    title: '플로깅의 축복, 감사의 마음을 담아',
    createdAt: '2024-02-15T17:49:13.890Z',
  },
  {
    id: 23,
    title: '플로깅으로 시작하는 새로운 일상',
    createdAt: '2024-02-23T09:37:29.160Z',
  },
  {
    id: 24,
    title: '플로깅의 미소, 하루를 활기차게',
    createdAt: '2024-03-02T01:25:44.430Z',
  },
  {
    id: 25,
    title: '플로깅의 즐거움을 여러분과 함께',
    createdAt: '2024-03-09T13:13:59.700Z',
  },
]);

mock.onGet('/group').reply(200, {
  gropus: [
    {
      id: 1,
      nickname: '집게사장',
      imageUrl: 집게사장,
      score: 5118,
      rank: 1,
    },
    {
      id: 2,
      nickname: '다람이',
      imageUrl: 다람이,
      score: 3618,
      rank: 2,
    },
    {
      id: 3,
      nickname: '스폰지밥',
      imageUrl: 스폰지밥,
      score: 3600,
      rank: 3,
    },
    {
      id: 4,
      nickname: '징징이',
      imageUrl: 징징이,
      score: 2118,
      rank: 4,
    },
    {
      id: 5,
      nickname: '플랑크톤',
      imageUrl: 플랑크톤,
      score: 1618,
      rank: 5,
    },
  ],
});

mock.onGet('/plo/five').reply(200, {
  topUsers: [
    {
      id: 1,
      nickname: '집게사장',
      score: 5118,
      rank: 1,
    },
    {
      id: 2,
      nickname: '다람이',
      score: 3618,
      rank: 2,
    },
    {
      id: 3,
      nickname: '스폰지밥',

      score: 3600,
      rank: 3,
    },
    {
      id: 4,
      nickname: '징징이',
      score: 2118,
      rank: 4,
    },
    {
      id: 5,
      nickname: '플랑크톤',
      score: 1618,
      rank: 5,
    },
  ],
  topGroups: [
    { id: '1', name: '서초러닝크루', score: 7500, rank: 1 },
    { id: '2', name: '광진구 플로깅', score: 6800, rank: 2 },
    { id: '3', name: '모여서 플로깅', score: 6780, rank: 3 },
    { id: '4', name: '출근길 10분 인증', score: 3400, rank: 4 },
    { id: '5', name: '서울 전지역 크루', score: 3100, rank: 5 },
  ],
});
