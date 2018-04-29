import styled from "styled-components";
import { darken } from "../util";
import { colorMagentaLachs } from "./StyledComponents";

export default styled.button`
    background-color: ${colorMagentaLachs};
    color: #fff;
    border: 1px solid ${darken(colorMagentaLachs, 0.1)};
    border-radius: 4px;
    cursor: pointer;
    appearance: button;
    display: inline-block;
    font-size: 1rem;
    line-height: 1.5rem;
    vertical-align: middle;
    white-space: nowrap;
    &:hover{
        background-color: ${darken(colorMagentaLachs, 0.2)};
    }
`;
