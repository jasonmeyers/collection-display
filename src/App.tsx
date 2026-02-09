import { useState, useEffect } from "react";
import { normalizeCollection } from "./utilities/normalize";

import type { NormalizedRecord, RawRecord } from "./types/types";
import DropDown from "./components/DropDown";
import Dashboard from "./components/Dashboard";

const apiURL = "/dataset.json";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [rawCollectionData, setRawCollectionData] = useState<RawRecord[]>([]);
  const [normalizedCollectionData, setNormalizedCollectionData] = useState<
    NormalizedRecord[]
  >([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const response = await fetch(apiURL, {});
        const data = await response.json();
        setRawCollectionData(data.records);
        setNormalizedCollectionData(normalizeCollection(data.records));
      } catch (e) {
        console.error(e);
        setError("Failed to load collection");
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, [error]);

  const uniqueMaterials = (data, category: string) =>
    new Set(
      data.flatMap((item: []) => {
        if (!item[category]) {
          return []; //??
        }
        return item[category];
      }),
    );

  return (
    <>
      <div className="filters">
        <DropDown
          label="materials"
          options={[...uniqueMaterials(rawCollectionData, "materials")]}
          value={selectedMaterial}
          onChange={setSelectedMaterial}
        />

        <Dashboard data={rawCollectionData} />
      </div>
      <div className="card-container">
        {!error || error}
        {isLoading
          ? "Loading..."
          : normalizedCollectionData.map(
              ({ title, creator, object_id, date }) => (
                <a
                  href={`path-to-item/${object_id}`}
                  onClick={(e) => {
                    e.preventDefault();
                  }}
                  className="record-card"
                  key={object_id}
                >
                  <h2>
                    {title || "No Title"}
                    <span className="date"> {date && date}</span>
                  </h2>
                  {creator && (
                    <>
                      Created by:{" "}
                      <ul>
                        {creator.map((item: string, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </a>
              ),
            )}
      </div>
    </>
  );
}

export default App;
