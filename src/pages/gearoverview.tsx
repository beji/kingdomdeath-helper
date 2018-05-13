import Fuse from "fuse.js";
import React, { SyntheticEvent } from "react";
import styled from "styled-components";
import GearCard from "../components/GearCard";
import items from "../data/ItemDataHelper";
import { IItem } from "../interfaces";

const CardGrid = styled.div`
    display:flex;
    flex-wrap:wrap;
    max-width:1440px;
`;
const CardWrapper = styled.div`
    width:25%;
    padding:.5rem;
    @media only screen
      and (min-device-width: 375px)
      and (max-device-width: 667px) {
        width: 50%;
    }
`;
const FilterInput = styled.input`
    border: 2px solid #aaa;
    font-size:1rem;
    padding:.25rem;
    width: 80%;
`;

interface IGearOverviewPageState {
    items: IItem[];
}

const sortedItems = items;
const sortColumnName = "name";
sortedItems.sort((x, y) => {
    return ((x[sortColumnName] === y[sortColumnName]) ? 0 : ((x[sortColumnName] > y[sortColumnName]) ? 1 : -1));
});

class GearOverviewPage extends React.Component<any, IGearOverviewPageState> {
    public constructor(props: any) {
        super(props);
        this.state = {
            items: sortedItems,
        };
        this.handleFilter = this.handleFilter.bind(this);
    }

    public render() {
        return (
            <div>
                <FilterInput type="text" placeholder="filter..." onChange={this.handleFilter} />
                <CardGrid>{this.renderItemCards()}</CardGrid>
            </div>
        );
    }

    private renderItemCards() {
        return this.state.items.map((item, idx) => {
            return (
                <CardWrapper key={idx}>
                    <GearCard id={item.id} />
                </CardWrapper>
            );
        });
    }

    private handleFilter(event: SyntheticEvent<HTMLInputElement>) {
        if (event.currentTarget.value === "") {
            this.setState({ items: sortedItems });
        } else if (event.currentTarget.value.length > 2) {
            const fuse = new Fuse(sortedItems as any[], {
                keys: ["name"],
                threshold: 0.4,
            });
            this.setState({
                items: fuse.search(event.currentTarget.value),
            });
        }

    }
}

export default GearOverviewPage;
