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
        
        this.orm.config.set('contextName', schema);
        await this.orm.em.getContext().getConnection().execute(`CREATE DATABASE "${schema}" WITH ENCODING 'UTF8' TEMPLATE template0`);
        // await this.orm.em.getContext().getConnection().execute(
        //     `set search_path to public`
        // );
        await this.orm.migrator.up();
    }
}
