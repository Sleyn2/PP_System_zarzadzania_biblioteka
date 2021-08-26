import { BorrowingStatus } from "../enums/borrowing-status.enum";

export class Borrowing {
    Id: number;
    BookId: number;
    Status: BorrowingStatus;
    CheckoutDate: Date;
    FinishDate: Date;
    CheckInDate: Date;
}
