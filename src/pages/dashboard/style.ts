import styled from "styled-components";

export const ContainerDash = styled.header`
    max-width: 90%;
    margin: 0 auto;

    @media (min-width: 768px){
        max-width: 1300px;
        margin: 0 auto;
        padding: 0 32px 0 32px
    }
`

export const HeaderDash = styled.header`
    display: flex;
    justify-content: space-between;
    height: 80px;
    align-items: center;
    border-bottom: 1px solid white;

    & button {
        width: 150px;
        height: 40px;
        background-color: var(--color-grey-4);
        color: var(--color-grey-7);
        font-size: 18px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    & h1 {
        color: var(--color-brand-2);
    }
`

export const MainDash = styled.main`
    color: var(--color-grey-7);
`

export const DivUserInfos = styled.div`
    margin: 100px 0 100px 0;
    display: flex;
    flex-direction: column;
    gap: 80px;

    & div{
        display: flex;
        gap: 32px;
    }

    & div button{
        width: 150px;
        height: 40px;
        background-color: var(--color-grey-4);
        color: var(--color-grey-7);
        font-size: 18px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }

    & div .delete{
        background-color: var(--color-brand-1);
    }


`