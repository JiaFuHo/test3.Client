import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface ToastLvl {
  lvl: 'Err' | 'Warn' | 'Info';
  msg: string;
}

@Injectable({ providedIn: 'root' })
export class ToastP {
  //#region State
  public broadcast$ = new Subject<ToastLvl>();
  //#endregion

  //#region Method
  public tErr(msg: string) { this.broadcast$.next({ lvl: 'Err', msg: msg }); }

  public tWarn(msg: string) { this.broadcast$.next({ lvl: 'Warn', msg: msg }); }

  public tInfo(msg: string) { this.broadcast$.next({ lvl: 'Info', msg: msg }); }
  //#endregion
}
