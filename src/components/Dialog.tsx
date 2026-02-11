// 100% Claude Dialog, stubbed out for expedience

import { useState, useEffect, useRef } from "react";
import type { ArtworkDetail } from "../types/types";

const IIIF_BASE = "https://www.artic.edu/iiif/2";

interface DialogProps {
  objectUrl: string | null;
  onClose: () => void;
}

function Dialog({ objectUrl, onClose }: DialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [artwork, setArtwork] = useState<ArtworkDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!objectUrl) {
      dialogRef.current?.close();
      return;
    }

    dialogRef.current?.showModal();
    const controller = new AbortController();

    async function fetchArtwork() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          `${objectUrl}?fields=title,artist_display,image_id,thumbnail`,
          { signal: controller.signal },
        );
        if (!response.ok) {
          setError(`${response.status}: ${response.statusText}`);
          return;
        }
        const json = await response.json();
        setArtwork(json.data);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    }

    fetchArtwork();
    return () => controller.abort();
  }, [objectUrl]);

  const imageUrl =
    artwork?.image_id &&
    `${IIIF_BASE}/${artwork.image_id}/full/843,/0/default.jpg`;

  return (
    <dialog ref={dialogRef} onClose={onClose}>
      <button onClick={onClose}>Close</button>
      {loading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {artwork && (
        <article onClick={onClose}>
          <h2>{artwork.title}</h2>
          {artwork.artist_display && <p>{artwork.artist_display}</p>}
          {imageUrl && (
            <img
              src={imageUrl}
              alt={artwork.thumbnail?.alt_text || artwork.title}
            />
          )}
        </article>
      )}
    </dialog>
  );
}

export default Dialog;
