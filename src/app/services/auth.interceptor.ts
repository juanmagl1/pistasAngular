import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private cookies:CookieService,private router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token:string=this.cookies.get('token');
    let req=request

    if (token){
      req=request.clone({
        setHeaders:{
          authorization:`Bearer ${token}`
        }
      });
    }
    return next.handle(request)
    .pipe(
      catchError((err: HttpErrorResponse) => {
      if (err.status===401){
        this.router.navigateByUrl('/');
      }
      return throwError( err );
    }
    
    )
    );
  }
}
