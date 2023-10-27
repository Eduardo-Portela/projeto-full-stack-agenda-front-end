import styled from "styled-components";

export const ModalWrapper = styled.div`
  right: 0;
    width: 100%;
    height: 100vh;
    position: fixed;
    background-color:   rgba(55, 59, 62, 0.5);
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
`

export const ModalContent = styled.div`
  max-width: 90%;
  height: max-content;
  box-shadow: 0px 0px 5px 2px var(--color-grey-4);
`