import { atom } from "recoil";
import defaultMermaid from "../pages/defaultMermaid";

export const mermaidData = atom({
  key: "mermaid_data",
  default: defaultMermaid,
});

export const fileData = atom({
  key: "file_data",
  default: {"path/filename": "filestr"},
});

export const idea = atom({
    key: 'idea',
    default: ""
});