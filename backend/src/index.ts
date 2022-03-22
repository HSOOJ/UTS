import "./pre-start"; // Must be the first import
import logger from "jet-logger";
import server from "./server";
import { createConnection, QueryError, RowDataPacket } from "mysql2";

// Constants
const serverStartMsg = "Express server started on port: ",
  port = process.env.PORT || 8080;

const connection = createConnection({
  host: process.env.MYSQL_HOST,
  database: process.env.MYSQL_DATABASE,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
});

connection.query(
  "SELECT 1 + 1 AS solution",
  (err: QueryError, rows: RowDataPacket[]) => {
    logger.info("The solution is: " + rows);
    // logger.info("The solution is: " + rows[0]["solution"]);
  }
);

// connection.execute(
// "SELECT * from user",
// ["Hello World", 1],
// (err: QueryError, result: OkPacket) => {
// logger.info(result.affectedRows);
// }
// );

// Start server
server.listen(port, () => {
  logger.info(serverStartMsg + port);
});
