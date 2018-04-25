import React from "react";
import styled from "styled-components";
import uuid from "uuid/v4";
import { ID } from "../interfaces";
import { IGearGrid, IGridSlot } from "../interfaces/gear";

interface IGearGridState {
    grid: IGearGrid;
}

interface IGearGridProps {
    id: ID;
}

class GearGrid extends React.Component<IGearGridProps, IGearGridState> {
    public constructor(props: IGearGridProps) {
        super(props);

        const emptySlot: IGridSlot = {
            content: null,
            id: uuid(),
        };

        this.state = {
            grid: {
                id: props.id,
                slots: [
                    emptySlot,
                    emptySlot,
                    emptySlot,
                    emptySlot,
                    emptySlot,
                    emptySlot,
                    emptySlot,
                    emptySlot,
                    emptySlot,
                ],
            },
        };
    }

    public render() {
        const StyledGrid = styled.div`
            width:100%;
        `;
        const StyledElement = styled.div`
            width:33%:
            height:33%;
        `;

        return (
            <StyledGrid>
                {Object.keys(this.state.grid.slots).map((v, i) => <StyledElement key={i}>{i}</StyledElement>)}
            </StyledGrid>
        );
    }
}

export default GearGrid;
