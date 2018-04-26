import React from "react";
import { MouseEvent, SyntheticEvent } from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import styled from "styled-components";
import { updateSurvivor } from "../actions/survivorActions";
import { ID, IHitLocation, ISettlement, ISurvivor } from "../interfaces";
import { UpdateSurvivorAction } from "../interfaces/survivorActions";
import { clone } from "../util";
import SurvivorBaseStat from "./SurvivorBaseStat";
import SurvivorDefenseStat from "./SurvivorDefenseStat";
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
    width: 33%;
`;

const StatSection = styled.section`
    display:flex;
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
        this.toggleName = this.toggleName.bind(this);
        this.renderDefenceStat = this.renderDefenceStat.bind(this);
    }

    public render() {
        const { survivor, firstnameEdit } = this.props;
        const sortedBaseStats = ["movement", "accuracy", "strength", "evasion", "luck", "speed"];
        const sortedDefenceStats = ["brain", "head", "arms", "body", "waist", "legs"];
        if (survivor) {
            const { name, id, gender, baseStats, defenseStats, survival } = survivor;
            return (
                <StyledCard>
                    <NameSection>
                        <Label>Name</Label>
                        {!firstnameEdit ? <span onClick={this.toggleName}>{name}</span> : <input type="text" defaultValue={name} onChange={this.nameUpdate} onBlur={this.toggleName} />}
                        <div>
                            <Label>Survival</Label> {survival}
                        </div>
                    </NameSection>
                    <section>
                        <Label>Gender</Label>
                        {gender}
                    </section>
                    <StatSection>
                        {sortedBaseStats.map((v, i) => (<SurvivorStat key={i}><StatLabel>{baseStats[v].label}</StatLabel><SurvivorBaseStat id={id} stat={baseStats[v]} /></SurvivorStat>))}
                    </StatSection>
                    <StatSection>
                        {sortedDefenceStats.map((v, i) => (<SurvivorStat key={i}><StatLabel>{defenseStats[v].label}</StatLabel><SurvivorDefenseStat id={id} stat={defenseStats[v]} /></SurvivorStat>))}
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
    private renderDefenceStat(defStat: IHitLocation, locName: string, index: number) {
        return (
            <div key={index}>
                {defStat.label}
                <div>
                    {defStat.armor}
                    {!defStat.onlyHeavyWound && <LightWound onClick={this.toggleWound.bind(this, locName, "lightWound")} className={defStat.lightWound ? "active" : ""} />}
                    <HeavyWound onClick={this.toggleWound.bind(this, locName, "heavyWound")} className={defStat.heavyWound ? "active" : ""} />
                </div>
            </div>
        );
    }
    private toggleWound(locName: string, woundType: string) {
        if (this.props.survivor) {
            const defStat = this.props.survivor.defenseStats[locName];
            if (woundType === "lightWound" || (woundType === "heavyWound" && defStat.lightWound)) {
                this.props.survivor.defenseStats[locName] = {
                    ...defStat,
                    [woundType]: !defStat[woundType],
                };
                this.props.updateSurvivor(this.props.survivor);
            }
        }
    }
    private nameUpdate(e: SyntheticEvent<HTMLInputElement>) {
        /*const newState = {
            name: e.currentTarget.value,
        };
        this.setState(newState);*/
    }
    private toggleName(e: MouseEvent<HTMLSpanElement> | SyntheticEvent<HTMLInputElement>) {
        /*const newState = {
            firstnameEdit: !this.state.firstnameEdit,
        };
        this.setState(newState);*/
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SurvivorCard);
