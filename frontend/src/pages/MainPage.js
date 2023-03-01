import React, { Component, Fragment, useEffect, useState, useRef } from 'react';
import dracula from 'prism-react-renderer/themes/dracula';
import CountUp, { useCountUp } from 'react-countup';
import { RotateCw } from 'react-feather';
import GithubCorner from 'react-github-corner';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import styled from 'styled-components';

const RefreshButton = styled.button`
  background: none;
  border: none;
  color: slategray;
  opacity: 0.5;
  outline: none;
  padding: 0;
  position: absolute;
  right: 16px;
  top: 16px;
  transition: 0.2s;
  width: 16px;

  &:hover {
    opacity: 1;
  }
`;

const Error = styled(LiveError)`
  background: palevioletred;
  color: white;
  grid-column: span 2;
  padding: 16px;
`;

class Example extends Component {
  refresh = () => this.forceUpdate();

  render() {
    const { children, code, title, ...rest } = this.props;

    return (
      <Fragment>
        <Fragment>
          <Subtitle>{title}</Subtitle>
          <Provider
            scope={{ CountUp, useCountUp, useState, useRef, useEffect }}
            code={code.trim()}
            theme={dracula}
            {...rest}
          >
            <LiveEditor />
            <RefreshButton onClick={this.refresh} title="Re-render">
              <RotateCw size={16} />
            </RefreshButton>
            <Preview />
            <Error />
          </Provider>
          {children}
        </Fragment>
      </Fragment>
    );
  }
}

const Footer = styled.footer`
  border-top: 2px solid whitesmoke;
  margin-top: 64px;
  padding-top: 16px;
`;

const Main = styled.main`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial,
    sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol';
  margin: 32px auto;
  max-width: 960px;
  background: black;
`;

const Preview = styled(LivePreview)`
  align-items: center;
  background: whitesmoke;
  display: flex;
  justify-content: center;
  min-height: 64px;
  padding: 16px;

  & div {
    align-items: center;
    display: flex;
    flex-direction: column;
  }

  & span {
    display: flex;
    justify-content: center;
  }

  & button {
    background: white;
    border: none;
    border-radius: 4px;
    box-shadow: 0 4px 8px gainsboro;
    display: block;
    font-family: inherit;
    font-size: inherit;
    margin: 16px 0 auto;
    outline: none;
    padding: 8px 32px;

    &:active {
      transform: translateY(2px);
    }

    &:hover {
      background: snow;
    }
  }
`;

const Provider = styled(LiveProvider)`
  border-radius: 8px;
  box-shadow: 0 4px 8px gainsboro;
  overflow: hidden;
  display: grid;
  grid-template-columns: repeat(2, 50%);
  position: relative;
`;

const Subtitle = styled.h2`
  margin-top: 2em;
`;

const Text = styled.p``;
const Title = styled.h1`
  color: white;
`;

const accessibility = `
() => {
  const [loading, setLoading] = React.useState(false);
  const onStart = () => {setLoading(true)};
  const onEnd = () => {setLoading(false)};
  const containerProps = {
    'aria-busy': loading
  };
  
  return <CountUp end={123457} duration="3" onStart={onStart} onEnd={onEnd} containerProps={containerProps} />
}
`;

const App = () => (
  <Main>
    <Example code={accessibility} title="Code" />
  </Main>
);

export default App;