import { Task } from "../models/Task.model"

export const getTasks = async (req, res) => {
    const tasks = await Task.findAll();
    res.json(tasks);
}