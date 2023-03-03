import React, { Component, Fragment, useEffect, useState, useRef } from "react";
import { RecoilRoot, atom, useRecoilState } from "recoil";
import { mermaidData } from "../recoil/atoms.js";

import Mermaid from "./Mermaid";
import example from "./defaultMermaid";

const App = () => {
  const [data, setData] = useRecoilState(mermaidData);
  const [mermaidState, setMermaidState] = useState(example);
  const [content, setContent] = useState([]);

  useEffect(() => {
    let out = `${data["mermaid"]}`;
    out = out.slice(0, out.length - 1);
    setMermaidState(out);
    console.log(out);
    content.push(<Mermaid key={content.length} chart={out} />);
  }, [data, content]);

  return <>{content.length > 0 ? content[content.length - 1] : <></>}</>;
};

export default App;
