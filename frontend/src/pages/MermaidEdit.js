import React, { useState } from "react";
import { useRecoilState } from "recoil";
import { mermaidData } from "../recoil/atoms.js";
import Preview from "./MermaidPreview.js";

const App = () => {
  const [data, setData] = useRecoilState(mermaidData);
  const [content, setContent] = useState([]);

  // useEffect(() => {
  //   // push new mermaid chart to content
  //   content.push(<Mermaid chart={data["mermaid"]} />);
  //   // setContent([...content, <Mermaid chart={data["mermaid"]} />]);
  // }, [data]);

  // useEffect(() => {
  //   if (content.length > 2) {
  //     console.log("mermaid content: ", content.length);
  //     console.log("mermaid init");
  //     initializeMermaid();
  //   }
  // }, [content]);

  return (
    <>
      {/* {content.length > 0 ? (
        content[content.length - 1]
      ) : ( */}
      {/* <Mermaid chart={data} /> */}
      <Preview code={data} />
      {/* )} */}
    </>
  );
};

export default App;
