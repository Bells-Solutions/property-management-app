import express from "express";
import cors from "cors";
import checkJwt from "./middlewares/auth.middleware";

import userRoutes from "../src/routes/user.route";

const app = express();
app.use(cors());
app.use(express.json());

// Protected Route Example
app.get("/protected", checkJwt, (req, res) => {
  res.json({
    message: "You have access to this protected route!",
    user: req.body,
  });
});

app.use("api/users", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
