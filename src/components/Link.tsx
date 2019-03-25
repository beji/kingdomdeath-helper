import { IState, UUID } from "interfaces";
import React from "react";
import { connect } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import styled from "styled-components";
import { colors } from "../theme";

interface ILinkStateProps {
    settlementId?: UUID;
}

interface ILinkOwnProps {
    to: string;
    className?: string;
}

interface ILinkProps extends ILinkStateProps, ILinkOwnProps { }

const mapStateToProps = (state: IState, ownProps: ILinkOwnProps): ILinkStateProps => ({
    settlementId: state.settlement.id,
});

const StyledRouterLink = styled(RouterLink)`
    &, &:visited, &:active, &:hover{
        color: ${colors.text}
    }
`;

class Link extends React.Component<ILinkProps> {
    public render() {
        const { children, settlementId } = this.props;
        return <StyledRouterLink className={this.props.className} to={`${this.props.to}?id=${settlementId}`}>{children}</StyledRouterLink>;
    }
}

export default connect(mapStateToProps)(Link);
