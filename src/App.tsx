import { useState, useEffect } from "react";

const apiURL = "/dataset.json";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [collectionData, setCollectionData] = useState([]);

  useEffect(() => {
    async function loadData() {
      try {
        setIsLoading(true);
        const response = await fetch(apiURL, {});
        const data = await response.json();
        setCollectionData(data.records);
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
      <div>{isLoading ? "Loading..." : collectionData.length}</div>
    </>
  );
}

export default App;
