import { Injectable } from '@nestjs/common';
import { eq, inArray } from 'drizzle-orm';
import { PgSelectBase, PgTableWithColumns } from 'drizzle-orm/pg-core';
import { DrizzleService } from 'src/modules/drizzle/service/drizzle.service';
import { GetAllProps } from '../interfaces/getAllProps.interface';

@Injectable()
export abstract class PostgresRepository<
  Table extends PgTableWithColumns<any>,
  NewEntity,
  Entity,
> {
  constructor(public readonly drizzle: DrizzleService) {}

  public table: Table;

  async create(input: NewEntity): Promise<Entity> {
    const result = await this.drizzle.db
      .insert(this.table)
      .values(input)
      .returning();
    return result[0] as Entity;
  }

  async getAll<P extends Partial<(typeof this.table)['_']['columns']>>(
    props?: GetAllProps<P>,
  ) {
    const result = await this.drizzle.db
      .select(props.select)
      .from(this.table)
      .limit(props.limit)
      .offset(props.offset);
    return result as PgSelectBase<any, P, 'multiple', any>;
  }

  async getById(id: string) {
    const result = await this.drizzle.db
      .select()
      .from(this.table)
      .where(eq(this.table.id, id))
      .limit(1);
    return result[0];
  }

  async getByIds(ids: string[]) {
    const results = await this.drizzle.db
      .select()
      .from(this.table)
      .where(inArray(this.table.id, ids));
    return results;
  }
}
