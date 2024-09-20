import { createPool } from "mysql2/promise.js";
import { DB_HOST, DB_USERNAME, DB_PORT, DB_NAME, DB_PASS } from "../../configEnvExample.js";

export const pool = createPool({
    host: DB_HOST,
    user: DB_USERNAME,
    password: DB_PASS,
    port: DB_PORT,
    database: DB_NAME
})