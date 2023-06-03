import { register, login, getUser, addWishlist } from "../controllers/user.js";
import verifyToken from "../middlewares/verifyToken.js";
import express from "express";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user", verifyToken, getUser);
router.post("/wishlist", verifyToken, addWishlist);

export default router;