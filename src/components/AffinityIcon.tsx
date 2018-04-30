import React from "react";
import styledLegacy from "styled-components";
import styled from "styled-components-ts"; // use styled here for code highlighting to work correct
import { Affinity, AffinityTypes } from "../interfaces";

interface IAffinityIconProps {
    affinity: Affinity;
    direction?: string;
    type?: AffinityTypes;
}

const PuzzleIcon = styled<IAffinityIconProps>(styledLegacy.div) `
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

const CompleteIcon = styled<IAffinityIconProps>(styledLegacy.div) `
    background:${(props) => props.affinity};
    display:inline-block;
    height:1em;
    margin:0 .25em;
    position:relative;
    width:1em;
    &:after {
        box-sizing: border-box;
        background:transparent;
        border:1px solid #ddd;
        content: "";
        height:.75em;
        left:.125em;
        position:absolute;
        top:.125em;
        width:.75em;
    }
`;

const HalfIcon = CompleteIcon.extend`
    ${(props) => props.direction === "right" || props.direction === "left" ? "height" : "width"}: 1.5em;
    ${(props) => props.direction === "right" || props.direction === "left" ? "width" : "height"}: .75em;
    ${(props) => props.direction}: 0;
    position:absolute;
    &:after {
        border-${(props) => props.direction}: none;
        ${(props) => props.direction === "right" || props.direction === "left" ? "height" : "width"}: 1.25em;
        ${(props) => props.direction === "right" || props.direction === "left" ? "width" : "height"}: .5em;
    }
    ${(props) => {
        if (props.direction === "right" || props.direction === "left") {
            return "top: 50%; transform: translateY(-50%); margin:0 .125rem";
        } else {
            return "left: 50%; transform: translateX(-50%); margin:.125rem 0";
        }
    }}
`;

export default class AffinityIcon extends React.Component<IAffinityIconProps> {
    public render() {
        const { affinity, type } = this.props;
        switch (type) {
            case AffinityTypes.connect: {
                return (<PuzzleIcon affinity={affinity} title="Affinity on this card" />);
            }
            case AffinityTypes.grid: {
                return (<CompleteIcon affinity={affinity} title="Affinity on grid" />);
            }
            case AffinityTypes.card: {
                return (<HalfIcon affinity={affinity} direction={this.props.direction} />);
            }
            default: {
                return "";
            }
        }
    }
}
