import { Injectable } from '@nestjs/common';
import { MikroORM } from '@mikro-orm/core';

@Injectable()
export class MigrationService {
  constructor(private readonly orm: MikroORM) {}

  async generateSchemaMigration(schemaName: string) {
    const migrator = this.orm.getMigrator();
    
    const migration = await migrator.createMigration(
      schemaName
    );

    return migration;
  }
}
