export interface RawRecord {
  object_id: string;
  title?: string | null;
  creator?: string | string[] | null;
  date?: number | string | DateObject | null;
  // object_type: string;
  // department: string;
  materials: object | string;
  // dimensions: object;
  // tags: object;
  // credit_line: string;
  // notes: object;
  // provenance: object;
  // external_ids: object;
  // description: string;
  // flags: object;
  // condition: string;
  // keywords: object;
  // related: object;
  // geo: object;
  // inventory_location: number;
  // rights: object | string;
  // transcription: object | string;
  // series: object;
  // location: object;
  // variants: object;
  // edition: object;
  // status: string;
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