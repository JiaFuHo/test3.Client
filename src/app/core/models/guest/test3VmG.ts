import { QueryReqBase } from '../common/ReqBase';
import { ResBase, QueryResBase } from '../common/ResBase';

export class AuthorInfo {
  public author: string = '';
  public aDesc: string = '';
}

export class BookInfo {
  public collectionId: number = 0;
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
  public typeId?: number;
  public publisher?: string;
  public langId?: number;
  public seriesId?: number;
  public sYear?: number;
  public eYear?: number;

  public override size: number = 5;
}

export class CollectionQueryRes extends QueryResBase {
  public bookList: BookInfo[] = [];
}
//#endregion

//#region Info
export class InfoQueryReqBase extends QueryReqBase {
  public guid: string = '';
}

export class InfoSaveReqBase {
  public guid: string = '';
}

export class FavQueryReq extends InfoQueryReqBase {}

export class FavQueryRes extends QueryResBase {
  public favList: FavInfo[] = [];
}

export class FavInfo {
  public collectionId: number = 0;
  public title: string = '';
  public image: string = '';
  public authorInfos: AuthorInfo[] = [];
  public publisher: string = '';
}

export class FavSaveReq extends InfoSaveReqBase {
  public collectionId?: number;
}

export class FavSaveRes extends ResBase {}

export class RsvQueryReq extends InfoQueryReqBase {}

export class RsvQueryRes extends QueryResBase {
  public rsvList: RsvInfo[] = [];
}

export class RsvInfo {
  public collectionId: number = 0;
  public title: string = '';
  public image: string = '';
  public authorInfos: AuthorInfo[] = [];
  public reservateDate: string = '';
  public dueDateR: string = '';
  public reservationStatus: string = '';
}

export class RsvSaveReq extends InfoSaveReqBase {
  public collectionId?: number;
  public reservationStatusId?: number;
}

export class RsvSaveRes extends ResBase {}

export class HxQueryReq extends InfoQueryReqBase {}

export class HxQueryRes extends QueryResBase {
  public hxList: HxInfo[] = [];
}

export class HxInfo {
  public historyId?: number;
  public title: string = '';
  public image: string = '';
  public authorInfos: AuthorInfo[] = [];
  public borrowDate: string = '';
  public dueDateB: string = '';
  public borrowStatus: string = '';
  public score: number = 0;
  public feedback: string = '';
}

export class HxSaveReq extends InfoSaveReqBase {
  public historyId?: number;
  public score?: number;
  public feedback: string = '';
}

export class HxSaveRes extends ResBase {}

export class MsgQueryReq extends InfoQueryReqBase {}

export class MsgQueryRes extends QueryResBase {
  public msgList: MsgInfo[] = [];
}

export class MsgInfo {
  public notificationId: number = 0;
  public message: string = '';
  public notificationDate: string = '';
  public isRead: boolean = false;
}

export class MsgSaveReq extends InfoSaveReqBase {
  public notificationId?: number;
  public isRead?: boolean;
}

export class MsgSaveRes extends ResBase {}
//#endregion

//#region Search
export class SearchQueryReq {
  public kind?: string;
  public info?: string;
  public typeId?: number;
  public langId?: number;
  public sYear?: number;
  public eYear?: number;
}

export class SearchQueryRes extends QueryResBase {
  public bookInfo: BookInfo | null = null;
}
//#endregion
