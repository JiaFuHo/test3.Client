import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ServiceP {
  //#region State
  private _http = inject(HttpClient);

  private readonly serviceURL = 'https://localhost:7777';
  //#endregion

  //#region Method
  public get<T>(endpoint: string, args?: any): Observable<T> {
    const URL = `${this.serviceURL}${endpoint}`;

    return this._http.get<T>(URL, { params: args });
  }

  public post<T>(endpoint: string, args: any): Observable<T> {
    const URL = `${this.serviceURL}${endpoint}`;

    return this._http.post<T>(URL, args);
  }

  public put<T>(endpoint: string, args: any): Observable<T> {
    const URL = `${this.serviceURL}${endpoint}`;

    return this._http.put<T>(URL, args);
  }

  public delete<T>(endpoint: string, args?: any): Observable<T> {
    const URL = `${this.serviceURL}${endpoint}`;

    return this._http.delete<T>(URL, { params: args });
  }
  //#endregion
}
