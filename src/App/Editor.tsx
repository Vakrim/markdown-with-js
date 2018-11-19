import React from 'react';
import styled from 'styled-components';

export const Editor = React.memo(
  (props: {
    value: string;
    onChange: (value: string) => void;
    variables: object;
  }) => {
    return (
      <Wrapper>
        <Textarea
          value={props.value}
          onChange={e => props.onChange(e.target.value)}
        />
      </Wrapper>
    );
  }
);

const Textarea = styled.textarea`
  min-height: 300px;
`;

const Wrapper = styled.div`
  flex: 1 0 auto;
  display: flex;
`;
