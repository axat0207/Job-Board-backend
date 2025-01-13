"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateJobSchema = exports.CreateJobSchema = void 0;
const zod_1 = require("zod");
exports.CreateJobSchema = zod_1.z.object({
    title: zod_1.z.string().min(1).max(255),
    company: zod_1.z.string().min(1).max(255),
    location: zod_1.z.string().min(1).max(255),
    salary: zod_1.z.number().optional(),
    description: zod_1.z.string().min(1),
});
exports.UpdateJobSchema = exports.CreateJobSchema.partial();
