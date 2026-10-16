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
  public mode?: string;
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
export class InfoQueryReqBase extends QueryReqBase {
  public guid?: string;
}

export class InfoSaveReqBase {
  public guid?: string;
}

export class InfoXQueryReq extends InfoQueryReqBase {}

export class InfoXQueryRes extends ResBase {
  public fCnt: number = 0;
  public rCnt: number = 0;
  public hCnt: number = 0;
  public mCnt: number = 0;
}

export class FavQueryReq extends InfoQueryReqBase {
  public override size: number = 5;
}

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
  public collectionId?: string;
}

export class FavSaveRes extends ResBase {}

export class RsvQueryReq extends InfoQueryReqBase {
  public override size: number = 5;
}

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
  public reservationStatusId: number = 0;
  public reservationStatus: string = '';
}

export class RsvSaveReq extends InfoSaveReqBase {
  public collectionId?: string;
  public reservationStatusId?: string;
}

export class RsvSaveRes extends ResBase {}

export class HxQueryReq extends InfoQueryReqBase {
  public override size: number = 5;
}

export class HxQueryRes extends QueryResBase {
  public hxList: HxInfo[] = [];
}

export class HxInfo {
  public historyId: number = 0;
  public collectionId: number = 0;
  public title: string = '';
  public image: string = '';
  public authorInfos: AuthorInfo[] = [];
  public borrowDate: string = '';
  public dueDateB: string = '';
  public borrowStatusId: number = 0;
  public borrowStatus: string = '';
  public score: number | null = 0;
  public feedback: string = '';
  public isFav: boolean = false;
}

export class HxSaveReq extends InfoSaveReqBase {
  public historyId?: string;
  public score?: string;
  public feedback?: string;
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
  public notificationId?: string;
  public isRead?: boolean;
}

export class MsgSaveRes extends ResBase {}
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
