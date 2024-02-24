import { Router } from "express";
import { registerUser,Hello } from "../controller/user.controller.js";
const router = Router()
router.route("/register").post(registerUser)
router.route("/test").get(Hello)
export default router
//https://localhost:9000/api/v1/user/register