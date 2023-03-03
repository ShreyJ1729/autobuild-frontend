import React, { Component, Fragment, useEffect, useState, useRef } from 'react';
import dracula from 'prism-react-renderer/themes/dracula';
import CountUp, { useCountUp } from 'react-countup';
import { RotateCw } from 'react-feather';
import GithubCorner from 'react-github-corner';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import styled from 'styled-components';

import {
    RecoilRoot,
    atom,
    useRecoilState,
  } from "recoil";
import { mermaiddata } from '../recoil/atom/mermaiddata';

import Mermaid from './Mermaid';
import example from './example';

const App = () => {

    const [data, setData] = useRecoilState(mermaiddata);
    let out = ``;

    useEffect(() => {
        out = `${data['mermaid']}`;
        out = out.slice(0, out.length - 1);
        console.log(out);
    }, [data])

    return(
        <>
        <Mermaid chart={example}/>
        </>


//   <Main>
//     <Example code={data} title="Code" />
//   </Main>
    );
}

export default App;