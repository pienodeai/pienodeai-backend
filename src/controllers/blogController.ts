import type { Request, Response } from "express";
import { getBlogPosts, getBlogPostBySlug } from "../data/index.js";

export async function list(_req: Request, res: Response): Promise<void> {
  const blogPosts = await getBlogPosts();
  res.json({ data: blogPosts });
}

export async function getBySlug(req: Request, res: Response): Promise<void> {
  const { slug } = req.params;
  const post = await getBlogPostBySlug(slug);
  if (!post) {
    res.status(404).json({
      error: "NOT_FOUND",
      message: "Blog post not found",
      requestId: (req as Request & { id?: string }).id,
    });
    return;
  }
  res.json(post);
}
