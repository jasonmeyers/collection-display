// Timeline ingests the time information from the object
// ... displays the timeline range of all objects in collection as a continuum
// ... plots earliest/latest, year on the continuum

import type { NormalizedRecord } from "../types/types";

function Timeline({ collectionData }: NormalizedRecord[]) {
  const dateRange = collectionData.map((data) => data.date);
  return (
    <>
      {dateRange.map((date) => {
        return <div>{JSON.stringify(date)}</div>;
      })}
    </>
  );
}

export default Timeline;
