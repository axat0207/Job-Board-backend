import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { CreateJobSchema, UpdateJobSchema } from "../types/jobs";

const prisma = new PrismaClient();

/**
 * @swagger
 * components:
 *   schemas:
 *     Job:
 *       type: object
 *       required:
 *         - title
 *         - company
 *         - location
 *         - description
 *       properties:
 *         id:
 *           type: integer
 *           description: The auto-generated id of the job
 *         title:
 *           type: string
 *           description: The job title
 *         company:
 *           type: string
 *           description: The company name
 *         location:
 *           type: string
 *           description: Job location
 *         salary:
 *           type: number
 *           description: Job salary
 *         description:
 *           type: string
 *           description: Job description
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *     CreateJobDto:
 *       type: object
 *       required:
 *         - title
 *         - company
 *         - location
 *         - description
 *       properties:
 *         title:
 *           type: string
 *         company:
 *           type: string
 *         location:
 *           type: string
 *         salary:
 *           type: number
 *         description:
 *           type: string
 */

export class JobController {
  /**
   * @swagger
   * /jobs:
   *   post:
   *     summary: Create a new job posting
   *     tags: [Jobs]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateJobDto'
   *     responses:
   *       201:
   *         description: The job was successfully created
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Job'
   *       400:
   *         description: Invalid input
   */
  async create(req: Request, res: Response) {
    try {
      const data = CreateJobSchema.parse(req.body);
      const job = await prisma.job.create({ data });
      res.status(201).json(job);
    } catch (error) {
      res.status(400).json({ error: "Invalid input" });
    }
  }

  /**
   * @swagger
   * /jobs:
   *   get:
   *     summary: Retrieve all job postings
   *     tags: [Jobs]
   *     responses:
   *       200:
   *         description: List of all jobs
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Job'
   */
  async findAll(req: Request, res: Response) {
    const jobs = await prisma.job.findMany();
    res.json(jobs);
  }

  /**
   * @swagger
   * /jobs/{id}:
   *   get:
   *     summary: Get a job posting by ID
   *     tags: [Jobs]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: The job ID
   *     responses:
   *       200:
   *         description: Job details
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Job'
   *       404:
   *         description: Job not found
   */
  async findOne(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const job = await prisma.job.findUnique({ where: { id } });

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    res.json(job);
  }

  /**
   * @swagger
   * /jobs/{id}:
   *   put:
   *     summary: Update a job posting
   *     tags: [Jobs]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: The job ID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/CreateJobDto'
   *     responses:
   *       200:
   *         description: Job was updated
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Job'
   *       404:
   *         description: Job not found
   */
  async update(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const data = UpdateJobSchema.parse(req.body);

      const job = await prisma.job.update({
        where: { id },
        data,
      });

      res.json(job);
    } catch (error) {
      res.status(400).json({ error: "Invalid input" });
    }
  }

  /**
   * @swagger
   * /jobs/{id}:
   *   delete:
   *     summary: Delete a job posting
   *     tags: [Jobs]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: The job ID
   *     responses:
   *       204:
   *         description: Job was deleted
   *       404:
   *         description: Job not found
   */
  async delete(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    try {
      await prisma.job.delete({ where: { id } });
      res.status(204).send();
    } catch (error) {
      res.status(404).json({ error: "Job not found" });
    }
  }
}
