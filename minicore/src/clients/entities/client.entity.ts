import { ContractEntity } from 'src/contracts/entities/contract.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('client')
export class ClientEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => ClientEntity, (client: ClientEntity) => client.contracts)
  contracts: ContractEntity[];
}
