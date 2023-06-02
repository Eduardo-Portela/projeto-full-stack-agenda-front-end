import styled from "styled-components";

export const MainLogin = styled.main`
    display: flex;
    flex-direction: column;
    height: 100vh;

    @media (min-width: 768px) {
        flex-direction: row;
    }
`

export const DivIntro = styled.div`
    background-color: var(--color-brand-1);
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 16px;
    text-align: center;
    gap: 32px;

    & h2, h1 {
        color: var(--color-grey-7);
    }

    
    @media (min-width: 768px) {
        width: 50%;
    }
`

export const DivFormLogin = styled.div`
    background-color: var(--color-grey-2);
    height: 100vh;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

    & div{
        display: flex;
        justify-content: center;
        align-items: center; 
        flex-direction: column;
        width: 90%;
    }

    & div h2{
        margin-bottom: 16px;
        color: var(--color-grey-7);
    }

    & form{
        display: flex;
        justify-content: center;
        flex-direction: column;
        border: 1px solid var(--color-brand-1);
        padding: 32px;
        width: 90%;
        max-width: 500px;
    }

    & form button {
        margin-top: 16px;
        height: 40px;
        border: none;
        background-color: var(--color-brand-1);
        border-radius: 8px;
        font-size: 18px;
        color: var(--color-grey-7);
    }

    & form label{
        margin-top: 16px;
        font-size: 18px;
        font-weight: 700;
        color: var(--color-grey-7);
    }

    & form input{
        height: 40px;
        border-radius: 8px;
        border: none;
        margin-top: 6px;
        padding-left: 16px;
        font-size: 18px;
    }
    & form p{
        margin-top: 16px;
        color: var(--color-grey-7);
    }

    & form p a{
        text-decoration: none;
        color: var(--color-brand-2)
    }
    & form button a{
        text-decoration: none;
        color: var(--color-grey-7)
    }
    
    @media (min-width: 768px) {
        width: 50%;
    }
`