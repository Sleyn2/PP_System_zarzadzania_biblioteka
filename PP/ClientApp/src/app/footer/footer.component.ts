import { Component } from "@angular/core";
import { LibInformation } from "../shared/export";
import { LibInfo } from "../shared/models/libInfo.model";
import { LibInfoService } from "../shared/services/libInfo.service";

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styles: []
})
export class FooterComponent {

    public libInfoLocal: LibInfo = new LibInfo();

    constructor(
    private _info: LibInfoService, 
    private _libInformationService: LibInformation
    ) { }

    ngOnInit() {
        this._info.getInfo().toPromise().then(data => {
            this._libInformationService.setNewInfo(data);
            this.libInfoLocal = data;
        });
    }

    reciveMessage($event) {
        if ($event === 'libInfoEdited') this.libInfoLocal = this._libInformationService.libInfo;
    }
}