import { useState } from "react";

import ChicagoInstitute from "./components/ChicagoInstitute";
import Eames from "./components/Eames";

function App() {
	const [view, setView] = useState(false);

	return (
		<>
			<button
				onClick={() => {
					setView(!view);
				}}
			>
				{!view ? "Click to View Chicago Museum" : "Click to View Eames"}
			</button>
			{view ? <ChicagoInstitute /> : <Eames />}
		</>
	);
}

export default App;
