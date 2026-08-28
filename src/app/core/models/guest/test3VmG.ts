import { Info } from './../../../features/guest/info/info';
import { QueryResBase } from '../common/ResBase';

export class BookInfo {
  public title: string = '';
  public bDesc: string = '';
  public image: string = '';
  public type: string = '';
  public authorInfos: AuthorInfo[] = [];
  public translator: string = '';
  public publisher: string = '';
  public language: string = '';
  public isbn: string = '';
  public publishDate: string = '';
  public bookStatus: boolean = false;
}

export class AuthorInfo {
  public author: string = '';
  public aDesc: string = '';
}

//#region Home
export class HomeQueryBookReq {
  public mode: string = '';
}

export class HomeQueryBookRes extends QueryResBase {
  public bookList: BookInfo[] = [];
}

export class HomeQuerySeriesRes extends QueryResBase {
  public seriesList: string[] = [];
}
//#endregion

//#region Collection
export class CollectionQueryReq {}

export class CollectionQueryRes extends QueryResBase {}
//#endregion

//#region Info
export class InfoQueryReq {}

export class InfoQueryRes extends QueryResBase {}
//#endregion

//#region Search
export class SearchQueryReq {
  public type1?: string;
  public info?: string;
  public sYear?: string;
  public eYear?: string;
  public lang?: string;
  public type2?: string;
}

export class SearchQueryRes extends QueryResBase {
  public bookInfo: BookInfo | null = null;
}
//#endregion
