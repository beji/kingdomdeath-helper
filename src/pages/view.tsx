import Fuse from "fuse.js";
import React, { SyntheticEvent } from "react";
import { RouteComponentProps } from "react-router";
import styled from "styled-components";
import disorders from "../../data/final/disorder.json";
import arts from "../../data/final/fightingarts.json";
import GearCard from "../components/GearCard";
import items from "../data/ItemDataHelper";
import { IDisorder, IFightingArt, IItem } from "../interfaces";
import { capitalize } from "../util";

const CardGrid = styled.div`
    display:flex;
    flex-wrap:wrap;
    max-width:1440px;
`;
const CardWrapper = styled.div`
    width:25%;
    padding:.5rem;
    font-size:.875rem;
    text-align: center;
    @media only screen
      and (min-device-width: 375px)
      and (max-device-width: 667px) {
        width: 50%;
    }
`;
const TextWrapper = styled.div`
    width:100%;
`;
const Headline = styled.div`
    font-weight:bold;
    margin:.25rem 0;
`;
const Description = styled.div`
    font-size:.875rem;
    margin-bottom:.5rem;
`;
const FilterInput = styled.input`
    border: 2px solid #aaa;
    font-size:1rem;
    margin: 0 auto;
    padding:.25rem;
    width: 80%;
`;

interface IViewPageState {
    items: any[];
    type: string;
}

interface IViewPageMatchParams {
    type: string;
}

interface IViewPageProps extends RouteComponentProps<IViewPageMatchParams> { }

class ViewPage extends React.Component<IViewPageProps, IViewPageState> {
    private sortedItems: any[] = [];

    public constructor(props: IViewPageProps) {
        super(props);
        this.state = {
            items: [],
            type: "",
        };
        this.handleFilter = this.handleFilter.bind(this);
    }

    public componentWillReceiveProps(nextProps: IViewPageProps) {
        const { match } = nextProps;

        switch (match.params.type) {
            case "gear": {
                this.sortedItems = items as IItem[];
                break;
            }
            case "arts": {
                this.sortedItems = arts as IFightingArt[];
                break;
            }
            default: {
                this.sortedItems = disorders as IDisorder[];
            }
        }
        const sortColumnName = "name";
        this.sortedItems.sort((x: any, y: any) => {
            return ((x[sortColumnName] === y[sortColumnName]) ? 0 : ((x[sortColumnName] > y[sortColumnName]) ? 1 : -1));
        });

        this.setState({
            items: this.sortedItems,
            type: match.params.type,
        });
    }

    public render() {
        return (
            <div>
                <Headline>{capitalize(this.state.type)}</Headline>
                <FilterInput type="text" placeholder="filter..." onChange={this.handleFilter} />
                <CardGrid>{this.renderItemCards()}</CardGrid>
            </div>
        );
    }

    private renderItemCards() {
        return this.state.items.map((item, idx) => {
            if (this.state.type === "gear") {
                return (
                    <CardWrapper key={idx}>
                        <GearCard id={item.id} />
                    </CardWrapper>
                );
            } else {
                return (
                    <TextWrapper key={idx}>
                        <Headline>{item.name}</Headline>
                        <Description>{item.description}</Description>
                    </TextWrapper>
                );
            }
        });
    }

    private handleFilter(event: SyntheticEvent<HTMLInputElement>) {
        if (event.currentTarget.value === "") {
            this.setState({ items: this.sortedItems });
        } else if (event.currentTarget.value.length > 2) {
            const fuse = new Fuse(this.sortedItems as any[], {
                keys: ["name"],
                threshold: 0.4,
            });
            this.setState({
                items: fuse.search(event.currentTarget.value),
            });
        }

    }
}

export default ViewPage;
