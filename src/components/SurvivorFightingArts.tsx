import { IFightingArt, IState, UUID } from "interfaces";
import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import FightingArtItem from "./FightingArtItem";
import FightingArtsList from "./FightingArtsList";
import { FancyButton } from "./StyledComponents";

interface IFightingArtsStateProps {
    fightingArts: ReadonlyArray<IFightingArt>;
}

interface IFightingArtsOwnProps {
    id: UUID;
}

interface IFightingArtsProps extends IFightingArtsStateProps, IFightingArtsOwnProps { }

interface IFightingArtsState {
    showFightingArtList: boolean;
}

const FightingArtItemsWrapper = styled.div`
    text-align: left;
`;

const FightingArtsWrapper = styled.div`
    flex: 1;
    flex-grow: 2;
    padding-left: 0.5vw;
    padding-right: 0.5vw;
`;

const mapStateToProps = (state: IState, ownProps: IFightingArtsOwnProps): IFightingArtsStateProps => {
    const survivor = state.settlement.survivors.find((s) => s.id === ownProps.id);
    const fightingArts = survivor && survivor.fightingArts ? survivor.fightingArts : [];
    return {
        fightingArts,
    };
};

class SurvivorFightingArts extends React.Component<IFightingArtsProps, IFightingArtsState> {
    public constructor(props: IFightingArtsProps) {
        super(props);

        this.showFightingArtList = this.showFightingArtList.bind(this);
        this.hideFightingArtList = this.hideFightingArtList.bind(this);

        this.state = {
            showFightingArtList: false,
        };
    }
    public render() {
        const { showFightingArtList } = this.state;
        const { fightingArts } = this.props;
        if (fightingArts.length > 0) {
            return (
                <FightingArtsWrapper>
                    <FightingArtItemsWrapper>
                        {fightingArts.map((art, idx) => <FightingArtItem key={idx} art={art} />)}
                    </FightingArtItemsWrapper>
                    <FancyButton onClick={this.showFightingArtList}>Manage Fighting Arts</FancyButton>
                    {showFightingArtList && <FightingArtsList id={this.props.id} onCancel={this.hideFightingArtList} />}
                </FightingArtsWrapper>
            );
        } else {
            return (
                <FightingArtsWrapper>
                    <FancyButton onClick={this.showFightingArtList}>Manage Fighting Arts</FancyButton>
                    {showFightingArtList && <FightingArtsList id={this.props.id} onCancel={this.hideFightingArtList} />}
                </FightingArtsWrapper>
            );
        }
    }

    private showFightingArtList() {
        this.setState({
            showFightingArtList: true,
        });
    }

    private hideFightingArtList() {
        this.setState({
            showFightingArtList: false,
        });
    }
}

export default connect(mapStateToProps)(SurvivorFightingArts);
