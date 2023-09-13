# **Seoul Plogging Fiesta - FE**

**Seoul Plogging Fiesta**는 서울 시민들의 참여를 통해 환경을 보호하고 건강한 도시를 조성하는 프로젝트입니다. 이 프로젝트는 '플로깅'이라 불리는 쓰레기 수거와 조깅을 결합한 새로운 활동을 통해 환경 보호의 재미있는 방법을 소개하고, 참여한 시민들의 노력을 칭찬하며 장려합니다.

## **브랜치 설명**
- **dev (Default)**: 프로젝트 기간 이후 프론트엔드와 백엔드가 분리되었으며, 최종 프론트엔드 애플리케이션이 구현되어 있습니다.
- **master**: 프로젝트 기간(2023.08.14 ~ 2023.09.01)에 제작한 기능들이 구현되어 있습니다.
- **ts**: 프로젝트 기간 이후 프로젝트 기간에 제작한 프론트 기능들을 TypeScript로 리팩토링하였습니다.

## **프로젝트 실행방법**
### **프론트엔드 실행방법**
프론트엔드 애플리케이션을 실행하려면 다음 단계를 따라 진행하세요:

1. `front/` 폴더로 이동합니다.
2. 프론트엔드 애플리케이션 의존성 모듈을 설치합니다:

```bash
yarn install
```
3. 프론트엔드 애플리케이션을 실행합니다:
```bash
yarn start
```

### **백엔드 실행방법**
백엔드 애플리케이션을 실행하려면 다음 단계를 따라 진행하세요:

1. `back/` 폴더로 이동합니다.
2. .env 파일을 설정합니다. (예제 파일 참조)
   
 ```bash
	DATABASE_URL="SQL URL"
	SERVER_URL="SERVER URL"
	FRONT_URL="FRONT URL"
	SERVER_PORT="SERVER PROT NUMBER"
	JWT_SECRET_KEY="YOUR SECRET KEY"
	JWT_TOKEN_EXPIRES="EXPIRE TIME"
	GOOGLE_CLIENT_ID="GOOGLE CLIENT ID"
	GOOGLE_SECRET="GOOGLE SECRET"
	NODE_MAILER_USER="YOUR EMAIL ADDRESS"
	NODE_MAILER_PASS="YOUR EMAIL PASSWORD"
```
3. 백엔드 애플리케이션 의존성 모듈을 설치합니다:

```bash
yarn install
```
3. 백엔드 애플리케이션을 실행합니다:
```bash
yarn start
```

