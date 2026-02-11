import { useState, useEffect } from "react";
import PlaceHolder from "./assets/react.svg";
import { normalizeCollection } from "./utilities/normalize";
import type { NormalizedRecord, RawRecord } from "./types/types";
import Posters from "./components/Posters";
const apiURL = "/dataset.json";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [rawCollectionData, setRawCollectionData] = useState<RawRecord[]>([]);
  const [normalizedCollectionData, setNormalizedCollectionData] = useState<
    NormalizedRecord[]
  >([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const response = await fetch(apiURL, {});
        const data = await response.json();
        setRawCollectionData(data.records);
        setNormalizedCollectionData(normalizeCollection(data.records));
      } catch {
        setError("Failed to load collection");
      } finally {
        setIsLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <>
      <Posters />
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
                  <img src={PlaceHolder} alt="" className="placeholder-image" />
                  <h2>
                    {title || "No Title"}
                    <span className="date">, {date && date}</span>
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
        <div className="dashboard">{rawCollectionData.length}</div>
      </div>
    </>
  );
}

export default App;
