import React, { useState } from 'react'
import styled from 'styled-components'
import { colors } from '../theme'
import { colorMagentaLachs } from './StyledComponents'
import Tab from './Tab'

const isReactElement = (obj: {}): obj is React.ReactElement<{}> => {
  return obj.hasOwnProperty('type')
}

const isTab = (obj: {}): obj is Tab => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return isReactElement(obj) && typeof obj.props !== 'undefined' && typeof (obj.props as any).label !== 'undefined'
}

const getTabs = (children: React.ReactNode) =>
  React.Children.map(
    children as React.ReactElement[],
    (child: React.ReactChild): Tab | null => {
      if (isReactElement(child) && isTab(child)) {
        return child
      }
      return null
    },
  )

const TabListItem = styled.div`
  color: ${colors.text};
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
  display: inline-block;
  padding: 0.5vh 2vw;
  cursor: pointer;
  &:hover {
    background-color: ${colorMagentaLachs};
  }
`
const ActiveTabListItem = styled(TabListItem)`
  border: 1px solid ${colors.hintedBorder};
  border-bottom: 0;
  background-color: ${colors.cardBorder};
`

const TabContent = styled.div`
  border: 1px solid ${colors.hintedBorder};
`

const Wrapper = styled.div`
  margin-top: 1vh;
  margin-bottom: 1vh;
`

const TabList: React.FunctionComponent = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0)
  const renderTabSelector = (tab: Tab, index: number) => {
    const { label } = tab.props
    if (index === activeTab) {
      return <ActiveTabListItem key={index}>{label}</ActiveTabListItem>
    } else {
      // tslint:disable-next-line:jsx-no-lambda
      return (
        <TabListItem key={index} onClick={() => setActiveTab(index)}>
          {label}
        </TabListItem>
      )
    }
  }
  const renderTabContent = (tab: Tab, index: number) => {
    const { children } = tab.props
    if (index === activeTab) {
      return <TabContent key={index}>{children}</TabContent>
    } else {
      return <React.Fragment key={index} />
    }
  }

  const tabs = getTabs(children).filter((child): child is Tab => child !== null)
  return (
    <Wrapper>
      <div>{tabs.map((tab: Tab, index: number) => tab && renderTabSelector(tab, index))}</div>
      <div>{tabs.map((tab: Tab, index: number) => tab && renderTabContent(tab, index))}</div>
    </Wrapper>
  )
}

export default TabList
