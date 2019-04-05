import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import styled from "styled-components";
import { updateSurvivor, updateSurvivorName } from "../actions/survivorActions";
import { BaseStats, DefenseStats, ID, IState, ISurvivor } from "../interfaces";
import { UpdateSurvivorAction, UpdateSurvivorNameAction } from "../interfaces/actions";
import { colors } from "../theme";
import { capitalize, clone, specialStatToString } from "../util";
import Checkbox from "./Checkbox";
import GenderEdit from "./GenderEdit";
import NameEdit from "./NameEdit";
import { Card } from "./StyledComponents";
import SurvivorBaseStat from "./SurvivorBaseStat";
import SurvivorDefenseStat from "./SurvivorDefenseStat";
import SurvivorDisorders from "./SurvivorDisorders";
import SurvivorFightingArts from "./SurvivorFightingArts";
import SurvivorSpecialStat from "./SurvivorSpecialStat";
import { StatLabel, SurvivorStat } from "./SurvivorStatElements";
import SurvivorWeaponProficiency from "./SurvivorWeaponProficiency";

const StyledCard = styled(Card)`
    flex: 1 1 45%;
`;

const Label = styled.span`
    display: inline-block;
    font-weight: bold;
    margin-right: 2vw;
    &:after{
        content:":";
    }
`;
const NameWrapper = styled.section`
    display: flex;
    border-bottom: 1px solid ${colors.hintedBorder};
    margin-bottom: 0.5vh;
    padding-bottom: 0.5vh;
`;
const NameSection = styled.section`
    width: 50%;
`;
const SpecialSection = styled.section`
    text-align: right;
    width: 50%;
`;

const StatSection = styled.section`
    display:flex;
    flex-wrap:wrap;
    justify-content:space-between;
    width:100%;
    margin: .5rem 0;
`;

const TextSection = styled(StatSection)`
`;

interface ISurvivorCardOwnProps {
    id: ID;
}

interface ISurvivorCardStateProps {
    survivor?: ISurvivor;
    survivalLimit?: number;
}

interface ISurvivorCardDispatchProps {
    updateSurvivor: (survivor: ISurvivor) => UpdateSurvivorAction;
    updateSurvivorName: (id: ID, name: string) => UpdateSurvivorNameAction;
}

interface ISurvivorCardProps extends ISurvivorCardOwnProps, ISurvivorCardStateProps, ISurvivorCardDispatchProps { }

interface ISurvivorCardState {
    id?: ID;
    survivor?: ISurvivor;
    firstnameEdit: boolean;
}

const mapDispatchToProps = (dispatch: Dispatch<UpdateSurvivorAction | UpdateSurvivorNameAction>): ISurvivorCardDispatchProps => ({
    updateSurvivor: (survivor: ISurvivor) => dispatch(updateSurvivor(survivor)),
    updateSurvivorName: (id: ID, name: string) => dispatch(updateSurvivorName(id, name)),
});

const mapStateToProps = (state: IState, ownProps: ISurvivorCardOwnProps): ISurvivorCardStateProps => {
    const newSurvivor = state.settlement.survivors.find((v) => v.id === ownProps.id);
    return {
        survivalLimit: state.settlement.survivalLimit,
        survivor: clone(newSurvivor),
    };
};

class SurvivorCard extends React.Component<ISurvivorCardProps, ISurvivorCardState> {
    public constructor(props: ISurvivorCardProps) {
        super(props);

        this.state = {
            firstnameEdit: false,
            id: props.id,
            survivor: props.survivor,
        };
        this.nameUpdate = this.nameUpdate.bind(this);
    }

    public render() {
        const { survivor } = this.props;
        const sortedDefenceStats = ["brain", "head", "arms", "body", "waist", "legs"];
        if (survivor) {
            const { name, id, defenseStats } = survivor;
            const survival = defenseStats.find((stat) => stat.stat === DefenseStats.survival);
            return (
                <StyledCard>
                    <NameWrapper>
                        <NameSection>
                            <section>
                                <Label>Name</Label>
                                <NameEdit name={name} updateFunc={this.nameUpdate} />
                            </section>
                            <section>
                                <Label>Gender</Label>
                                <GenderEdit id={id} />
                            </section>
                        </NameSection>
                        <SpecialSection>
                            <section>
                                <Label>Skip next hunt</Label>
                                <Checkbox value={survivor.skipNextHunt} onChange={this.toggleBooleanStat.bind(this, "skipNextHunt")} />
                            </section>
                            <section>
                                <Label>Lifetime ReRoll</Label>
                                <Checkbox value={survivor.lifetimeReroll} onChange={this.toggleBooleanStat.bind(this, "lifetimeReroll")} />
                            </section>
                        </SpecialSection>
                    </NameWrapper>
                    <TextSection>
                        {survival && <SurvivorStat><StatLabel>{capitalize(DefenseStats[survival.stat])}</StatLabel><SurvivorDefenseStat id={id} statid={survival.stat} concatToDisplay={`/ ${this.props.survivalLimit}`} /></SurvivorStat>}
                        <SurvivorWeaponProficiency id={id} />
                        <SurvivorFightingArts id={id} />
                        <SurvivorDisorders id={id} />
                    </TextSection>
                    <StatSection>
                        {survivor.specialstats.map((specialStat, idx) => (<SurvivorStat key={idx}><StatLabel>{specialStatToString(specialStat.stat)}</StatLabel><SurvivorSpecialStat id={id} statid={specialStat.stat} /></SurvivorStat>))}
                    </StatSection>
                    <StatSection>
                        {survivor.baseStats.map((baseStat, idx) => (<SurvivorStat key={idx}><StatLabel>{capitalize(BaseStats[baseStat.stat])}</StatLabel><SurvivorBaseStat id={id} statid={baseStat.stat} /></SurvivorStat>))}
                    </StatSection>
                    <StatSection>
                        {survivor.defenseStats.map((defenseStat, idx) => (defenseStat.stat !== DefenseStats.survival && <SurvivorStat key={idx}><StatLabel>{capitalize(DefenseStats[defenseStat.stat])}</StatLabel><SurvivorDefenseStat id={id} statid={defenseStat.stat} /></SurvivorStat>))}
                    </StatSection>
                </StyledCard>
            );
        } else {
            return (
                <StyledCard>
                    No Survivor chosen!
                </StyledCard>
            );
        }
    }
    private nameUpdate(newName: string) {
        if (this.props.survivor) {
            this.props.updateSurvivorName(this.props.survivor.id, newName);
        }
    }
    private toggleBooleanStat(statKey: string) {
        const { survivor } = this.props;
        if (survivor) {
            const updateData = {
                ...survivor,
                [statKey]: !survivor[statKey],
            } as ISurvivor;
            this.props.updateSurvivor(updateData);
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SurvivorCard);
