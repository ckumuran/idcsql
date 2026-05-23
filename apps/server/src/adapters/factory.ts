import { DatabaseAdapter } from "./base";

import { PostgresAdapter } from "./postgres";
import { MySQLAdapter } from "./mysql";
import { SQLiteAdapter } from "./sqlite";

import { SupportedDatabase } from "../types/database";

export function createAdapter(
    databaseType: SupportedDatabase
): DatabaseAdapter {

    switch (databaseType) {

        case "postgres":
            return new PostgresAdapter();

        case "mysql":
            return new MySQLAdapter();

        case "sqlite":
            return new SQLiteAdapter();

        default:
            throw new Error(
                "Unsupported database"
            );
    }
}
