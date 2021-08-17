import { Component, Inject } from '@angular/core';
import { LibInformation } from './shared/export';
// import { libInfo, setInfo } from './shared/export';
import { LibInfo } from './shared/models/libInfo.model';
import { LibInfoService } from './shared/services/libInfo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  private service: LibInfoService;
  private libInformation: LibInformation
  public title = 'app';
  public libInfoLocal: LibInfo = new LibInfo();

  constructor(@Inject(LibInfoService) info: LibInfoService, libInformationService: LibInformation) {
    this.service = info;
    this.libInformation = libInformationService;
  }

  ngOnInit() {
    this.service.getInfo().toPromise().then(data => {
      this.libInformation.setNewInfo(data);
      this.libInfoLocal = data;
    });
  }

  reciveMessage($event){
    if($event === 'libInfoEdited'){
      this.libInfoLocal = this.libInformation.libInfo;
    }
  }
}
