import React from 'react'

export interface ITabProps {
    label: string
    children?: React.ReactChild
}

class Tab extends React.Component<ITabProps> {
    constructor(props: ITabProps) {
        super(props)
    }
    public render() {
        const { label, children } = this.props
        return ''
    }
}

export default Tab
