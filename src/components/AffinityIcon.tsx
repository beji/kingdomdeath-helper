import React from "react";
import styled from "styled-components";
import { Affinity } from "../interfaces/gear";

interface IAffinityIconProps {
    affinity: Affinity;
    className?: string;
}

class AffinityIcon extends React.Component<IAffinityIconProps> {
    public render() {
        return (
            <div className={this.props.className} title="Affinity on this card" />
        );
    }
}

const StyledAffinityIcon = styled(AffinityIcon)`
    background:${(props) => props.affinity};
    border-radius:2px;
    display:inline-block;
    height:1em;
    margin:0 .25rem 0 .5em;
    position:relative;
    width:1em;
    &:before {
        background:inherit;
        border-radius:50%;
        content:"";
        height:30%;
        position:absolute;
        right:95%;
        top:50%;
        transform:translateY(-50%);
        width:30%;
    }
    &:after {
        background:#fff;
        border-radius:50%;
        bottom:-5%;
        content:"";
        height:30%;
        left:50%;
        position:absolute;
        transform:translateX(-50%);
        width:30%;
    }
`;

export default StyledAffinityIcon;
