import Fuse from "fuse.js";
import React, { SyntheticEvent } from "react";
import styled from "styled-components";
import disorders from "../../data/final/disorder.json";
import { IDisorder } from "../interfaces";

const CardGrid = styled.div`
    display:flex;
    flex-wrap:wrap;
    max-width:1440px;
`;
const CardWrapper = styled.div`
    width:50%;
    padding:.5rem;
    font-size:.875rem;
    @media only screen
      and (min-device-width: 375px)
      and (max-device-width: 667px) {
        width: 90%;
    }
`;
const Headline = styled.div`
    font-weight:bold;
    margin:.25rem 0;
`;
const FilterInput = styled.input`
    border: 2px solid #aaa;
    font-size:1rem;
    padding:.25rem;
    width: 80%;
`;

interface IDisordersPageState {
    disorders: IDisorder[];
}

const sortedDisorders = disorders;
const sortColumnName = "name";
sortedDisorders.sort((x: any, y: any) => {
    return ((x[sortColumnName] === y[sortColumnName]) ? 0 : ((x[sortColumnName] > y[sortColumnName]) ? 1 : -1));
});

class DisordersPage extends React.Component<any, IDisordersPageState> {
    public constructor(props: any) {
        super(props);
        this.state = {
            disorders: sortedDisorders,
        };
        this.handleFilter = this.handleFilter.bind(this);
    }

    public render() {
        return (
            <div>
                <Headline>Disorders</Headline>
                <FilterInput type="text" placeholder="filter..." onChange={this.handleFilter} />
                <CardGrid>{this.renderItemCards()}</CardGrid>
            </div>
        );
    }

    private renderItemCards() {
        return this.state.disorders.map((disorder, idx) => {
            return (
                <CardWrapper key={idx}>
                    <Headline>{disorder.name}</Headline>
                    <div>{disorder.description}</div>
                </CardWrapper>
            );
        });
    }

    private handleFilter(event: SyntheticEvent<HTMLInputElement>) {
        if (event.currentTarget.value === "") {
            this.setState({ disorders: sortedDisorders });
        } else if (event.currentTarget.value.length > 2) {
            const fuse = new Fuse(sortedDisorders as any[], {
                keys: ["name"],
                threshold: 0.4,
            });
            this.setState({
                disorders: fuse.search(event.currentTarget.value),
            });
        }

    }
}

export default DisordersPage;
