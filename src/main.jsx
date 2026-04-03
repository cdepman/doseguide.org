import { createRoot } from "react-dom/client";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(<App />);

// Remove splash as soon as React mounts
const splash = document.getElementById("splash");
if (splash) {
  splash.classList.add("hidden");
  setTimeout(() => splash.remove(), 600);
}
