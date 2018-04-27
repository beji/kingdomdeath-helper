import React from "react";
import { SyntheticEvent } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { ISettlement } from "../interfaces";
import { IItem } from "../interfaces/gear";
import { ID } from "../interfaces/generics";

interface IGearCardProps {
    id: ID;
    slotId?: number;
    item?: IItem;
}

const mapStateToProps = (state: ISettlement, ownProps: IGearCardProps): IGearCardProps => {
    return {
        item: state.items.find((item: IItem) => item.id === ownProps.id),
        ...ownProps,
    };
};

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
            line-height: 1rem;
            border: 1px solid #999;
            background:#ddd;
            padding:1rem;
            margin:.5rem;
        `;
        const CardHeadline = styled.div`
            font-weight:bold;
            text-align:center;
        `;
        const CardDescription = styled.div`
            background:#aaa;
        `;

        const { item } = this.props;

        return (
            <StyledCard onDragStart={this.handleDragStart} draggable={true}>
                <CardHeadline>{item && item.name}</CardHeadline>
                <CardDescription>{item && item.desc}</CardDescription>
            </StyledCard>
        );
    }

    private handleDragStart = (e: SyntheticEvent<HTMLDivElement> ) => {
        const event = e.nativeEvent as Event & { dataTransfer: DataTransfer };
        if (event.dataTransfer) {
            event.dataTransfer.effectAllowed = "move";
            event.dataTransfer.setData("ids", JSON.stringify({
                id: this.props.id,
                slotId: this.props.slotId,
            }));
        }
    }
}

export default connect(mapStateToProps)(GearCard);
