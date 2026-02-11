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

 interface TitleArtist {
  title: string;
  artist_display: string | null;
 }


export interface RawEntry extends TitleArtist  {
  id: string;
  date_display: string | null;
  main_reference_number: string | null;
  description: string | null;
}

export interface ArtworkDetail extends TitleArtist {
  image_id: string | null;
  thumbnail: { alt_text: string } | null;
}

export type Status = 'idle' | 'loading' | 'success' | 'error';