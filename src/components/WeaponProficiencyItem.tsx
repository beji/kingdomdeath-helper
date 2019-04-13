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

const WeaponProficiencyItem: React.FunctionComponent<IWeaponProficiencyItemProps> = ({ proficiency, showLayer }) => {
  const showDescription = () => {
    showLayer({
      content: proficiency.desc,
      headline: proficiency.name,
      type: LayerType.simple,
    })
  }
  return <ListItem onClick={showDescription}>{proficiency.name}</ListItem>
}

export default connect(
  null,
  mapDispatchToProps,
)(WeaponProficiencyItem)
