import React from "react";
import styled from "styled-components";
import { colors } from "../theme";
import { colorMagentaLachs } from "./StyledComponents";

const Wrapper = styled.div`
    display: inline-block;
`;
const StyledCheckbox = styled.div`
    border:1px solid ${colors.text};
    cursor:pointer;
    display: inline-block;
    margin:0 .25vh;
    width:1rem;
    height:1rem;
    &.active {
        background: ${colorMagentaLachs};
    }
`;
const HighlightedCheckbox = StyledCheckbox.extend`
    border-width:3px;
`;

interface ICheckboxProps {
    highlight?: boolean;
    value: boolean;
    onChange: () => void;
}

class Checkbox extends React.Component<ICheckboxProps> {
    public render() {
        const { highlight, onChange, value } = this.props;
        return (
            <Wrapper>
                {!highlight && <StyledCheckbox onClick={onChange} className={value ? "active" : ""} />}
                {highlight && <HighlightedCheckbox onClick={onChange} className={value ? "active" : ""} />}
            </Wrapper>
        );
    }
}

export default Checkbox;
