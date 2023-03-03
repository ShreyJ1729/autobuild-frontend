import { atom } from "recoil";
import defaultMermaid from "../pages/defaultMermaid";

export const mermaidData = atom({
  key: "mermaid_data",
  default: defaultMermaid,
});
