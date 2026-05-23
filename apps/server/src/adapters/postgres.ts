import { Client } from "pg";
import { DatabaseAdapter } from "./base";

export class PostgresAdapter implements DatabaseAdapter {

    private client: Client;

    constructor() {

        this.client = new Client({
            host: process.env.POSTGRES_HOST,
            port: Number(process.env.POSTGRES_PORT),
            user: process.env.POSTGRES_USER,
            password: process.env.POSTGRES_PASSWORD,
            database: process.env.POSTGRES_DB
        });
    }

    async connect() {

        await this.client.connect();
    }

    async disconnect() {

        await this.client.end();
    }

    async query(sql: string) {

        const result = await this.client.query(sql);

        return result.rows;
    }

   async getSchema() {

    const tablesResult = await this.client.query(`
        SELECT table_name
        FROM information_schema.tables
        WHERE table_schema='public'
    `);

    const schema: any[] = [];

    for (const table of tablesResult.rows) {

        const columnsResult = await this.client.query(`
            SELECT column_name, data_type
            FROM information_schema.columns
            WHERE table_name = '${table.table_name}'
        `);

        schema.push({
            table: table.table_name,
            columns: columnsResult.rows
        });
    }

    return schema;
}
}
