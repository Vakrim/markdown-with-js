import styled from 'styled-components';
import React from 'react';
import { Button } from './Button';

export type Variable = {
  id: number;
  name: string;
  value: string | number;
};

export const VariableEditor = React.memo(
  ({
    id,
    name,
    value,
    updateName,
    updateValue,
    removeVariable,
  }: {
    id: number;
    name: string;
    value: string | number;
    updateName: (id: number, name: string) => void;
    updateValue: (id: number, value: string) => void;
    removeVariable: (id: number) => void;
  }) => {
    return (
      <VariableEditorWrapper>
        <Input value={name} onChange={e => updateName(id, e.target.value)} />
        <Input value={value} onChange={e => updateValue(id, e.target.value)} />
        <RemoveButton onClick={() => removeVariable(id)}>Remove</RemoveButton>
      </VariableEditorWrapper>
    );
  }
);

const Input = styled.input`
  margin-right: 5px;
`;

const RemoveButton = styled(Button)`
  opacity: 0;
`;

const VariableEditorWrapper = styled.div`
  max-width: 300px;
  display: flex;
  margin: 5px 0;

  ${Input} {
    border-color: transparent;
  }

  :hover {
    ${Input} {
      transition: 0.3s border;
      border-color: #00ff9c;
    }

    ${RemoveButton} {
      transition: 0.3s opacity;
      opacity: 1;
    }
  }
`;
