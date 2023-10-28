import swaggerJsdoc from "swagger-jsdoc";

const swaggerOption = {
  swaggerDefinition: {
    info: {
      version: "3.0.0",
      title: "BSA",
      description: "API documentation",
      contact: {
        name: "Rajdeep Debnath",
      },
      servers: ["http://localhost:3002/"],
    },
  },
  apis: ["index.js", "./routes/*.js"],
};

export const swaggerDocs = swaggerJsdoc(swaggerOption);
