import { Component, Inject } from '@angular/core';
import { LibInfo } from './shared/models/libInfo.model';
import { LibInfoService } from './shared/services/libInfo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  constructor(@Inject(LibInfoService) info: LibInfoService){
    this.service = info;
  }

  service: LibInfoService;
  title = 'app';
  libInfo: LibInfo = new LibInfo();

  ngOnInit(){
    this.service.getInfo().toPromise().then(info => this.libInfo = info);
  }
}
