import { Router } from "express";
import { JobController } from "../controllers/jobController";

const router = Router();
const jobController = new JobController();

router.post("/", (req, res) => jobController.create(req, res));
router.get("/", (req, res) => jobController.findAll(req, res));
router.get("/:id", (req, res) => jobController.findOne(req, res));
router.put("/:id", (req, res) => jobController.update(req, res));
router.delete("/:id", (req, res) => jobController.delete(req, res));

export default router;
