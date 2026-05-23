import Database from "better-sqlite3";
import { DatabaseAdapter } from "./base";

export class SQLiteAdapter implements DatabaseAdapter {

    private db: any;

    async connect() {

        this.db = new Database(
            process.env.SQLITE_PATH || "database.sqlite"
        );
    }

    async disconnect() {

        this.db.close();
    }

    async query(sql: string) {

        const stmt = this.db.prepare(sql);

        return stmt.all();
    }

   async getSchema() {

    const tables = this.db.prepare(`
        SELECT name
        FROM sqlite_master
        WHERE type='table'
    `).all();

    const schema: any[] = [];

    for (const table of tables) {

        const columns = this.db.prepare(`
            PRAGMA table_info(${table.name})
        `).all();

        schema.push({
            table: table.name,
            columns
        });
    }

    return schema;
}
}
