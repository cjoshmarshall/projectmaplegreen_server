import express from "express";
import { deleteUser, getUser, getUsers, putUser } from "../controllers/users";

const router = express.Router();

router.get("/getUsers", getUsers);
router.get("/getUser", getUser);
router.put("/putUser/:id", putUser);
router.delete("/deleteUser/:id", deleteUser);

export default router;