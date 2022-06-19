import "./pre-start"; // Must be the first import
import logger from "jet-logger";
import server from "./server";
import { createConnection } from "typeorm";

createConnection({
  type: "mysql",
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  entities: [__dirname + "/models/*"],
});

// Constants
const serverStartMsg = "Express server started on port: ",
  port = process.env.PORT || 8080;

// Start server
server.listen(port, () => {
  logger.info(serverStartMsg + port);
});
