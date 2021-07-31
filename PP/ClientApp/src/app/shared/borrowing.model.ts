export class Borrowing {
    Id:number=0;
    BookId:number=1;
    UserId:string='';
    Status:number=1;
    CheckoutDate:Date=new Date();
    FinishDate:Date=new Date();
    CheckInDate:Date=new Date();
}
