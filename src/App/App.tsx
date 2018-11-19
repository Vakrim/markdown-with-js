import React, { Component, useState } from 'react';
import { Variable } from './VariableEditor';
import { Editor } from './Editor';
import styled from 'styled-components';
import { Preview } from './Preview';
import { VariablesEditor } from './VariablesEditor';
import { useList } from './useList';
import useLocalStorage from './useLocalStorage';

const createVariablesObject = (
  variables: Variable[]
): { [name: string]: any } => {
  const obj: { [name: string]: any } = {};
  variables.forEach(variable => {
    obj[variable.name] = variable.value;
  });
  return obj;
};

const initialCode = `\
# Simple math
## \`a\` + \`b\` = \`a + b\`

# Functions
## Half of \`b\` rounded down is \`floor(b / 2)\`

# Fancy errors
\`\`\`
c + 1
\`\`\`
`;

export default () => {
  const [
    variables,
    updateValue,
    updateName,
    addVariable,
    removeVariable,
  ] = useList('variables');
  const [code, updateCode] = useLocalStorage('code', initialCode);

  return (
    <App>
      <InputColumn>
        <h1>Markdown live</h1>
        <h2>Variables:</h2>
        <VariablesEditor
          variables={variables}
          updateValue={updateValue}
          updateName={updateName}
          addVariable={addVariable}
          removeVariable={removeVariable}
        />
        <h2>Document:</h2>

        <Editor
          value={code}
          onChange={updateCode}
          variables={createVariablesObject(variables)}
        />
      </InputColumn>
      <PreviewColumn>
        <Preview code={code} variables={createVariablesObject(variables)} />
      </PreviewColumn>
    </App>
  );
};

const App = styled.div`
  max-width: 1600px;
  margin: 0 auto;
  background: #100d23;
  padding: 10px;
  display: flex;
  min-height: 100vh;
  flex-wrap: wrap-flex;
`;

const InputColumn = styled.div`
  flex: 1 0 300px;
  padding: 10px;
  display: flex;
  flex-direction: column;
`;

const PreviewColumn = styled.div`
  flex: 1 0 300px;
  padding: 10px;
`;
