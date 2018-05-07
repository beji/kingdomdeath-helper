import { IWeaponArt } from "interfaces";
import React, { SyntheticEvent } from "react";
import styled from "styled-components";
import FancyButton from "./FancyButton";
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

const WeaponArtItemWrapper = styled.li`
    cursor: pointer;
    * {
        cursor: default;
    }
    button {
        cursor: pointer;
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
            <WeaponArtItemWrapper onClick={this.showDescription}>
                {art.name}
                {showDetails && this.renderDescription()}
            </WeaponArtItemWrapper>
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
