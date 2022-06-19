const swaggerAutogen = require("swagger-autogen")();
const options = {
  info: {
    title: "Under the Sea",
    description: "싸피 서울 6기 특화 프로젝트 - UTS",
  },
  host: "uts_url:8080/api",
  servers: [{ url: "http://uts_url:8080" }],
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
