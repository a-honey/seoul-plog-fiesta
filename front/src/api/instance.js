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
    nickname: '다람이',
    imageUrl: 다람이,
    score: 1618,
    rank: 5,
  },
]);

mock.onPost('/auth/login').reply(200, {
  user: {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywibmFtZSI6IuyasOuhnO2XrCIsImVtYWlsIjoiamFoNTEyQG5hdmVyLmNvbSIsImlhdCI6MTY5MjUxNDA5NywiZXhwIjoxNjkyNTI0ODk3LCJpc3MiOiJQaW5lYXBwbGUgUGl6emEifQ.Pr3ax-BZcfJq-rYTH15YF-Tk4DenyXZP_y8vo5OZF-w',
    email: 'jah512@naver.com',
    nickname: '헬로우',
  },
});

mock.onGet('/plo/count/user/1').reply(200, {
  gangnam: 50,
  gangdong: 30,
  gangbuk: 41,
  gangseo: 0,
  gwanak: 0,
  gwangjin: 0,
  guro: 0,
  geumcheon: 0,
  nowon: 0,
  dobong: 0,
  dongdaemun: 0,
  dongjak: 0,
  mapo: 0,
  seodaemun: 0,
  seocho: 0,
  seongdong: 0,
  seongbuk: 0,
  songpa: 0,
  yangcheon: 0,
  yeongdeungpo: 0,
  yongsan: 0,
  eunpyeong: 0,
  jongno: 0,
  jung: 0,
  jungnang: 0,
});

mock.onGet('/group/certpost').reply(200, {
  posts: [
    {
      id: 77,
      writerId: 103,
      title: '무야호야호',
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
      groupName: '나혼자그룹',
    },
  ],
});

mock.onGet('/user/list/info').reply(200, {
  friendsRecentPost: [
    {
      id: 77,
      writerId: 103,
      title: '무야호야호',
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
      groupName: '나혼자그룹',
    },
  ],
});
