import React from "react";
import { Component, MouseEvent, SyntheticEvent } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { Gender, ID, ISettlement, ISurvivor } from "../interfaces";
import { clone } from "../util";

const StyledCard = styled.div`
    border: 1px solid #333;
    flex: 1 1 45%;
    margin: 1vh 1vw;
    padding: 1vh 1vw;
    max-width: 50%;
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

interface ISurvivorCardProps {
    id: ID;
    survivor?: ISurvivor;
    firstnameEdit?: boolean;
}

const mapStateToProps = (state: ISettlement, ownProps: ISurvivorCardProps): ISurvivorCardProps => {
    const newSurvivor = state.survivors.find((v) => v.id === ownProps.id);
    return {
        firstnameEdit: false,
        id: ownProps.id,
        survivor: clone(newSurvivor),
    };
};

class SurvivorCard extends React.Component<ISurvivorCardProps> {
    public constructor(props: ISurvivorCardProps) {
        super(props);

        this.state = {
            firstnameEdit: false,
            ...this.props,
        };
        this.nameUpdate = this.nameUpdate.bind(this);
        this.toggleName = this.toggleName.bind(this);
    }

    public render() {
        const { survivor, firstnameEdit } = this.props;
        if (survivor) {
            const { name, id, gender } = survivor;
            return (
                <StyledCard>
                    <NameSection>
                        <Label>Name</Label>
                        {!firstnameEdit ? <span onClick={this.toggleName}>{name}</span> : <input type="text" defaultValue={name} onChange={this.nameUpdate} onBlur={this.toggleName} />}
                    </NameSection>
                    <section>
                        <Label>Gender</Label>
                        {gender}
                    </section>
                </StyledCard>
            );
        } else {
            return <StyledCard />;
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

export default connect(mapStateToProps)(SurvivorCard);
