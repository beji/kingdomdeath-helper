import React from 'react'
import styled from 'styled-components'
import { Affinity, AffinityTypes } from '../interfaces'

interface IAffinityIconProps {
    affinity: Affinity
    direction?: string
    type?: AffinityTypes
}

const PuzzleIcon = styled.div<IAffinityIconProps>`
    background: ${props => Affinity[props.affinity]};
    border-radius: 2px;
    display: inline-block;
    height: 1em;
    margin: 0 0.25rem 0 0.5em;
    position: relative;
    width: 1em;
    &:before {
        background: inherit;
        border-radius: 50%;
        content: '';
        height: 30%;
        position: absolute;
        right: 95%;
        top: 50%;
        transform: translateY(-50%);
        width: 30%;
    }
    &:after {
        background: #fff;
        border-radius: 50%;
        bottom: -5%;
        content: '';
        height: 30%;
        left: 50%;
        position: absolute;
        transform: translateX(-50%);
        width: 30%;
    }
`

const CompleteIcon = styled.div<IAffinityIconProps>`
    background: ${props => Affinity[props.affinity]};
    display: inline-block;
    height: 1em;
    margin: 0 0.25em;
    position: relative;
    width: 1em;
    &:after {
        box-sizing: border-box;
        background: transparent;
        border: 1px solid #ddd;
        content: '';
        height: 0.75em;
        left: 0.125em;
        position: absolute;
        top: 0.125em;
        width: 0.75em;
    }
`

const HalfIcon = styled(CompleteIcon)`
    ${
        /* sc-property */ props => (props.direction === 'right' || props.direction === 'left' ? 'height' : 'width')
    }: 1.5em;
    ${
        /* sc-property */ props => (props.direction === 'right' || props.direction === 'left' ? 'width' : 'height')
    }: .75em;
    ${/* sc-property */ props => props.direction}: 0;
    position: absolute;
    &:after {
        border-${/* sc-custom 'left' */ props => props.direction}: none;
        ${
            /* sc-property */ props => (props.direction === 'right' || props.direction === 'left' ? 'height' : 'width')
        }: 1.25em;
        ${
            /* sc-property */ props => (props.direction === 'right' || props.direction === 'left' ? 'width' : 'height')
        }: .5em;
    }
    ${props => {
        if (props.direction === 'right' || props.direction === 'left') {
            return 'top: 50%; transform: translateY(-50%); margin:0 .125rem'
        } else {
            return 'left: 50%; transform: translateX(-50%); margin:.125rem 0'
        }
    }}
`

const AffinityIcon: React.SFC<IAffinityIconProps> = ({ affinity, direction, type }) => {
    switch (type) {
        case AffinityTypes.card: {
            return <PuzzleIcon affinity={affinity} title="Affinity on this card" />
        }
        case AffinityTypes.grid: {
            return <CompleteIcon affinity={affinity} title="Affinity on grid" />
        }
        case AffinityTypes.connect: {
            return <HalfIcon affinity={affinity} direction={direction} />
        }
        default: {
            return <React.Fragment />
        }
    }
}

export default AffinityIcon
