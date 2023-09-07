import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { CartService } from 'src/app/shared/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  cartQuantity = 0;

  constructor(private authService: AuthenticationService, cartService: CartService) {
    
      cartService.getCartObservable().subscribe((newCart) => {
      this.cartQuantity = newCart.totalCount;
    });
  }

  // user?: User | null;

  //   constructor(private accountService: AccountService) {
  //       this.accountService.user.subscribe(x => this.user = x);
  //   }

  logout() {
    this.authService.logout();
  }

  ngOnInit(): void {}
}
