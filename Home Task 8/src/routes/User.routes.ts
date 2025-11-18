import * as express from 'express';
import {
    createUser,
    deleteUser,
    getUserById,
    getUsers,
    updateUser,
} from '../controllers/user.controller';
import validateUserBody from '../middlewares/validateUserBody';

const app = express.Router();
app.use(express.json());

app.post("/", validateUserBody, createUser);
app.get("/", getUsers);
app.get("/:id", getUserById);
app.put("/:id", updateUser);
app.delete("/:id", deleteUser);

export default app;