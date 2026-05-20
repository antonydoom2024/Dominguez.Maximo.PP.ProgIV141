import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../service/auth";

export const authGuard : CanActivateFn = () => {
    const auth = inject(AuthService);
    const router = inject(Router);

    if(auth.isAutheticated()) return true;

    router.navigate(['/login']);

    return false;
}