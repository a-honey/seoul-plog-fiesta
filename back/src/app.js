import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import errorMiddleware from "./middleware/errorMiddleware";
import loggerMiddleware from "./middleware/loggerMiddleware";
import userRoutes from "./routes/userRoutes";
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
require("./models/index");

app.use(loggerMiddleware);

//todo 앞으로 작성될 라우터핸들러 위치
app.use(userRoutes);

app.use(errorMiddleware);

/** @description 프로세스 종류 후 프리즈마 연결해제 */
process.on("SIGINT", async () => {
	await prisma.$disconnect();
	process.exit();
});

export { app };
