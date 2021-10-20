import { Component } from '@angular/core';
import { MatIconRegistry } from "@angular/material/icon";
import { myCv } from 'src/models/cv.model';
import { myCvData } from '../data/cv.data';
import * as dayjs from 'dayjs'
import * as relativeTime from 'dayjs/plugin/relativeTime';
import 'dayjs/locale/fr';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public myCv: myCv = myCvData;
  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) {
    dayjs.extend(relativeTime)
    this.registerIcon();
  }

  private registerIcon() {
    this.matIconRegistry.addSvgIcon(
      `linkedin`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/icons8-linkedin.svg")
    );
    this.matIconRegistry.addSvgIcon(
      `github`,
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/images/icons8-github.svg")
    );
  }

  public getLanguages() {

  }

  public formatTitleDatejob(startDate: Date, endDate: Date, smallFormat: boolean = true): string {
    // moment().format(); 
    return "";
  }

  public openSite(siteUrl: string) {
    window.open("//" + siteUrl, '_blank');
 }

 public makeCVasPDF() {
   alert('comming soon');
 }

}
