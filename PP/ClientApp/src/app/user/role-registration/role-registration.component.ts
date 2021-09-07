import { Component } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { UserService } from "src/app/shared/services/user.service";


@Component({
    selector: 'ngbd-modal-content',
    templateUrl: './role-registration.component.html',
})
export class RegisterModalComponent {

    constructor(
        private _toastr: ToastrService,
        public activeModal: NgbActiveModal,
        private _userService: UserService
    ) { }

    public selectedRole: number;

    ngOnInit() {
        this.selectedRole = 1;
    }

    public body = {
        UserName: "",
        Email: "",
        FullName: "",
        Password: ""
    };

    save() {
        if (this.body) {
            if (this.body.Password.length > 3 && this.body.UserName.length > 0) {
                this._userService.registerWithRole(this.selectedRole, this.body).subscribe(
                    (res: any) => {
                        if (res.succeeded) {
                            this._toastr.success('Utworzono nowego użytkownika!', 'Sukces.');
                            this.activeModal.close()
                        } else {
                            res.errors.forEach(element => {
                                switch (element.code) {
                                    case 'DuplicateUserName':
                                        this._toastr.error('Nazwa użytkownika zajęta.', 'Niepowodzenie.')
                                        break;
                                    default:
                                        this._toastr.error(element.description, 'Niepowodzenie.')

                                        break;

                                }
                            })
                        }
                    },
                    err => {
                        console.log(err);
                    }
                )
            }
        }
    }
}