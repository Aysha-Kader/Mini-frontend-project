import  express from "express";
import dotenv from "dotenv";
import  cors from "cors";
import  connectDB  from"./db/config.js";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import recipeRoutes from "./routes/recipeRoutes.js";



dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin:"https://mini-frontend-project.vercel.app/"
}));
app.use(express.json());

app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
app.use("/api/recipes",recipeRoutes);

app.get("/", (req, res) => {
  res.send("API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);