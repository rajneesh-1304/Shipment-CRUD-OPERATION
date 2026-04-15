import { MikroORM } from "@mikro-orm/postgresql";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CreateSchema {
    constructor(private readonly orm: MikroORM) {}
    
    async createSchema(schema: string) {
        this.orm.config.set('schema', schema);
        await this.orm.em.getContext().getConnection().execute(
            `set search_path to "${schema}"`
        );
        await this.orm.migrator.up();
        this.orm.config.set('schema', "public");
        await this.orm.em.getContext().getConnection().execute(
            `set search_path to "public"`
        );
        console.log('i got hit ')
    }
}
