import { ID, IDisorder, IState } from "interfaces";
import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import DisorderItem from "./DisorderItem";
import DisordersList from "./DisordersList";
import { FancyButton } from "./StyledComponents";

interface ISurvivorDisordersOwnProps {
    id: ID;
}

interface ISurvivorDisordersStateProps {
    disorders: ReadonlyArray<IDisorder>;
}

interface ISurvivorDisordersProps extends ISurvivorDisordersOwnProps, ISurvivorDisordersStateProps { }

interface ISurvivorDisordersState {
    showList: boolean;
}

const DisordersWrapper = styled.div`
    flex: 1;
    flex-grow: 2;
    padding-left: 0.5vw;
    padding-right: 0.5vw;
`;

const ItemWrapper = styled.div`
    text-align: left;
`;

const mapStateToProps = (state: IState, ownProps: ISurvivorDisordersOwnProps): ISurvivorDisordersStateProps => {
    const survivor = state.settlement.survivors.find((s) => s.id === ownProps.id);
    const disorders = survivor && survivor.disorders ? survivor.disorders : [];
    return {
        disorders,
    };
};

class SurvivorDisorders extends React.Component<ISurvivorDisordersProps, ISurvivorDisordersState> {
    public constructor(props: ISurvivorDisordersProps) {
        super(props);

        this.showList = this.showList.bind(this);
        this.hideList = this.hideList.bind(this);

        this.state = {
            showList: false,
        };
    }
    public render() {
        const { id, disorders } = this.props;
        const { showList } = this.state;
        if (disorders.length > 0) {
            return (
                <DisordersWrapper>
                    <ItemWrapper>
                        {disorders.map((disorder, idx) => <DisorderItem key={idx} disorder={disorder} />)}
                    </ItemWrapper>
                    <FancyButton onClick={this.showList}>Manage Disorders</FancyButton>
                    {showList && <DisordersList id={id} onCancel={this.hideList} />}
                </DisordersWrapper>
            );
        } else {
            return (
                <DisordersWrapper>
                    <FancyButton onClick={this.showList}>Manage Disorders</FancyButton>
                    {showList && <DisordersList id={id} onCancel={this.hideList} />}
                </DisordersWrapper>
            );
        }

    }

    private showList() {
        this.setState({
            showList: true,
        });
    }

    private hideList() {
        this.setState({
            showList: false,
        });
    }

}

export default connect(mapStateToProps)(SurvivorDisorders);
