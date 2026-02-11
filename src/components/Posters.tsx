import { useState, useEffect } from "react";
import Dialog from "./Dialog";
import type { RawEntry } from "../types/types";

const apiUrl = "https://api.artic.edu/api/v1/artworks";
const fields = "id,title,artist_display,date_display,main_reference_number";
const limits = "?page=1&limit=80";

function Posters() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [rawResponse, setRawResponse] = useState<RawEntry[] | null>(null);
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);

  useEffect(() => {
    async function getResponse(url: string): Promise<unknown> {
      try {
        setLoading(true);
        const response = await fetch(url);
        if (!response.ok) {
          setError(`${response.status}: ${response.statusText}`);
          return;
        }
        const data = await response.json();
        const items = Array.isArray(data.data) ? data.data : [data.data];
        setRawResponse(items);
      } catch (error) {
        setError(error instanceof Error ? error.message : String(error));
      } finally {
        setLoading(false);
      }
    }
    getResponse(`${apiUrl}?${fields}${limits}`);
  }, []);

  return (
    <>
      <div className="loading">{loading ? "Loading..." : error}</div>
      <div className="card-container response">
        {Array.isArray(rawResponse) &&
          rawResponse.map((entry: RawEntry) => (
            <a
              href={`${apiUrl}/${entry.id}`}
              key={entry.id}
              className="record-card"
              onClick={(e) => {
                e.preventDefault();
                setSelectedUrl(`${apiUrl}/${entry.id}`);
              }}
            >
              <div>
                <h3>{entry.title}</h3>
                <p>{entry.artist_display}</p>
              </div>
            </a>
          ))}
      </div>
      <Dialog objectUrl={selectedUrl} onClose={() => setSelectedUrl(null)} />
    </>
  );
}

export default Posters;
