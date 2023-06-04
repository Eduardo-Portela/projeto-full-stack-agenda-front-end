import styled from "styled-components";

export const FormEdit = styled.form`
    border: 1px solid white;
    z-index: 1;
    background-color: var(--color-grey-1);

    & h2 {
        color: var(--color-brand-2);
    }

    & p {
        color: var(--color-grey-7);
    }

    .confirm{
        background-color: var(--color-brand-2);
    }

  & button {
    cursor: pointer;
  }
`