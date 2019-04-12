import React from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { showLayer } from '../actions'
import { IWeaponProficiency, ISimpleLayer, LayerType } from '../interfaces'
import { ShowLayerAction } from '../interfaces/actions'
import { ListItem } from './StyledComponents'

interface IWeaponProficiencyItemOwnProps {
  proficiency: IWeaponProficiency
}

interface IWeaponProficiencyItemDispatchProps {
  showLayer: (layer: ISimpleLayer) => ShowLayerAction
}

interface IWeaponProficiencyItemProps extends IWeaponProficiencyItemOwnProps, IWeaponProficiencyItemDispatchProps {}

const mapDispatchToProps = (dispatch: Dispatch<ShowLayerAction>): IWeaponProficiencyItemDispatchProps => ({
  showLayer: (layer: ISimpleLayer) => dispatch(showLayer(layer)),
})

class WeaponProficiencyItem extends React.Component<IWeaponProficiencyItemProps> {
  public constructor(props: IWeaponProficiencyItemProps) {
    super(props)

    this.showDescription = this.showDescription.bind(this)
  }

  public render() {
    const { proficiency } = this.props
    return <ListItem onClick={this.showDescription}>{proficiency.name}</ListItem>
  }
  private showDescription() {
    const { proficiency } = this.props
    this.props.showLayer({
      content: proficiency.desc,
      headline: proficiency.name,
      type: LayerType.simple,
    })
  }
}

export default connect(
  null,
  mapDispatchToProps,
)(WeaponProficiencyItem)
