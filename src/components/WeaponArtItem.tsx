import { IWeaponArt } from "interfaces";
import React, { SyntheticEvent } from "react";
import styled from "styled-components";
import FancyButton from "./FancyButton";
import { colorMagentaLachs } from "./StyledComponents";
import { StatLayer, StatLayerHeadline } from "./SurvivorStatElements";

interface IWeaponArtItemProps {
    art: IWeaponArt;
}

interface IWeaponArtItemState {
    showDetails: boolean;
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
export default class WeaponArtItem extends React.Component<IWeaponArtItemProps, IWeaponArtItemState> {
    public constructor(props: IWeaponArtItemProps) {
        super(props);
        this.state = {
            showDetails: false,
        };

        this.renderDescription = this.renderDescription.bind(this);
        this.showDescription = this.showDescription.bind(this);
        this.hideDescription = this.hideDescription.bind(this);
    }

    public render() {
        const { art } = this.props;
        const { showDetails } = this.state;
        return (
            <React.Fragment>
                <WeaponArtItemWrapper onClick={this.showDescription}>{art.name}</WeaponArtItemWrapper>
                {showDetails && this.renderDescription()}
            </React.Fragment>
        );
    }
    private showDescription(e: SyntheticEvent<HTMLElement>) {
        this.setState({
            showDetails: true,
        });
    }

    private hideDescription(e: SyntheticEvent<HTMLElement>) {
        e.stopPropagation();
        this.setState({
            showDetails: false,
        });
    }

    private renderDescription() {
        const { art } = this.props;
        return (
            <StatLayer>
                <StatLayerHeadline>{art.name}</StatLayerHeadline>
                <WeaponArtDescription>{art.description}</WeaponArtDescription>
                <FancyButton onClick={this.hideDescription}>Close</FancyButton>
            </StatLayer>
        );
    }

}
