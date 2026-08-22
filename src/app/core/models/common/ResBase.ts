export abstract class ResBase {
  public status: boolean = false;
  public statusCode: string = '';
  public message: string = '';
}

export abstract class QueryResBase extends ResBase {
  public totalCount: number = 0;
}
