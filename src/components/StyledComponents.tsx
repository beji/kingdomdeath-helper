import styled, { css } from "styled-components";
import { darken } from "../util";

const colorMagentaLachs = "#A12D6A";

export { colorMagentaLachs };

export const media = {
    mobile: (...args: any[]) => css`
        @media (max-width: 420px) {
          ${ css.call(undefined, ...args)}
        }
    `,
};

export const CloseIcon = styled.div`
    background:#ccc;
    border:1px solid #444;
    border-radius:50%;
    cursor:pointer;
    font-family: Arial, Helvetica, sans-serif;
    font-size:1rem;
    height:2rem;
    line-height:2rem;
    position:absolute;
    right:-1rem;
    text-align:center;
    top:-1rem;
    width:2rem;
    &:hover {
        background:${colorMagentaLachs}
    }
`;

export const SimpleLayer = styled.div`
    background:#fff;
    border:1px solid #ddd;
    border-radius: .5rem;
    box-shadow:3px 3px 10px;
    display:flex;
    justify-content: space-between;
    flex-wrap:wrap;
    left:50%;
    padding:.5rem;
    position:fixed;
    top:50%;
    transform:translate3d(-50%, -50%, 0);
    width:30vw;
    z-index:10;
    @media only screen
      and (min-device-width: 375px)
      and (max-device-width: 667px) {
            width: 90%;
    }
`;

export const SimpleLayerHeadline = styled.div`
    font-weight:bold;
    padding:.5rem;
    text-align:center;
    width:100%;
`;

export const FancyButton = styled.button`
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
