import express from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import cors from "cors"; // Ensure this import is present
import jobRoutes from "./routes/jobRoutes";
const app = express();
app.use(express.json());
app.use(cors());

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

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.use("/jobs", jobRoutes);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(
    `Swagger documentation is available at http://localhost:${PORT}/api-docs`
  );
});
