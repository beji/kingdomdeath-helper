import { IWeaponArt } from "interfaces";
import React, { SyntheticEvent } from "react";
import styled from "styled-components";
import { LayerTypes, SimpleLayerEvent } from "../interfaces/layer";
import layerSubject from "../layerSubject";
import FancyButton from "./FancyButton";
import { colorMagentaLachs } from "./StyledComponents";
import { StatLayer, StatLayerHeadline } from "./SurvivorStatElements";

interface IWeaponArtItemProps {
    art: IWeaponArt;
}

const WeaponArtDescription = styled.div`
    margin-bottom: 2rem;
`;

const WeaponArtItemWrapper = styled.div`
    cursor: pointer;
    margin-top: 1vh;
    margin-bottom: 1vh;
    &:before{
        content: "►";
        color: ${colorMagentaLachs};
        margin-right: 0.25rem;
    }
`;
export default class WeaponArtItem extends React.Component<IWeaponArtItemProps> {
    public constructor(props: IWeaponArtItemProps) {
        super(props);

        this.showDescription = this.showDescription.bind(this);
    }

    public render() {
        const { art } = this.props;
        return (
            <React.Fragment>
                <WeaponArtItemWrapper onClick={this.showDescription}>{art.name}</WeaponArtItemWrapper>
            </React.Fragment>
        );
    }
    private showDescription(e: SyntheticEvent<HTMLElement>) {
        const { art } = this.props;

        layerSubject.next({
            payload: {
                content: <WeaponArtDescription>{art.description}</WeaponArtDescription>,
                headline: <React.Fragment>art.name</React.Fragment>,
            },
            type: LayerTypes.simple,
        } as SimpleLayerEvent);
    }
}
