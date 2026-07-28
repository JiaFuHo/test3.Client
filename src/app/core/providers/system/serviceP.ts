import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HttpProvider {
  //#region State
  private _http = inject(HttpClient);

  private readonly serviceURL = 'https://localhost:7777';
  //#endregion

  //#region Method
  public get<T>(endpoint: string): Observable<T> {
    const URL = `${this.serviceURL}${endpoint}`;

    return this._http.get<T>(URL);
  }

  public post<T>(endpoint: string, body: any): Observable<T> {
    const URL = `${this.serviceURL}${endpoint}`;

    return this._http.post<T>(URL, body);
  }

  public put<T>(endpoint: string, body: any): Observable<T> {
    const URL = `${this.serviceURL}${endpoint}`;

    return this._http.put<T>(URL, body);
  }

  public delete<T>(endpoint: string): Observable<T> {
    const URL = `${this.serviceURL}${endpoint}`;

    return this._http.delete<T>(URL);
  }
  //#endregion
}