프로젝트 기간 이후의 백엔드 애플리케이션 실행 방법은 [백엔드](https://github.com/daechan-jo/SeoulPlogFiesta)의 README.md 파일에 더 자세히 설명되어 있습니다.
## 프론트엔드 디렉토리 구조

```
┠─ node_modules
┠─ public
src
 ┣ api
 ┃ ┗ index.js
 ┣ assets
 ┃ ┗ seoul_municipalities_geo_simple.json
 ┣ common
 ┃ ┣ components
 ┃ ┃ ┣ common
 ┃ ┃ ┃ ┣ ErrorModal.js
 ┃ ┃ ┃ ┣ index.module.scss
 ┃ ┃ ┃ ┣ Map.js
 ┃ ┃ ┃ ┣ PageNav.js
 ┃ ┃ ┃ ┣ Plogging.js
 ┃ ┃ ┃ ┗ PloggingForm.js
 ┃ ┃ ┣ home
 ┃ ┃ ┃ ┣ Map.js
 ┃ ┃ ┃ ┣ MyGroup.js
 ┃ ┃ ┃ ┗ MyUser.js
 ┃ ┃ ┣ intro
 ┃ ┃ ┃ ┣ Intro.js
 ┃ ┃ ┃ ┗ intro.module.scss
 ┃ ┃ ┣ layout
 ┃ ┃ ┃ ┣ Header.js
 ┃ ┃ ┃ ┣ layout.module.scss
 ┃ ┃ ┃ ┗ Nav.js
 ┃ ┃ ┣ my
 ┃ ┃ ┃ ┣ index.module.scss
 ┃ ┃ ┃ ┣ MyGroups.js
 ┃ ┃ ┃ ┣ MyInfo.js
 ┃ ┃ ┃ ┗ MyUsers.js
 ┃ ┃ ┣ myNetwork
 ┃ ┃ ┃ ┣ ItemList.js
 ┃ ┃ ┃ ┣ Pagenation.js
 ┃ ┃ ┃ ┗ search.js
 ┃ ┃ ┣ network
 ┃ ┃ ┃ ┗ ItemList.js
 ┃ ┃ ┣ ranking
 ┃ ┃ ┃ ┣ Map.js
 ┃ ┃ ┃ ┣ TopGroup.js
 ┃ ┃ ┃ ┗ TopUser.js
 ┃ ┃ ┗ user
 ┃ ┃ ┃ ┣ Login.js
 ┃ ┃ ┃ ┣ PasswordChange.js
 ┃ ┃ ┃ ┣ Register.js
 ┃ ┃ ┃ ┗ user.module.scss
 ┃ ┗ containers
 ┃ ┃ ┣ home
 ┃ ┃ ┃ ┗ index.js
 ┃ ┃ ┣ intro
 ┃ ┃ ┃ ┗ index.js
 ┃ ┃ ┣ my
 ┃ ┃ ┃ ┣ index.js
 ┃ ┃ ┃ ┗ index.module.scss
 ┃ ┃ ┣ myNetwork
 ┃ ┃ ┃ ┗ index.js
 ┃ ┃ ┣ network
 ┃ ┃ ┃ ┗ index.js
 ┃ ┃ ┣ password
 ┃ ┃ ┃ ┗ index.js
 ┃ ┃ ┣ ranking
 ┃ ┃ ┃ ┗ index.js
 ┃ ┃ ┗ user
 ┃ ┃ ┃ ┗ index.js
 ┣ features
 ┃ ┗ user
 ┃ ┃ ┗ userSlice.js
 ┣ pages
 ┃ ┣ HomePage.js
 ┃ ┣ IntroPage.js
 ┃ ┣ Layout.js
 ┃ ┣ MyNetworkPage.js
 ┃ ┣ MyPage.js
 ┃ ┣ NetworkPage.js
 ┃ ┣ PasswordPage.js
 ┃ ┣ RankingPage.js
 ┃ ┗ UserPage.js
 ┣ styles
 ┃ ┣ global.scss
 ┃ ┣ mystyle.css
 ┃ ┣ reset.css
 ┃ ┗ variables.scss
 ┣ utils
 ┃ ┗ index.js
 ┣ App.js
 ┣ index.js
 ┗ store.js
```
- api 폴더
- assets폴더
- common폴더:componets와 containers를 state랑 분리하려고 common으로 묶
    - components 폴더 -스타일링 중심,view를 그리는 컴포넌트가 포함되어있습니다.
        - common -ErrorModal/Map/PageNav/Plogging/PloggingForm
        - home -Map/MyGroup/MyUser
        - intro-Intro
        - layout-Header/Nav , layout.module.scss
        - my -MyGroups/MyInfo/MyUsers
        - myNetwork -ItemList/Pagenation/search
        - network -ItemList
        - ranking -Map/TopGroup/TopUser
        - user -Login/PasswordChange/Register,user.module.scss
    - containers 폴더 -요청 중심 로직, 각 index.js에 view를 나타내는 컴포넌트가 포함되어있습니다.
        - home: 메인 페이지
        - intro: 인트로페이지(로그인정보 없을 경우 표시)
        - my: 사용자 페이지
        - myNetwork: 사용자의 모임,친구 표시
        - network: 전체 모임 표시
        - ranking: 유저/전체 사용자 랭킹 표시
        - user:로그인 표시
- features 폴더 -액션, 리듀서 등 상태관리. Redux Toolkit의 createSlice.reducer함수를 사용합니다.
- pages-react router등을 이용하여 라우팅을 적용하는 페이지 컴포넌트, 컨테이너를 레이아웃으로 감싸 스타일을 적용시킴
    - HomePage
    - IntroPage
    - Layout
    - MyNetworkPage
    - PasswordPage
    - RankingPage
    - UserPage
- styles폴더
    - global.scss
    - mystyle.css
    - reset.css
    - variable.scss
- utils 폴더
- App.js - 라우팅 코드
- index.js- 리덕스를 사용하는 리액트 렌더링 코드
- store.js - 리덕스 Toolkit의 configureStorage함수를 사용해 스토어를 생성합니다.
<br>

---

© 2023 AHoney. All rights reserved.
