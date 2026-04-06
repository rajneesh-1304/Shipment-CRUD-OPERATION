import { MikroORM } from "@mikro-orm/postgresql";
import databaseConfig from "src/mikro-orm.config";

export async function migrateTenants(schema) {
    const orm = await MikroORM.init(databaseConfig);
    const s: any = {
        DB_SCHEMA: schema
    }
    process.env.DB_SCHEMA = schema;

    await orm.migrator.up(s);

    await orm.close();
}