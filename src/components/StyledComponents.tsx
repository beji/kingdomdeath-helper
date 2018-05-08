import { css } from "styled-components";

const colorMagentaLachs = "#A12D6A";

export { colorMagentaLachs };

export const media = {
    mobile: (...args: any[]) => css`
        @media (max-width: 420px) {
          ${ css.call(undefined, ...args)}
        }
    `,
};
