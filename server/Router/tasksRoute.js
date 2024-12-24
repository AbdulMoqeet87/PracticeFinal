
import express from 'express';
import { AddNewTask, AddUser, GetAllTasks, Login, UpdateTask } from '../Controllers/TaskController.js';

 export const router = express.Router();

router.post('/SignUp',AddUser);
router.post('/login',Login);
router.put('/AddTask/:username',AddNewTask);
router.put('/UpdateTask/:username',UpdateTask);
router.get('/getTasks/:username',GetAllTasks);

