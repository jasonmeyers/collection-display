import type { RawRecord, NormalizedRecord, DateObject } from "../types/types";


export function normalizeCollection(arr: RawRecord[]): NormalizedRecord[] {
  return arr.map((item: RawRecord) => ({
    title: item.title,
    creator: normalizeCreator(item.creator),
    object_id: item.object_id,
    date: normalizeDate(item.date),
  }));
}

export function normalizeDate(date: string | DateObject | number | null | undefined) {
  if (typeof date == "string") {
    return date;
  }
  if (typeof date == "number") {
    return String(date);
  }
  if (date == null) {
    return "date unknown";
  }
  if (typeof date == "object") {
    return date.display;
  }
}

function normalizeCreator(creator: string | string[] | null | undefined) {
  if (
    creator == null ||
    creator.length == 0 ||
    creator === "" ||
    creator === "unknown" ||
    creator === "Unknown"
  ) {
    return null;
  }
  if (Array.isArray(creator) && creator[0] == "Unknown") {
    return null;
  }
  if (typeof creator === "string") {
    return [creator];
  } else return creator;
}