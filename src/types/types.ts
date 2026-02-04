export interface RawRecord {
  object_id: string;
  title?: string | null;
  creator?: string | string[] | null;
  date?: number | string | DateObject | null;
}

export interface NormalizedRecord {
  object_id: string;
  title?: string | null;
  creator?: string[] | null;
  date?: string | null;
}

export interface DateObject {
  display: string | null;
  earliest: string | null;
  latest: string | null;
}