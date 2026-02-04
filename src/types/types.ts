export interface RawRecord {
  title: string | null;
  creator: string | string[] | null;
  object_id: string;
}

export interface NormalizedRecord {
  title: string | null;
  creator: string[];
  object_id: string;
}