import express from "express";

import { getCurrentUser, Login, Signup } from "../controller/authcontroller.js";

const router = express.Router();


router.post("/signup",Signup);


router.post("/login", Login);

router.get("/me", getCurrentUser);

export default router;
