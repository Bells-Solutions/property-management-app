import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import router from "./routes";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());

app.use(express.json()); //
app.use(express.urlencoded({ extended: true }));

// Protected Route Example
app.get("/", (req, res) => {
    res.send("API Running...");
});

app.use("/api", router);

// workaround for express-jwt error handling
app.use((err: any, req: Request, res: Response, next: NextFunction): void => {
    if (err.name === "UnauthorizedError") {
        res.status(401).json({ message: "Unauthorized" });
        return;
    }
    next(err);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
