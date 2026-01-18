import { Request, Response } from 'express';
import { ZodError, z } from 'zod';
import { NotFound } from '../errors/NotFound';
import { ForumService } from '../services/ForumService';
import { ForumRepository } from '../repositories/ForumRepository';
import { TopicService } from '../services/TopicService';
import { TopicRepository } from '../repositories/TopicRepository';
import { PostService } from '../services/PostService';
import { PostRepository } from '../repositories/PostRepository';

const createForumSchema = z.object({
  courseId: z.string().uuid(),
  name: z.string().min(1),
  description: z.string().optional(),
});

const createTopicSchema = z.object({
  forumId: z.string().uuid(),
  userId: z.string().uuid(),
  title: z.string().min(1),
  content: z.string().min(1),
});

const createPostSchema = z.object({
  topicId: z.string().uuid(),
  userId: z.string().uuid(),
  content: z.string().min(1),
});

const forumRepository = new ForumRepository();
const topicRepository = new TopicRepository();
const postRepository = new PostRepository();
const forumService = new ForumService(forumRepository);
const topicService = new TopicService(topicRepository);
const postService = new PostService(postRepository);

// Forum
export async function createForumController(req: Request, res: Response) {
  try {
    const data = createForumSchema.parse(req.body);
    const forum = await forumService.create(data);
    return res.status(201).json(forum);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ error: 'Validation error', issues: error.issues });
    }
    throw error;
  }
}

export async function getForumController(req: Request, res: Response) {
  try {
    const forum = await forumService.findById(req.params.id as string);
    return res.status(200).json(forum);
  } catch (error) {
    if (error instanceof NotFound) {
      return res.status(404).json({ error: error.message });
    }
    throw error;
  }
}

export async function getForumsByCourseController(req: Request, res: Response) {
  const forums = await forumService.findByCourseId(req.params.courseId as string);
  return res.status(200).json(forums);
}

// Topic
export async function createTopicController(req: Request, res: Response) {
  try {
    const data = createTopicSchema.parse(req.body);
    const topic = await topicService.create(data);
    return res.status(201).json(topic);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ error: 'Validation error', issues: error.issues });
    }
    throw error;
  }
}

export async function getTopicController(req: Request, res: Response) {
  try {
    const topic = await topicService.findById(req.params.id as string);
    return res.status(200).json(topic);
  } catch (error) {
    if (error instanceof NotFound) {
      return res.status(404).json({ error: error.message });
    }
    throw error;
  }
}

export async function getTopicsByForumController(req: Request, res: Response) {
  const topics = await topicService.findByForumId(req.params.forumId as string);
  return res.status(200).json(topics);
}

// Post
export async function createPostController(req: Request, res: Response) {
  try {
    const data = createPostSchema.parse(req.body);
    const post = await postService.create(data);
    return res.status(201).json(post);
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({ error: 'Validation error', issues: error.issues });
    }
    throw error;
  }
}

export async function getPostsByTopicController(req: Request, res: Response) {
  const posts = await postService.findByTopicId(req.params.topicId as string);
  return res.status(200).json(posts);
}

