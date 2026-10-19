import { ResBase } from '../common/ResBase';

export class LangInfo {
  public langId: number = 0;
  public lang: string = '';
}

export class SeriesInfo {
  public seriesId: number = 0;
  public series: string = '';
}

export class TypeInfo {
  public typeId: number = 0;
  public type: string = '';
}

export class LookupRes extends ResBase {
  public typeList: TypeInfo[] = [];
  public publisherList: string[] = [];
  public langList: LangInfo[] = [];
  public seriesList: SeriesInfo[] = [];
}
