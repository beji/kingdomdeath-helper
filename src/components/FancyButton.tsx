import styled from "styled-components";
import { darken } from "../util";

const MAGENTALACHS = "#A12D6A";

export default styled.button`
    background-color: ${MAGENTALACHS};
    color: #fff;
    border: 1px solid ${darken(MAGENTALACHS, 0.1)};
    border-radius: 4px;
    cursor: pointer;
    appearance: button;
    display: inline-block;
    font-size: 1rem;
    line-height: 1.5rem;
    vertical-align: middle;
    white-space: nowrap;
    &:hover{
        background-color: ${darken(MAGENTALACHS, 0.2)};
    }
`;
