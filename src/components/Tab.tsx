import React from 'react'

export interface ITabProps {
  label: string
  children?: React.ReactChild
}

class Tab extends React.Component<ITabProps> {
  public constructor(props: ITabProps) {
    super(props)
  }
  public render() {
    return ''
  }
}

export default Tab
