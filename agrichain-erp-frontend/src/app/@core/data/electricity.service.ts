import { Injectable } from '@angular/core';

@Injectable()
export class ElectricityService {

  private data = [
    {
      title: 'Today',
      months: [
        { month: 'Produce 1', delta: '0.97', down: true,  cost: '97.20' },
        { month: 'Produce 2', delta: '1.83', down: true,  cost: '95.25' },
        { month: 'Produce 3', delta: '0.64', down: true,  cost: '94.50' },
        { month: 'Produce 4', delta: '2.17', down: false, cost: '98.50' },
        { month: 'Produce 5', delta: '1.32', down: true,  cost: '96.80' },
        { month: 'Produce 6', delta: '0.05', down: true,  cost: '96.84' },
        { month: 'Produce 7', delta: '1.39', down: false,  cost: '97.60' },
        { month: 'Produce 8', delta: '0.73', down: true,  cost: '95.56' },
        { month: 'Produce 9', delta: '2.61', down: true,  cost: '92.58' },
        { month: 'Produce 10', delta: '0.16', down: true, cost: '92.69' },
        { month: 'Produce 11', delta: '1.71', down: true, cost: '89.56' },
        { month: 'Produce 12', delta: '0.37', down: false, cost: '91.89' },
      ],
    },
    {
      title: '10 DAYS',
      active: true,
      months: [
        { month: 'Produce 1', delta: '1.56', down: true,  cost: '91.60' },
        { month: 'Produce 2', delta: '0.33', down: false,  cost: '92.56' },
        { month: 'Produce 3', delta: '0.62', down: true,  cost: '92.48' },
        { month: 'Produce 4', delta: '1.93', down: true,  cost: '87.56' },
        { month: 'Produce 5', delta: '2.52', down: true, cost: '83.56' },
        { month: 'Produce 6', delta: '0.39', down: false,  cost: '85.89' },
        { month: 'Produce 7', delta: '1.61', down: true, cost: '81.45' },
        { month: 'Produce 8', delta: '1.41', down: true,  cost: '76.65' },
        { month: 'Produce 9', delta: '1.03', down: true,  cost: '74.32' },
        { month: 'Produce 10', delta: '2.94', down: false,  cost: '82.12' },
        { month: 'Produce 11', delta: '0.26', down: true,  cost: '81.45' },
        { month: 'Produce 12', delta: '1.62', down: true, cost: '76.85' },
      ],
    },
  ];

  constructor() {
  }

  // TODO: observables
  getData() {
    return this.data;
  }
}
