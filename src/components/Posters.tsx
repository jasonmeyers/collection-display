import { useState, useEffect } from "react";

const apiUrl = "https://api.artic.edu/api/v1/artworks";
const fields = "id,title,artist_display,date_display,main_reference_number";
const limits = "?page=1&limit=80";
// https://api.artic.edu/api/v1/artworks/129884
// const basicEntry = "/chicago.json";

interface RawEntry {
  id: string;
  title: string;
  artist_display: string | null;
  date_display: string | null;
  main_reference_number: string | null;
  description: string | null;
}

function Posters() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [rawResponse, setRawResponse] = useState<RawEntry[] | null>(null);

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
    getResponse(apiUrl);
  }, []);

  return (
    <>
      <div className="loading">{loading ? "Loading..." : error}</div>
      <div className="card-container response">
        {Array.isArray(rawResponse) &&
          rawResponse.map((entry: RawEntry) => (
            <a
              href={apiUrl + "?fields=" + fields + limits}
              key={entry.id}
              className="record-card"
            >
              <div>
                <h3>{entry.title}</h3>
                <p>{entry.artist_display}</p>
              </div>
            </a>
          ))}
      </div>
    </>
  );
}

export default Posters;
