import express from "express";
import EventRouter from "./api/routers/eventRouter.js";
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(cors()); // 👈 
app.use(express.json());

app.get("/", (req, res) => res.send("Server is running!"));

//routers

app.use("/event", EventRouter);

export default app;
