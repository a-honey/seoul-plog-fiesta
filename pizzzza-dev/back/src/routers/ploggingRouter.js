import Router from "express";
import authenticateJWT from "../middlewares/authenticateJWT";
import ploggingController from "../controllers/ploggingController"; 

const ploggingRouter = Router();

// request와 response 처리

// 플로깅 현황 지도
ploggingRouter.get("/plo", async (req, res, next) => {

});


// 인증 top5 유저, 그룹
ploggingRouter.get("/plo/top5", async (req, res, next) => {

});

// 인증 top 100 유저
ploggingRouter.get("/plo/top100", async (req, res, next) => {

});

// 플로깅 코스 추천
ploggingRouter.get("/plo/course", async (req, res, next) => {

});



// 플로깅 인증 게시글 작성
ploggingRouter.post(
  "/plo/board",
  authenticateJWT,
  ploggingController.createCertification
);

// 플로깅 인증 게시글 조회 (전체)
ploggingRouter.get(
  "/plo/board",
  authenticateJWT,
  ploggingController.getAllCertificationBoards
);  

// 플로깅 인증 게시글 댓글
// user가 작성한 플로깅  인증 게시글  조회
// 플로깅  인증 게시글 수정






// 플로깅 인증 게시글 조회 (1개)
ploggingRouter.get(
  "/plo/board/:id",
  authenticateJWT,
  ploggingController.getCertification
);  

// 플로깅 인증 게시글 수정
ploggingRouter.put(
  "/plo/board/:id",
  authenticateJWT,
  ploggingController.updateCertification
);


// 플로깅  인증 게시글 삭제
ploggingRouter.delete(
	"/plo/board/drop/:id",
	authenticateJWT,
	ploggingController.deleteCertification,
);


// 플로깅  인증 게시글의 댓글 작성
// 플로깅  인증 게시글의 댓글 수정
// 플로깅  인증 게시글의 댓글 삭제







module.exports = ploggingRouter;
