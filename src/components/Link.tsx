import { ISettlement } from "interfaces";
import React from "react";
import { connect } from "react-redux";
import { Link as RouterLink } from "react-router-dom";

interface ILinkStateProps {
    settlementId?: string;
}

interface ILinkOwnProps {
    to: string;
    className?: string;
}

interface ILinkProps extends ILinkStateProps, ILinkOwnProps { }

const mapStateToProps = (state: ISettlement, ownProps: ILinkOwnProps): ILinkStateProps => ({
    settlementId: state.id,
});

class Link extends React.Component<ILinkProps> {
    public render() {
        const { children, settlementId } = this.props;
        return <RouterLink className={this.props.className} to={`${this.props.to}?id=${settlementId}`}>{children}</RouterLink>;
    }
}

export default connect(mapStateToProps)(Link);
