import { Component, Inject } from '@angular/core';
import { info } from 'console';
import { LibInfo } from './shared/models/libInfo.model';
import { LibInfoService } from './shared/services/libInfo.service';

export let libInfo: LibInfo = new LibInfo();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  public libInfoLocal: LibInfo = new LibInfo();

  constructor(@Inject(LibInfoService) info: LibInfoService) {
    this.service = info;
  }

  service: LibInfoService;
  title = 'app';

  ngOnInit() {
    this.service.getInfo().toPromise().then(data => {
      console.log(data);
      libInfo = data;
      this.libInfoLocal = data
    })
  }

  reciveMessage($event){
    if($event === 'success'){
    this.libInfoLocal = libInfo;
    }
  }
}

export function update(service: LibInfoService) {
  let app: AppComponent;

  service.getInfo().toPromise().then(data => {
    console.log(data);
    libInfo = data}).finally(()=>{
      console.log(libInfo);
      app.libInfoLocal = libInfo;
    });
}