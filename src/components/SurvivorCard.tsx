import React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import styled from "styled-components";
import { updateSurvivor } from "../actions/survivorActions";
import { BaseStats, DefenseStats, ID, ISettlement, ISurvivor, SpecialStats } from "../interfaces";
import { UpdateSurvivorAction } from "../interfaces/survivorActions";
import { capitalize, clone, specialStatToString } from "../util";
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
const NameSection = styled.section`
    border-bottom: 1px solid #333;
    margin-bottom: 0.5vh;
    padding-bottom: 0.5vh;
    display: block;
`;

const StatSection = styled.section`
    display:flex;
    flex-wrap:wrap;
    justify-content:space-between;
    width:100%;
    margin: .5rem 0;
`;

const LightWound = styled.div`
    border:1px solid #444;
    cursor:pointer;
    display: inline-block;
    margin:0 .25vh;
    width:1rem;
    height:1rem;
    &.active {
        background: #888;
    }
`;
const HeavyWound = LightWound.extend`
    border-width:3px;
`;

interface ISurvivorCardProps {
    id?: ID;
    survivor?: ISurvivor;
    firstnameEdit?: boolean;
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
                            {survival && <SurvivorStat><StatLabel>{capitalize(DefenseStats[survival.stat])}</StatLabel><SurvivorDefenseStat id={id} stat={survival} /></SurvivorStat>}
                        </section>
                    </NameSection>
                    <StatSection>
                        {survivor.specialstats.map((specialStat, idx) => (<SurvivorStat key={idx}><StatLabel>{specialStatToString(specialStat.stat)}</StatLabel><SurvivorSpecialStat id={id} stat={specialStat} /></SurvivorStat>))}
                    </StatSection>
                    <StatSection>
                        {survivor.baseStats.map((baseStat, idx) => (<SurvivorStat key={idx}><StatLabel>{capitalize(BaseStats[baseStat.stat])}</StatLabel><SurvivorBaseStat id={id} stat={baseStat} /></SurvivorStat>))}
                    </StatSection>
                    <StatSection>
                        {survivor.defenseStats.map((defenseStat, idx) => (defenseStat.stat !== DefenseStats.survival && <SurvivorStat key={idx}><StatLabel>{capitalize(DefenseStats[defenseStat.stat])}</StatLabel><SurvivorDefenseStat id={id} stat={defenseStat} /></SurvivorStat>))}
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
}

export default connect(mapStateToProps, mapDispatchToProps)(SurvivorCard);
