import { ClientEntity } from 'src/clients/entities/client.entity';

export class CreateContractDto {
  amount: number;

  date: Date;

  client: ClientEntity;
}
