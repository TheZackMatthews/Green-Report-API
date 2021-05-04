import express from "express";
import cors from "cors";
import morgan from "morgan";
import { router } from "./routes";
const app = express();

//const PORT = process.env.PORT || 3001;
const PORT = 3001;
const host = "localhost";

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());
app.use(router);
const server = app.listen(PORT, host, () => {
  console.log(`Server listening on http://${host}:${PORT}`);
});

export { app, server };
