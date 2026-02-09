import { useState } from "react";

const metAPI = "https://collectionapi.metmuseum.org/public/collection/v1/";
const BATCH_SIZE = 20; // Limit batch size based on APIs limit of 80 requests/second

interface CollectionItem {
  objectID: number;
  artistDisplayName: string;
  title: string;
  primaryImage?: string;
  primaryImageSmall?: string;
}

function Gallery() {
  const [searchInput, setSearchInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [collectionItems, setCollectionItems] = useState<
    CollectionItem[] | null
  >(null);

  async function apiSearch() {
    if (!searchInput.trim()) return;
    try {
      setIsLoading(true);
      const request = await fetch(
        `${metAPI}search?q=${searchInput}&hasImage=true`,
      );
      const data = await request.json();
      const ids = data.objectIDs?.slice(0, BATCH_SIZE) ?? [];
      await retrieveCollectionItems(ids);
    } catch (error) {
      throw new Error(`Object ID search via keyword failed: ${error}`);
    } finally {
      setIsLoading(false);
    }
  }

  async function retrieveCollectionItems(ids: number[]) {
    if (ids.length === 0) return;

    try {
      const fetchCollection = ids.map((item) =>
        fetch(`${metAPI}objects/${item}`).then((res) => res.json()),
      );
      const objects = await Promise.all(fetchCollection);
      const objectsWithImages = objects.filter((obj) => obj.primaryImageSmall);
      setCollectionItems(objectsWithImages);
    } catch (error) {
      throw new Error(`Object Collection retrieval failed: ${error}`);
    }
  }

  return (
    <>
      <div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <h2>Search the Met's Collection</h2>
          <div>
            (search by keywords, e.g. "Van Gogh, Bacon, Warhol, Pittsburgh ")
          </div>
          <div style={{ padding: "15px 0" }}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                apiSearch();
              }}
            >
              <input
                type="text"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                style={{
                  height: "2rem",
                  width: "30rem",
                  border: "2px solid black",
                  fontSize: "16px",
                }}
              />
              <button type="submit" style={{ backgroundColor: "#999" }}>
                Search by keyword
              </button>
            </form>
          </div>
        </div>

        {(isLoading && "Loading...") ||
          (collectionItems && (
            <div>
              <h3>a search for "{searchInput}", yielded these results:</h3>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "16px",
                }}
              >
                {collectionItems.map((item) => (
                  <div key={item.objectID} style={{ maxWidth: "200px" }}>
                    <img
                      src={item.primaryImageSmall || ""}
                      alt={item.title || "Title Unavailable"}
                      style={{ width: "100%", height: "auto" }}
                    />
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <strong>
                        {item.artistDisplayName || "Artist Unknown"}
                      </strong>
                      <div>
                        {item.title.length > 25
                          ? item.title.slice(0, 80) + "..."
                          : item.title || "Title Unavailable"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default Gallery;
