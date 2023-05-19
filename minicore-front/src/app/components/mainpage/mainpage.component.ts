import { Component } from '@angular/core';
import { MinicoreService } from 'src/app/services/minicore.service';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css'],
})
export class MainpageComponent {
  constructor(private minicoreService: MinicoreService) {}
  clients: any;
  contracts: any;
  reports: any;

  dates: any = {
    beginDate: new Date(),
    endDate: new Date(),
  };

  ngOnInit(): void {
    this.getClients();
    this.getContracts();
  }

  getClients() {
    this.minicoreService.getAllClients().subscribe({
      next: (response) => {
        this.clients = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getContracts() {
    this.minicoreService.getAllContracts().subscribe({
      next: (response) => {
        this.contracts = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  getReports() {
    this.minicoreService.getReports(this.dates).subscribe({
      next: (response) => {
        this.reports = response;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
