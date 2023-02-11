import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'portofolio-web-app';

  constructor(private translate:TranslateService){
    const languages = ['es','en'];
    this.translate.addLangs(languages);
    this.translate.setDefaultLang('es');
    this.translate.use('es')
  }
}
