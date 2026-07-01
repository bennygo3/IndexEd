import pg from "pg";
import config from "../../config.js";

const { Pool } = pg; // Pool allows multiple connections vs Client which uses the same connection for ever req.

const pool = new Pool({
    user: config.POSTGRES_USER,
    host: config.POSTGRES_HOST,
    database: config.POSTGRES_DB,
    port: config.POSTGRES_PORT,
});

export default pool;