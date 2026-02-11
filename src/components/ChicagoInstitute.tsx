import { useState, useEffect } from "react";
import Dialog from "./Dialog";
import type { RawEntry } from "../types/types";

const apiUrl = "https://api.artic.edu/api/v1/artworks";
const fields =
	"id,title,artist_display,thumbnail,date_display,main_reference_number,image_id,";
const limits = "?page=1&limit=80";

function ChicagoInstitute() {
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);
	const [rawResponse, setRawResponse] = useState<RawEntry[] | null>(null);
	const [selectedUrl, setSelectedUrl] = useState<string | null>(null);
	const [iiifUrl, setIiifUrl] = useState("");

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
				const items = Array.isArray(data.data)
					? data.data
					: [data.data];
				setIiifUrl(data.config.iiif_url);
				setRawResponse(items);
			} catch (error) {
				setError(
					error instanceof Error ? error.message : String(error),
				);
			} finally {
				setLoading(false);
			}
		}
		getResponse(`${apiUrl}?${fields}${limits}`);
	}, []);

	return (
		<main>
			<h2>Chicago Institute</h2>
			<div className="loading">{loading ? "Loading..." : error}</div>
			<div className="grid-container">
				{Array.isArray(rawResponse) &&
					rawResponse.map((entry: RawEntry) => (
						<div
							key={entry.id}
							className="grid-card"
							onClick={(e) => {
								e.preventDefault();
								setSelectedUrl(`${apiUrl}/${entry.id}`);
							}}
						>
							<div>
								<img
									src={
										entry.image_id
											? `${iiifUrl}/${entry.image_id}/full/200,/0/default.jpg`
											: entry.thumbnail?.lqip
									}
									alt={entry.title}
								/>
								<h3>{entry.title}</h3>
								<p>{entry.artist_display}</p>
							</div>
						</div>
					))}
			</div>
			<Dialog
				objectUrl={selectedUrl}
				onClose={() => setSelectedUrl(null)}
			/>
		</main>
	);
}

export default ChicagoInstitute;
