import { Component, Input } from "@angular/core";
import { Author } from "src/app/shared/models/author.model";
import { AuthorService } from "src/app/shared/services/author.service";

@Component({
    selector: 'ngbd-modal-content',
    templateUrl: './author-add.component.html'
})
export class AuthorAddModal {
    public formData: Author;

    @Input() AuthorList;

    constructor(
        private _authorService: AuthorService
    ) { }

    ngOnInit(): void {
        this.formData = new Author();
    }
}