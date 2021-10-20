import { Component } from '@angular/core';
import { myCv } from 'src/models/cv.model';
import { myCvData } from '../data/cv.data';
import * as dayjs from 'dayjs'
import * as relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/fr';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public myCv!: myCv;
  constructor() {
    dayjs.extend(relativeTime)
    dayjs.locale('fr');
    this.orderMyCv();
  }

  private orderMyCv() {
    this.myCv = { ...myCvData };
  }

  public formatTitleDatejob(startDate: Date, endDate: Date, smallFormat: boolean = true): string {
    // moment().format(); 
    return "";
  }

}
