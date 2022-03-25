const swaggerAutogen = require("swagger-autogen")();
const options = {
  info: {
    title: "This is my API Document",
    description: "local 용 스웨거 생성",
  },
  host: "localhost:8080/api",
  servers: [{ url: "localhost:8080" }],
  schemes: ["http"],
  // securityDefinitions: {
  //   bearerAuth: {
  //     type: "http",
  //     scheme: "bearer",
  //     in: "header",
  //     bearerFormat: "JWT",
  //   },
  // },
};
const outputFile = "./src/swagger/swagger-output.json";
const endpointsFiles = ["./src/routes/api.ts"];
swaggerAutogen(outputFile, endpointsFiles, options);
