# **Seoul Plogging Fiesta**

**Seoul Plogging Fiesta**는 서울 시민들의 참여를 통해 환경을 보호하고 건강한 도시를 조성하는 프로젝트입니다. 이 프로젝트는 '플로깅'이라 불리는 쓰레기 수거와 조깅을 결합한 새로운 활동을 통해 환경 보호의 재미있는 방법을 소개하고, 참여한 시민들의 노력을 칭찬하며 장려합니다.

![image](https://github.com/a-honey/seoul-plog-fiesta/assets/75254185/628a7a9f-37f2-4dd2-b144-bc4f36311b75)

## **주요 기능 및 특징**

### **1. 플로깅 인증 웹**

사용자들은 실제 환경 보호 활동을 증명하는 플로깅 인증 웹 페이지를 통해 참여합니다. 사용자는 활동한 지역, 주운 쓰레기의 양, 활동 시간 등을 기록하고 공유할 수 있습니다. 이 인증된 활동 내용은 환경 보호 의식을 공유하는 중요한 자료로 활용됩니다.

### **2. 랭킹 및 친구, 모임 기능**


참여자들의 플로깅 활동은 점수로 계산되어 랭킹에 반영됩니다. 참가자들은 다른 참여자들과 경쟁하며 쓰레기를 더 많이 주워 점수를 획득할 수 있습니다. 랭킹 시스템은 활발한 참여를 장려하고 친목을 도모하며, 친구와 모임 활동을 통해 함께 환경 보호를 즐길 수 있는 기회를 제공합니다.

### **3. 유저 간 채팅 기능**

플로깅 인증 웹 애플리케이션은 사용자들 간의 소통을 촉진하기 위한 실시간 채팅 기능을 제공합니다. 이 기능은 다양한 사용자가 환경 보호 활동에 관한 경험을 쉽게 공유하고 아이디어를 교환할 수 있는 효율적인 방법을 제공합니다. 사용자들은 환경 보호에 대한 열정을 공유하며 함께 환경을 보호하는 데 동기부여를 얻을 수 있습니다.

### **4. 시각화 및 데이터 분석**


플로깅 활동 데이터는 지역별로 수집되어 D3.js를 이용하여 시각화됩니다. 사용자들은 지도 상에서 환경 보호 활동의 집중 지역을 확인하고, 개인 기록을 비교할 수 있습니다. 시각화를 통해 환경 문제에 대한 현실적인 정보를 얻을 수 있으며, 참여 동기 부여에도 도움을 줍니다.

## **프로젝트 기간**

- 2023.08.14 ~ 2023.09.01
- 2023.09.01 ~ 2023.09.15

프로젝트 기간 이후에는 프론트엔드와 백엔드가 별도의 폴더에서 관리되며, 각각의 폴더에서 관련된 코드 및 의존성 모듈이 분리되어 있습니다.

### **프론트엔드 실행 방법**

프론트엔드 애플리케이션을 실행하려면 다음 단계를 따라 진행하세요:

1. `front/` 폴더로 이동합니다.
2. 프론트엔드 애플리케이션 의존성 모듈을 설치합니다:

```bash
yarn install
yarn start
```
프로젝트 실행 방법은 front/ 폴더의 README.md 파일에 더 자세히 설명되어 있습니다. 프론트엔드 애플리케이션을 실행하는 방법을 확인하려면 해당 파일을 참조하세요.
## **기술 스택 및 도구**

### 프론트엔드

![React](https://img.shields.io/badge/-React-222222?style=for-the-badge&logo=react)
![SCSS](https://img.shields.io/badge/-SCSS-CC6699?style=for-the-badge&logo=sass&logoColor=ffffff)
![axios](https://img.shields.io/badge/-axios-007ACC?style=for-the-badge&logo=axios&logoColor=ffffff)
![Redux Toolkit](https://img.shields.io/badge/-Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=ffffff)
![WebSocket.io](https://img.shields.io/badge/-WebSocket.io-4E4E4E?style=for-the-badge&logo=socket.io&logoColor=ffffff)
![D3.js](https://img.shields.io/badge/-D3.js-F9A03C?style=for-the-badge&logo=d3.js&logoColor=ffffff)

- **React**: 웹 애플리케이션의 사용자 인터페이스 개발에 사용되었습니다.
- **Redux Toolkit**: 스토어를 통한 전역 상태 관리 라이브러리로 사용되었습니다.
- **axios**: 인터셉터 등의 기능을 활용하여 기본 url, header를 설정하였습니다.
- **Typescript**: 정적 타입 언어로 프로젝트의 안정성과 개발 생산성을 향상시켰습니다(ts 브랜치)
- **SCSS**: 스타일링을 위해 사용되었으며, CSS의 확장성을 제공합니다.
- **WebSocket.io**: 실시간 채팅기능을 위해 사용되었습니다.
- **D3.js**: 데이터 시각화를 위한 라이브러리로 사용되었습니다.

### 백엔드

![MySQL](https://img.shields.io/badge/-MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Prisma](https://img.shields.io/badge/-Prisma-1B222D?style=for-the-badge&logo=prisma&logoColor=white)
![JWT](https://img.shields.io/badge/-JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)
![Nodemailer](https://img.shields.io/badge/-Nodemailer-339933?style=for-the-badge&logo=nodemailer&logoColor=white)
![Multer](https://img.shields.io/badge/-Multer-FF6600?style=for-the-badge&logo=multer&logoColor=white)

### 기획 및 배포

![Figma](https://img.shields.io/badge/-Figma-A259FF?style=for-the-badge&logo=figma&logoColor=white)
![GitLab](https://img.shields.io/badge/-GitLab-FCA121?style=for-the-badge&logo=gitlab&logoColor=white)
![Vercel](https://img.shields.io/badge/-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![VM](https://img.shields.io/badge/-VM-00B0FF?style=for-the-badge&logo=virtualbox&logoColor=white)
![PM2](https://img.shields.io/badge/-PM2-2B037A?style=for-the-badge&logo=pm2&logoColor=white)

## **활용 데이터셋**
- [서울시 가로휴지통 설치 정보 (2022.04)](https://kosis.kr/statHtml/statHtml.do?orgId=106&tblId=DT_106N_29_2020005&conn_path=I2)
- [서울시 행정구역 (구별) 통계 (2022.06)](https://data.seoul.go.kr/dataList/412/S/2/datasetView.do)
- [서울시 주민등록인구 (연령별/구별) 통계 (2022.04)](https://kosis.kr/statHtml/statHtml.do?orgId=106&tblId=DT_106N_29_2020005&conn_path=I2)
  

## **데이터베이스 모델**

데이터베이스 모델은 위키 주소를 통해 확인할 수 있습니다.

## **프로젝트 구성도**

프로젝트의 구성 및 아키텍처에 대한 설명은 위키 주소를 통해 확인할 수 있습니다.

## **프로젝트 팀원 및 역할 분담**

|  이름  |             역할              |
| :----: | :---------------------------: |
| 정아현 | 팀장/ 프론트엔드 / 데이터분석 |
| 조대찬 |      백엔드/ 데이터분석       |
| 정현수 |      백엔드/ 데이터분석       |
| 최은진 |      백엔드/ 데이터분석       |
| 김지안 |      백엔드/ 데이터분석       |

- **팀장**: 환경 보호 활동 기획 및 프로젝트 관리 담당
- **프론트엔드 개발자**: 사용자 인터페이스 디자인 및 구현 담당
- **백엔드 개발자**: 서버와 데이터베이스 구축 및 관리 담당

## **버전**

- 0.0.2
