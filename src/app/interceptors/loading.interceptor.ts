import { Injectable } from '@angular/core';
import { LoadingService } from '../service/loading.service';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  private acticeRequest = 0;

  constructor(private loadingService: LoadingService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    if(this.acticeRequest === 0) {
      this.loadingService.show();
    }

    this.acticeRequest++;

    return next.handle(request).pipe(
      finalize(() => {
        this.acticeRequest--;
        if(this.acticeRequest === 0) {
          this.loadingService.hide();
        }
      })
    );
  }
}
