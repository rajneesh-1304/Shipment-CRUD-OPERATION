import { faker } from '@faker-js/faker';
import { Tenant } from '../../../domain/entity/tenant.entity';

export class UserMother {
  constructor(
    private readonly params: {
      id?: string;
      name?: string;
    } = {},
  ) {
    this.params = params;
  }

  public get() {
    const tenant = new Tenant();
    tenant.id = this.params.id || faker.string.uuid();
    tenant.name = this.params.name || faker.company.name();
    return tenant;
  }


}