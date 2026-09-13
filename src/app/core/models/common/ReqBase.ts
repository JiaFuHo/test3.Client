export abstract class QueryReqBase {
  public page: number = 1;
  public size: number = 10;
  public sort?: string = '';
  public mode?: string = 'A';
}
