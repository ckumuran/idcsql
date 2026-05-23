import mysql from "mysql2/promise";
import { DatabaseAdapter } from "./base";

export class MySQLAdapter implements DatabaseAdapter {

    private connection: any;

    async connect() {

        this.connection = await mysql.createConnection({
            host: process.env.MYSQL_HOST,
            port: Number(process.env.MYSQL_PORT),
            user: process.env.MYSQL_USER,
            password: process.env.MYSQL_PASSWORD,
            database: process.env.MYSQL_DB
        });
    }

    async disconnect() {

        await this.connection.end();
    }

   async getSchema() {

    const [tables]: any = await this.connection.execute(`
        SHOW TABLES
    `);

    const schema: any[] = [];

    for (const row of tables) {

        const tableName = Object.values(row)[0];

        const [columns]: any = await this.connection.execute(`
            SHOW COLUMNS FROM ${tableName}
        `);

        schema.push({
            table: tableName,
            columns
        });
    }

    return schema;
}
}
