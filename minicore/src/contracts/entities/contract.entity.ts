import { ClientEntity } from 'src/clients/entities/client.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('contract')
export class ContractEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column('date')
  date: Date;

  @ManyToOne(() => ClientEntity, (client: ClientEntity) => client.contracts, {
    eager: true,
  })
  client: ClientEntity;
}
