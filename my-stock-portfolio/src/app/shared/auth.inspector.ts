import { HttpUserEvent } from "@angular/common/http";
import { Observable} from 'rxjs';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

/**
 *@brief Intercepts http requests from the application to add JWT auth token
 *to the Authorization header if the user is logged in
 *
 * @export
 * @class AuthInterceptor
 * @implements {HttpInterceptor}
 */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private router: Router) { }
    //Handler: Will intercept any http request going out.
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //If the request doesn't need auth; use this.
        //req.headers.get('No-Auth') :  This checks the header of the request
        //next.handle(req.clone()) : clone the whole request and send it
        if (req.headers.get('No-Auth') == "True")
            return next.handle(req.clone());

        //If we do need auth, first if will fail.
        //localStorage.getItem('accessToken') : Will check if there is a token in local storage
        if (localStorage.getItem('idToken') != null) {
            //Copies request that was caught and adds the authorization
            const clonedreq = req.clone({
                headers: req.headers.set("idToken", localStorage.getItem('idToken'))
            });
            
            //This sends the request that was cloned.
            return next.handle(clonedreq);
        }
        //If no token, send user to login.
        else {
            this.router.navigateByUrl('/login');
        }
    }
}
