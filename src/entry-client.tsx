import { createRoot, hydrateRoot } from "react-dom/client";

import { pageFor } from "./pages";

const root = document.getElementById("root");
if (root) {
  const Page = pageFor(window.location.pathname).element;
  if (root.firstElementChild) {
    hydrateRoot(root, <Page />);
  } else {
    createRoot(root).render(<Page />);
  }
}
