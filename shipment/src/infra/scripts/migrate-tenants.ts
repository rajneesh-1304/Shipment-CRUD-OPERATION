import { MikroORM } from "@mikro-orm/postgresql";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CreateSchema {
    constructor(private readonly orm: MikroORM) {}

    async createSchema(schema) {

        //     const orm = await MikroORM.init({
        //         ...databaseConfig,
        //         schema
        //     });
        
        this.orm.config.set('schema', schema);
        await this.orm.em.getConnection().execute(`create schema if not exists ${schema}`)
        await this.orm.em.getConnection().execute(
            `set search_path to "${schema}"`
        );
        await this.orm.migrator.up();
    }
}
