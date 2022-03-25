const swaggerAutogen = require("swagger-autogen")();
const options = {
  info: {
    title: "This is my API Document",
    description: "이렇게 스웨거 자동생성이 됩니다.",
  },
  host: "j6a105.p.ssafy.io:8080/api",
  servers: [{ url: "http://j6a105.p.ssafy.io:8080" }],
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
swaggerAutogen(outputFile, endpointsFiles, options).then(() => {
  require("../server.ts");
});
