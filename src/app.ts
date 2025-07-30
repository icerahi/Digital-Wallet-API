import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import notFound from "./middlewares/notFound";
import { router } from "./routes";

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/v1", router);
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Welcome to Digital Wallet App Backend!" });
});
app.use(globalErrorHandler);
app.use(notFound);

export default app;
