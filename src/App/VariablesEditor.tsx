import React from 'react';
import { VariableEditor, Variable } from './VariableEditor';
import { Button } from './Button';

export const VariablesEditor = ({
  variables,
  updateValue,
  updateName,
  addVariable,
  removeVariable,
}: {
  variables: Variable[];
  updateValue: (id: number, value: string) => void;
  updateName: (id: number, name: string) => void;
  addVariable: () => void;
  removeVariable: (id: number) => void;
}) => {
  return (
    <div>
      {variables.map((variable: Variable) => (
        <VariableEditor
          id={variable.id}
          key={variable.id}
          value={variable.value}
          updateValue={updateValue}
          name={variable.name}
          updateName={updateName}
          removeVariable={removeVariable}
        />
      ))}
      <Button onClick={addVariable}>Add variable</Button>
    </div>
  );
};
