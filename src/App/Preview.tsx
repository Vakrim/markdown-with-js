/// <reference path="./remarkable.d.ts" />

import React from 'react';
import Remarkable from 'remarkable';
import RemarkableReactRenderer from 'remarkable-react';
import { Code } from './Code';

export const VariablesContext = React.createContext<{ [name: string]: any }>(
  {}
);

const md = new Remarkable();
md.renderer = new RemarkableReactRenderer({
  components: {
    code: Code,
  },
});

export const Preview = ({
  code,
  variables,
}: {
  code: string;
  variables: { [name: string]: any };
}) => {
  return (
    <VariablesContext.Provider value={variables}>
      {md.render(code)}
    </VariablesContext.Provider>
  );
};
