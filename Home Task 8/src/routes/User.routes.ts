import * as express from 'express';
import {
    createUser,
    deleteUser,
    getUserById,
    getUsers,
    updateUser,
} from '../controllers/user.controller';

const app = express.Router();
app.use(express.json());

app.post("/", createUser);
app.get("/", getUsers);
app.get("/:id", getUserById);
app.put("/:id", updateUser);
app.delete("/:id", deleteUser);

export default app;