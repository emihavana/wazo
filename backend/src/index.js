import express from "express";
import path, {dirname} from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/authRoutes.js";
import todoRoutes from "./routes/todoRoutes.js";
import authMiddleware from "./middleware/authMiddleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000; 
app.use(express.json());
//routes
app.use('/auth', authRoutes);
app.use('/todos', authMiddleware, todoRoutes);

app.use(express.static(path.join(__dirname, '../public')));
//serving html file from the public folder
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});