import express from "express";
import { create, getAll, getUser,update, deleteUser} from "../controller/userControllser.js";

const router=express.Router();

router.post('/create',create);
router.get('/getAll',getAll);
router.get('/getUser/:id',getUser);
router.put('/update/:id',update);
router.delete('/deleteUser/:id',deleteUser);

export default router;