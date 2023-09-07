import { inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../shared/services/authentication.service';


export function authGuard(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const router = inject(Router);
    const authService = inject(AuthenticationService);
    const user = authService.userValue;
    if (user) {
        return true;
    }

    router.navigate(['/account/login'], { queryParams: { returnUrl: state.url } });
    return false;
}
