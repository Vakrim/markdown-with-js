import React, { useContext, ReactNode } from 'react';
import { interprete } from './interpretor';
import { VariablesContext } from './Preview';
import styled, { keyframes } from 'styled-components';

export const Code = (props: { children: string }) => {
  const variables = useContext(VariablesContext);

  const interpretation = safeInterprete(props.children, variables);

  if (interpretation.status === 'ERROR') {
    return <Error>{interpretation.error}</Error>;
  }

  return <span>{interpretation.result}</span>;
};

const Error = (props: { children: string }) => {
  return (
    <ErrorWrappeer>
      <span className="glitch" data-text={props.children}>
        {props.children}
      </span>
    </ErrorWrappeer>
  );
};

const randomInt = (max: number) => Math.floor(Math.random() * max);

const generateKeyframes = () => keyframes`
  ${new Array(21).fill(null).map((n, i) => {
    return `
      ${i * 5}% {
        clip: rect(${randomInt(35)}px, 9999px, ${randomInt(35)}px, 0);
      }
    `;
  })}
`;

const keyframesAfter = generateKeyframes();
const keyframesBefore = generateKeyframes();

const ErrorWrappeer = styled.span`
  color: #ff4081;
  border-radius: 4px;
  border: 1px solid #ff4081;
  padding: 3px;
  margin: -3px;
  display: inline-block;

  .glitch {
    color: #ff4081;
    position: relative;
  }
  .glitch:after {
    content: attr(data-text);
    position: absolute;
    left: 2px;
    text-shadow: -2px 0 red;
    top: 0;
    width: 100%;
    height: 100%;
    color: ff4081;
    background: black;
    overflow: hidden;
    clip: rect(0, 900px, 0, 0);
    animation: ${keyframesAfter} 2s infinite linear alternate-reverse;
  }

  .glitch:before {
    content: attr(data-text);
    position: absolute;
    left: -2px;
    text-shadow: 2px 0 blue;
    top: 0;
    width: 100%;
    height: 100%;
    color: ff4081;
    background: black;
    overflow: hidden;
    clip: rect(0, 900px, 0, 0);
    animation: ${keyframesBefore} 3s infinite linear alternate-reverse;
  }
`;

type ResultOrError =
  | { status: 'OK'; result: string }
  | { status: 'ERROR'; error: string };

function safeInterprete(
  code: string,
  variables: {
    [name: string]: any;
  }
): ResultOrError {
  try {
    return { status: 'OK', result: `${interprete(code, variables)}` };
  } catch (e) {
    return { status: 'ERROR', error: e.message };
  }
}
