import { useState, useEffect } from "react";

const apiURL = "/dataset.json";

interface RawRecord {
  title: string | null;
  creator: string | string[] | null;
  object_id: string;
}

interface NormalizedRecord {
  title: string | null;
  creator: string[];
  object_id: string;
}

function normalizeCollection(arr: RawRecord[]): NormalizedRecord[] {
  return arr.map((item: RawRecord) => {
    return {
      title: item.title,
      creator: normalizeCreator(item.creator),
      object_id: item.object_id,
    };
  });
}

function normalizeCreator(creator: string | string[] | null): string[] {
  if (!creator) {
    return ["Unknown"];
  } else if (typeof creator === "string") {
    return [creator];
  }
  return creator;
}

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [normalizedCollectionData, setNormalizedCollectionData] = useState<
    NormalizedRecord[]
  >([]);

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const response = await fetch(apiURL, {});
        const data = await response.json();
        setNormalizedCollectionData(normalizeCollection(data.records));
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <>
      {isLoading
        ? "Loading..."
        : normalizedCollectionData.map(({ title, creator, object_id }) => (
            <div className="record-card" key={object_id}>
              <h2>{title || "***Title Not Provided***"}</h2>
              <div>object id: {object_id}</div>

              <div>
                Created By:
                {creator.map((item) => (
                  <div>{item}</div>
                ))}
              </div>
            </div>
          ))}
    </>
  );
}

export default App;
