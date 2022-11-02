import styled, { css } from "styled-components";

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  bottom: 15px;
  right: 15px;
  width: 45px;
  height: 45px;
  background: #0275d8;
  border: none;
  color: #fff;
  border-radius: 22.5px;
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease-in-out;
  cursor: pointer;
  z-index: 11;

  &:hover {
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.4);
  }

  ${props =>
        props.opened &&
        css`
      border-top-right-radius: 0;
    `}
`;
