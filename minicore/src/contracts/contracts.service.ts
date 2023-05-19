import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { report } from 'process';
import { ClientsService } from 'src/clients/clients.service';
import { ClientEntity } from 'src/clients/entities/client.entity';
import { Repository } from 'typeorm';
import { CreateContractDto } from './dto/create-contract.dto';
import { ContractEntity } from './entities/contract.entity';

let allClients: any;

@Injectable()
export class ContractsService {
  constructor(
    @InjectRepository(ContractEntity)
    private contractRepo: Repository<ContractEntity>,
    private clientService: ClientsService,
  ) {}

  async create(createContractDto: CreateContractDto) {
    return this.contractRepo.save(createContractDto);
  }

  async findAll() {
    return await this.contractRepo.find();
  }

  async findOne(id: number) {
    return this.contractRepo.findOne({
      where: { id },
    });
  }

  async getReportBetweenDates(beginDateParam: Date, endDateParam: Date) {
    const beginDate = new Date(beginDateParam);
    const endDate = new Date(endDateParam);
    const report = [];

    let allClients = await this.clientService.findAll();

    let allContracts = await (
      await this.findAll().then()
    ).filter((item: ContractEntity) => {
      const contractDate = new Date(item.date);
      return (
        contractDate.valueOf() >= beginDate.valueOf() &&
        contractDate.valueOf() <= endDate.valueOf()
      );
    });

    allClients.forEach((client) => {
      let totalAmount = 0;
      allContracts.forEach((contract) => {
        if (contract.client.id === client.id) {
          totalAmount = totalAmount + contract.amount;
        }
      });
      report.push({ name: client.name, totalAmount });
    });
    return report;
  }
}
