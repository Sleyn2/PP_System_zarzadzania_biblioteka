import { Component } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { UserService } from "src/app/shared/services/user.service";


@Component({
    selector: 'ngbd-modal-content',
    templateUrl: './role-registration.component.html',
})
export class RegisterModalComponent {

    constructor(
        public activeModal: NgbActiveModal,
        private _userService: UserService
    ) { }

    public body = {
        UserName: "",
        Email: "",
        FullName: "",
        Password: ""
    };

    save() {
        this._userService.registerWithRole(2, this.body).subscribe();
    }
}