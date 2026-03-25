import  express from "express";
import dotenv from "dotenv";
import  cors from "cors";
import  connectDB  from"./db/config.js";
import authRoutes from "./routes/authRoutes.js";

import recipeRoutes from "./routes/recipeRoutes.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";


dotenv.config();
connectDB();

const app = express();


app.use(cors({
  origin:["http://localhost:5173","https://mini-frontend-project-e6eq.vercel.app"],
  credentials:true
}));
app.use(express.json());
//routes
app.use("/api/auth",authRoutes);

app.use("/api/recipes",recipeRoutes);
app.use("/api/favorites",favoriteRoutes);


app.get("/", (req, res) => {
  res.send("API Running...");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);