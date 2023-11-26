import express from "express";
import cors from "cors";
import { env } from "./env";
import { router } from "./routes/router";

const app = express();

app.use(cors());

app.use(express.json());

app.use(router);

app.listen(env.PORT, () => {
  console.log(`Server is running on port ${env.PORT}`);
});
