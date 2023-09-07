import { Time } from '@angular/common';

export class Reservation {
  id!: number;
  name!: string;
  reason!: string;
  numberOfGuest!: string;
  dateCreated!: Date;
  reserveDate!: Date;
  time!: Time;
}
