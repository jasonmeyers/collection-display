
# collection-display

Create a simple App/Script/Component to consume, clean and display data from a RESTful API or APIs

## Installation

To install: ```yarn install```

To run: ```yarn dev```

(You could really use npm, bun, etc)

Project will run by default at http://localhost:5173/

Decisions:

1. Basic Vite React with TypeScript and ESLint. I left out a Router and Query library to keep things as straightforward as possible.
2. Less fragile async: data lives in the '/public' folder, stubbed out as an mock API. 
3. Originally, I kept the types and functions in the same 'App.tsx' for simplicity's sake. As my App page became ungainly and scrolly, I separated concerns. Future-proofing and readability?
4. In the rendered page, I chose to hide values that came back undefined or nullish, including "unknown(s)" strings in dates and creators. This was a UX call.
5. CSS is minimal, and enough to make the page viewable without wincing.

What I would build/do next:

1. Get clarity from stakeholders about display, intent, UX decisions.
2. GET images
3. Add filtering... .sort() anyone?
4. Accessibility and Aria.
5. Internationalization and language support.