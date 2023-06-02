import {createGlobalStyle} from "styled-components"

export default createGlobalStyle`
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

:root {
    --color-brand-1: #C2255C;
    --color-brand-2: #D6336C;
    --color-grey-1: #191C1F;
    --color-grey-2: #212529;
    --color-grey-3: #33363A;
    --color-grey-4: #373B3E;
    --color-grey-6: #A6A8A9;
    --color-grey-7: #FFFFFF;
    --color-alert: #C22554;
}

body{
    background-color: var(--color-grey-1);
}

`

