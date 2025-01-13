"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const cors_1 = __importDefault(require("cors")); // Ensure this import is present
const jobRoutes_1 = __importDefault(require("./routes/jobRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Job Board API",
            version: "1.0.0",
            description: "A simple job board API",
        },
        servers: [
            {
                url: "http://localhost:7000",
                description: "Development server",
            },
        ],
    },
    apis: ["./src/controllers/*.ts"], // files containing annotations as above
};
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
// Routes
app.use("/jobs", jobRoutes_1.default);
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Swagger documentation is available at http://localhost:${PORT}/api-docs`);
});
