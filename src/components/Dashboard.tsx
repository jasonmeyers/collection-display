import type { RawRecord } from "../types/types";
import { logInterface, keyValueTypes } from "../utilities/helpers";
// import type { NormalizedRecord, RawRecord } from "../types/types";

function Dashboard({ data }: Array[]) {
  logInterface(keyValueTypes(data), "RawCollectionItem");
  return (
    <div>dashboard: There are {data.length} items in this collection </div>
  );
}

export default Dashboard;
