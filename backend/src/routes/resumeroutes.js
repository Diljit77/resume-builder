import express from "express";
import { auth } from "../middleware/authmiddleware.js";
import { Addresume, deleteresume, downloadpdf, downloadresume, getResume, updateresume } from "../controller/resumecontroller.js";

const router = express.Router();




router.post("/", auth, Addresume);


router.get("/", auth, getResume);


router.put("/:id", auth, updateresume);


router.delete("/:id", auth, deleteresume);

router.get("/:id/download-docx", auth,downloadresume);
router.get("/:id/download-pdf", 
auth, downloadpdf
);
export default router;
