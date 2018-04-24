import React from "react";
import { Component, SyntheticEvent } from "react";
import { connect } from "react-redux";

import { ID, ISettlement } from "../interfaces";
import { IComplexStat } from "../interfaces/survivor";
import { clone } from "../util";

interface IComplexStatProps {
    id: ID;
    stat: IComplexStat;
}

interface IComplexStatState {
    editComplexStat: boolean;
}

const mapStateToProps = (state: ISettlement, ownProps: IComplexStatProps): IComplexStatProps => {
  const survivor = state.survivors.find((v) => v.id === ownProps.id);
  const statKey = survivor && Object.keys(survivor.baseStats).reduce((a, c) => a = c === ownProps.stat.label ? c : a);
  const stat = survivor && statKey && survivor.baseStats[statKey];

  return {
    id: ownProps.id,
    stat: clone(stat),
    ...ownProps,
  };
};

class ComplexStat extends Component<IComplexStatProps, IComplexStatState> {
    public constructor(props: IComplexStatProps) {
        super(props);
        this.state = {
            editComplexStat: false,
        };
        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleEditConfirm = this.handleEditConfirm.bind(this);
    }

    public render() {
      const { editComplexStat } = this.state;
      const { stat } = this.props;

      return (
          <div>
              {editComplexStat && <span onClick={this.handleEditConfirm}>edit it!</span>}
              {!editComplexStat && <span onClick={this.handleEditClick}>{this.renderCombinedComplexStat(stat)}</span>}
          </div>
      );
    }

    private renderCombinedComplexStat(stat: IComplexStat) {
        return stat.permanent + stat.gear + stat.token;
    }

    private handleEditClick(e: SyntheticEvent<HTMLSpanElement>) {
        this.setState({
            editComplexStat: true,
        });
    }

    private handleEditConfirm(e: SyntheticEvent<HTMLSpanElement>) {
        this.setState({
            editComplexStat: false,
        });
    }
}

export default connect(mapStateToProps)(ComplexStat);
