import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  GuardResult,
  MaybeAsync,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class AuthGuardService  implements CanActivate {
  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot):  boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    // Ajoutez votre logique d'authentification ici
    return true; // ou false selon la logique
  }

}


