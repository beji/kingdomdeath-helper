import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import styled from "styled-components";
import { updateSurvivor } from "../actions/survivorActions";
import { BaseStats, DefenseStats, ID, ISettlement, ISurvivor, SpecialStats } from "../interfaces";
import { UpdateSurvivorAction } from "../interfaces/survivorActions";
import { capitalize, clone, specialStatToString } from "../util";
import Checkbox from "./Checkbox";
import GenderEdit from "./GenderEdit";
import NameEdit from "./NameEdit";
import SurvivorBaseStat from "./SurvivorBaseStat";
import SurvivorDefenseStat from "./SurvivorDefenseStat";
import SurvivorSpecialStat from "./SurvivorSpecialStat";
import { StatLabel, SurvivorStat } from "./SurvivorStatElements";

const StyledCard = styled.div`
    border: 1px solid #333;
    flex: 1 1 45%;
    padding: 1vh 1vw;
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
    border-bottom: 1px solid #333;
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

interface ISurvivorCardProps {
    id?: ID;
    survivor?: ISurvivor;
    firstnameEdit?: boolean;
    survivalLimit?: number;
    updateSurvivor: (survivor: ISurvivor) => UpdateSurvivorAction;
}

interface ISurvivorCardState {
    id?: ID;
    survivor?: ISurvivor;
    firstnameEdit: boolean;
}

const mapDispatchToProps = (dispatch: Dispatch<UpdateSurvivorAction>) => ({
    updateSurvivor: (survivor: ISurvivor) => dispatch(updateSurvivor(survivor)),
});

const mapStateToProps = (state: ISettlement, ownProps: ISurvivorCardProps): ISurvivorCardProps => {
    const newSurvivor = state.survivors.find((v) => v.id === ownProps.id);
    return {
        firstnameEdit: false,
        id: ownProps.id,
        survivalLimit: state.survivalLimit,
        survivor: clone(newSurvivor),
        updateSurvivor,
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
                            <section>
                                {survival && <SurvivorStat><StatLabel>{capitalize(DefenseStats[survival.stat])}</StatLabel><SurvivorDefenseStat id={id} statid={survival.stat} concatToDisplay={`/ ${this.props.survivalLimit}`} /></SurvivorStat>}
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
            const updateData = {
                ...this.props.survivor,
                name: newName,
            } as ISurvivor;
            this.props.updateSurvivor(updateData);
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
