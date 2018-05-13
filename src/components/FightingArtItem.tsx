import { IFightingArt } from "interfaces";
import React, { SyntheticEvent } from "react";
import styled from "styled-components";
import { LayerEvents, SimpleLayerEvent } from "../interfaces/layer";
import layerSubject from "../layerSubject";
import { colorMagentaLachs } from "./StyledComponents";

interface IFightingArtItemProps {
    art: IFightingArt;
}

const FightingArtDescription = styled.div`
    margin-bottom: 2rem;
`;

const FightingArtItemWrapper = styled.div`
    cursor: pointer;
    margin-top: 1vh;
    margin-bottom: 1vh;
    &:before{
        content: "►";
        color: ${colorMagentaLachs};
        margin-right: 0.25rem;
    }
`;
export default class FightingArtItem extends React.Component<IFightingArtItemProps> {
    public constructor(props: IFightingArtItemProps) {
        super(props);

        this.showDescription = this.showDescription.bind(this);
    }

    public render() {
        const { art } = this.props;
        return (
            <React.Fragment>
                <FightingArtItemWrapper onClick={this.showDescription}>{art.name}</FightingArtItemWrapper>
            </React.Fragment>
        );
    }
    private showDescription(e: SyntheticEvent<HTMLElement>) {
        const { art } = this.props;

        layerSubject.next({
            payload: {
                content: <FightingArtDescription>{art.description}</FightingArtDescription>,
                headline: <React.Fragment>{art.name}</React.Fragment>,
            },
            type: LayerEvents.show_simple,
        });
    }
}
