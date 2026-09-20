import { QueryReqBase } from '../common/ReqBase';
import { ResBase, QueryResBase } from '../common/ResBase';

export class AuthorInfo {
  public author: string = '';
  public aDesc: string = '';
}

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

//#region Home
export class HomeQueryBookReq {
  public mode: string = '';
}

export class HomeQueryBookRes extends QueryResBase {
  public bookList: BookInfo[] = [];
}
//#endregion

//#region Collection
export class CollectionQueryReq extends QueryReqBase {
  public typeId?: string;
  public publisher?: string;
  public langId?: string;
  public seriesId?: string;
  public sYear?: string;
  public eYear?: string;

  public override size: number = 5;
}

export class CollectionQueryRes extends QueryResBase {
  public bookList: BookInfo[] = [];
}
//#endregion

//#region Info
export class InfoQueryReq {}

export class InfoQueryRes extends ResBase {}

export class FavQueryReq {}

export class FavQueryRes extends QueryResBase {}

export class RsvQueryReq {}

export class RsvQueryRes extends QueryResBase {}

export class HxQueryReq {}

export class HxQueryRes extends QueryResBase {}

export class MsgQueryReq {}

export class MsgQueryRes extends QueryResBase {}
//#endregion

//#region Search
export class SearchQueryReq {
  public kind?: string;
  public info?: string;
  public typeId?: string;
  public langId?: string;
  public sYear?: string;
  public eYear?: string;
}

export class SearchQueryRes extends QueryResBase {
  public bookInfo: BookInfo | null = null;
}
//#endregion
