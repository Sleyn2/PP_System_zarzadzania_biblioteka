import { Injectable } from "@angular/core";
import { LibInfo } from "./models/libInfo.model";
import { LibInfoService } from "./services/libInfo.service";

@Injectable({
    providedIn: 'root'
})
export class LibInformation{

    public libInfo: LibInfo = new LibInfo();

    setNewInfo(newInfo: LibInfo){
        this.libInfo = newInfo;
    }

    updateLibInfo(service: LibInfoService){
        let newLibInfo: LibInfo = new LibInfo();
        service.getInfo().toPromise().then(data=>{
            newLibInfo = data;
        });
    }
} 

