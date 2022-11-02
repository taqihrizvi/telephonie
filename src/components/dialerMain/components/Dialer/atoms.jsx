import styled, { css } from "styled-components";

export const Box = styled.div`
  position: fixed;
  bottom: 70px;
  right: 15px;
  width: 100%;
  max-width: 200px;
  padding: 15px;
  background: #263238;
  border-radius: 22.5px;
  visibility: hidden;
  opacity: 0;
  transform: translateY(30px);
  box-shadow: 0 5px 10px -5px rgba(0, 0, 0, 0.2);
  transition: opacity 0.15s ease-in, transform 0.25s ease-in,
    border-radius 0.3s ease-in-out, visibility 0s linear 0.3s;
  z-index: 10;

  ${props =>
        props.opened &&
        css`
      visibility: visible;
      opacity: 1;
      transform: translateY(0);
      transition: opacity 0.15s ease-out, transform 0.25s ease-out,
        border-radius 0.3s ease-in-out, visibility 0s;
      border-bottom-right-radius: 0;
    `}
`;

export const Input = styled.input`
  width: 100%;
  margin-bottom: 5px;
  border: none;
  background: #37474f;
  height: 35px;
  padding: 0 15px;
  border-radius: 4px;
  color: #cfd8dc;
`;

export const ButtonsContainer = styled.div`
  font-size: 0;
`;

export const Button = styled.button`
  display: inline-block;
  width: calc(33.33% - 10px);
  font-size: 14px;
  background: transparent;
  border: none;
  color: #cfd8dc;
  padding: 10px 0;
  text-align: center;
  cursor: pointer;

  &:hover {
    color: #fff;
  }

  &:nth-child(3n - 1) {
    margin: 0 15px;
  }
`;

export const CallButton = styled.button`
  margin-top: 5px;
  background: #8bc34a;
  color: #fff;
  width: 100%;
  height: 40px;
  border-radius: 20px;
  text-align: center;
  border: none;
  cursor: pointer;

  &:hover {
    background: #7cb342;
  }
`;
