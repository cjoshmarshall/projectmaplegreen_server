import express from "express";
import { deleteTree, getTrees, getUserTrees, postTrees, postTree, putTree } from "../controllers/trees";

const router = express.Router();

router.get("/getTrees", getTrees);
router.get("/getUserTrees/:id", getUserTrees);
router.post("/postTrees", postTrees);
router.post("/postTree", postTree);
router.put("/putTree", putTree);
router.delete("/deleteTree", deleteTree);

export default router;