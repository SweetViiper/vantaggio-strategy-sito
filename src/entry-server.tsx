import { renderToString } from "react-dom/server";

import { pageFor, pages as all } from "./pages";

export const pages = all.map(({ path, title, description }) => ({ path, title, description }));

export function render(path: string): string {
  const Page = pageFor(path).element;
  return renderToString(<Page />);
}
