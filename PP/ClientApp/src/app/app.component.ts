import { Component, Inject } from '@angular/core';
import { LibInformation } from './shared/export';
import { LibInfo } from './shared/models/libInfo.model';
import { LibInfoService } from './shared/services/libInfo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  public title = 'app';
  public libInfoLocal: LibInfo = new LibInfo();

  constructor(@Inject(LibInfoService) private info: LibInfoService, private libInformationService: LibInformation) { }

  ngOnInit() {
    this.info.getInfo().toPromise().then(data => {
      this.libInformationService.setNewInfo(data);
      this.libInfoLocal = data;
    });
  }

  reciveMessage($event) {
    if ($event === 'libInfoEdited') this.libInfoLocal = this.libInformationService.libInfo;
  }
}
