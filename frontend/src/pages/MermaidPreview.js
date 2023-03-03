import React, { useRef, useEffect } from "react";
import mermaid from "mermaid";

const Preview = ({ code }) => {
  const containerRef = useRef(null);

  const initMermaid = () => {
    try {
      mermaid.parse(code);
      let _code = code.replace(/</g, "&lt;").replace(/>/g, "&gt;");
      containerRef.current.innerHTML = _code;
      mermaid.init(undefined, containerRef.current);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    containerRef.current.removeAttribute("data-processed");
    containerRef.current.innerHTML = code.replace(
      "onerror=",
      "onerror&equals;"
    );
    initMermaid();
  }, [code]);

  return <div ref={containerRef}>{code}</div>;
};

export default Preview;
