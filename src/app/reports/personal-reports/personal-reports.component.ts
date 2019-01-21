
import { Component, OnInit , ElementRef, ViewChild} from '@angular/core';
// import { TABLE_HELPERS, ExampleDatabase, ExampleDataSource } from './helpers.data';
import { MatPaginator, MatSort, MatTableDataSource, DateAdapter, MatDatepickerInputEvent } from '@angular/material';
import { SelectionModel, DataSource } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';

import { DatePipe } from '@angular/common';
import { LeaveService } from '../../leaves/leaves.service';

@Component({
  selector: 'app-personal-reports',
  templateUrl: './personal-reports.component.html',
  styleUrls: ['./personal-reports.component.scss']
})
export class PersonalReportsComponent implements OnInit {
  dataSource = ELEMENT_DATA;


  displayedColumns = ['id', 'name', 'weight', 'descriptions'];

  spans = [];

  tempRowId = null;
  tempRowCount = null;

  constructor() {
    this.cacheSpan('Priority', d => d.id);
    this.cacheSpan('Name', d => d.name);
    this.cacheSpan('Weight', d => d.weight);
  }
ngOnInit() {}
  /**
   * Evaluated and store an evaluation of the rowspan for each row.
   * The key determines the column it affects, and the accessor determines the
   * value that should be checked for spanning.
   */
  cacheSpan(key, accessor) {
    for (let i = 0; i < DATA.length;) {
      let currentValue = accessor(DATA[i]);
      let count = 1;

      // Iterate through the remaining rows to see how many match
      // the current value as retrieved through the accessor.
      for (let j = i + 1; j < DATA.length; j++) {
        if (currentValue != accessor(DATA[j])) {
          break;
        }

        count++;
      }

      if (!this.spans[i]) {
        this.spans[i] = {};
      }

      // Store the number of similar values that were found (the span)
      // and skip i to the next unique row.
      this.spans[i][key] = count;
      i += count;
    }
  }

  getRowSpan(col, index) {    
    return this.spans[index] && this.spans[index][col];
  }
}

export interface PeriodicElement {
  id: number;
  name: string;
  weight: number[];
  descriptions: string[];
}

const originalData = [
  
  { id: 1, name: '2018-12-14', weight: [1.0079,12], descriptions: ['row1', 'row2'] },
  { id: 2, name: '2018-12-15', weight: [4.0026], descriptions: ['row1', 'row2', 'row3'] },
  { id: 3, name: '2018-12-16', weight: [6.941,12], descriptions: ['row1', 'row2'] },
  { id: 4, name: '2018-12-17', weight: [9.0122], descriptions: ['row1', 'row2', 'row3'] },
  { id: 5, name: '2018-12-18', weight: [10.811], descriptions: ['row1'] },
  { id: 6, name: '2018-12-19', weight: [12.010], descriptions: ['row1', 'row2', 'row3'] },
  { id: 7, name: '2018-12-20', weight: [14.006], descriptions: ['row1'] },
  { id: 8, name: '2018-12-21', weight: [15.999], descriptions: ['row1'] },
  { id: 9, name: '2018-12-22', weight: [18.998], descriptions: ['row1', 'row2', 'row3'] },
  { id: 10, name: '2018-12-23', weight: [20.179], descriptions: ['row1', 'row2', 'row3'] },
]

const DATA = originalData.reduce((current, next) => {
  next.descriptions.forEach(b => {
    current.push({ id: next.id, name: next.name, weight: next.weight, descriptions: b })
  });
  return current;
}, []);
console.log(DATA)

const ELEMENT_DATA: PeriodicElement[] = DATA;


