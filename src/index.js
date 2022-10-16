import { createRoot } from "react-dom/client";

import ApolloProvider from "./providers/ApolloProvider";

const container = document.getElementById("app");
const root = createRoot(container);

root.render(ApolloProvider);
