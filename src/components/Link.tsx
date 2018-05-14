import { IState, UUID } from "interfaces";
import React from "react";
import { connect } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

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

class Link extends React.Component<ILinkProps> {
    public render() {
        const { children, settlementId } = this.props;
        return <RouterLink className={this.props.className} to={`${this.props.to}?id=${settlementId}`}>{children}</RouterLink>;
    }
}

export default connect(mapStateToProps)(Link);
