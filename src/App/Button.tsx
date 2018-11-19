import styled from 'styled-components';

export const Button = styled.button`
  display: inline-block;
  background: #00ff9c;
  color: #100d23;
  border: 0;
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    transition: 0.3s background;
    background: #ff4081;
  }
`;
