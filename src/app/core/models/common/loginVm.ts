import { ResBase } from '../common/ResBase';

export class LoginReq {
  public cAcc: string = '';
  public cPwd: string = '';
  public mode: string = '';
}

export class LoginRes extends ResBase {
  public cId: number = 0;
  public guid: string = '';
  public cName: string = '';
  public cPhone: string = '';
  public permission: number = 0;
  public token: string = '';
}
