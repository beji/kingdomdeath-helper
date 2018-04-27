import React from "react";
import { SyntheticEvent } from "react";
import styled from "styled-components";
import { IItem } from "../interfaces/gear";
import { ID } from "../interfaces/generics";

interface IGearCardProps {
    id: ID;
    item?: IItem;
}

class GearCard extends React.Component<IGearCardProps> {
    public constructor(props: IGearCardProps) {
        super(props);
        this.state = {
            dragging: false,
        };
        this.handleDragStart = this.handleDragStart.bind(this);
    }

    public render() {
        const StyledCard = styled.div`
            whidth: 10vh;
            background:#aaa;
        `;

        const { item } = this.props;

        return (
            <StyledCard onDragStart={this.handleDragStart} draggable={true}>
                <section>{item && item.name}</section>
                <section>{item && item.desc}</section>
            </StyledCard>
        );
    }

    private handleDragStart = (e: SyntheticEvent<HTMLDivElement>) => {
        console.log("dragstarted", this.props.id);
    }
}

export default GearCard;
