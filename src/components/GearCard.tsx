import React, { SyntheticEvent } from "react";
import styled from "styled-components";
import { ID } from "../interfaces/generics";

interface IGearCardProps {
    id: ID;
}

class GearCard extends React.Component<IGearCardProps> {
    public constructor(props: IGearCardProps) {
        super(props);
        this.state = {
            dragging: false,
        };
        this.handleDragStart.bind(this);
    }

    public render() {
        const StyledCard = styled.div`
            width:5vw;
            height:5vw;
            background:#aaa;
        `;

        return (
            <StyledCard onDragStart={this.handleDragStart} draggable={true}>Fancy Sword</StyledCard>
        );
    }

    private handleDragStart = (e: SyntheticEvent<HTMLDivElement>) => {
        console.log("dragstarted", this.props.id);
    }
}

export default GearCard;
