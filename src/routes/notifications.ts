import express from "express";
import { deleteNotifications, getNotifications, postNotifications } from "../controllers/notifications";

const router = express.Router();

router.get("/getNotifications", getNotifications);
router.post("/postNotifications", postNotifications);
router.delete("/deleteNotifications", deleteNotifications);

export default router;