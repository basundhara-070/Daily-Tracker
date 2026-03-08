import express from "express";
import { getBlogs, createBlog, updateBlog, deleteBlog } from "../controllers/blogs.controller.js";

const router = express.Router();

router.get("/", getBlogs);
router.post("/", createBlog);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);

export default router;
