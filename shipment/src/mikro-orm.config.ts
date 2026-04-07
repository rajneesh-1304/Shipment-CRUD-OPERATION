import { Migrator } from "@mikro-orm/migrations";
import { defineConfig, Options, PostgreSqlDriver } from "@mikro-orm/postgresql";
import { ConfigService } from "@nestjs/config";

const configService = new ConfigService();
const databaseConfig: Options = defineConfig({
    
    driver: PostgreSqlDriver,
    dbName: process.env.DB_NAME ?? "shipment",
    port: Number(process.env.DB_PORT ?? "5432"),
    host: process.env.DB_HOST ?? "db",
    user: process.env.DB_USER ?? "postgres",
    password: process.env.DB_PASSWORD ?? "postgres",
    entities: ['dist/domain/entity/**/*.entity.js'],
    entitiesTs: ['src/domain/entity/**/*.entity.ts'],
    debug: true,
    extensions: [Migrator],
    migrations: {
        tableName: "micro-orm-migrations",
        path: "dist/infra/migrations",
        pathTs: "src/infra/migrations",
        transactional: true,
        dropTables: false,
        fileName(timestamp, name) {
            return `Migration${timestamp}_${name}`;
        },
        snapshot: false
    },
});

export default databaseConfig;