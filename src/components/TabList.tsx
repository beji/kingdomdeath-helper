import React from "react";
import styled from "styled-components";
import { colors } from "../theme";
import { colorMagentaLachs } from "./StyledComponents";
import Tab from "./Tab";

export interface ITabListState {
    activeTab: number;
}

const isReactElement = (obj: {}): obj is React.ReactElement<{}> => {
    return obj.hasOwnProperty("type");
};

const isTab = (obj: {}): obj is Tab => {
    return isReactElement(obj) && typeof obj.props !== "undefined" && typeof (obj.props as any).label !== "undefined";
};

const getTabs = (children: React.ReactNode) => React.Children.map(children as React.ReactElement[], (child: React.ReactChild): Tab | null => {
    if (isReactElement(child) && isTab(child)) {
        return child;
    }
    return null;
});

const TabListItem = styled.div`
    color: ${colors.text};
    border-top-left-radius:.25rem;
    border-top-right-radius:.25rem;
    display: inline-block;
    padding: .5vh 2vw;
    cursor: pointer;
    &:hover {
        background-color: ${colorMagentaLachs}
    }
`;
const ActiveTabListItem = styled(TabListItem)`
    border: 1px solid ${colors.hintedBorder};
    border-bottom: 0;
    background-color: ${colors.cardBorder};
`;

const TabContent = styled.div`
    border: 1px solid ${colors.hintedBorder};
`;

const Wrapper = styled.div`
    margin-top: 1vh;
    margin-bottom: 1vh;
`;

class TabList extends React.Component<{}, ITabListState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            activeTab: 0,
        };
        this.renderTabSelector = this.renderTabSelector.bind(this);
        this.changeTab = this.changeTab.bind(this);
    }
    public render() {
        const { children } = this.props;
        const tabs = getTabs(children).filter((child): child is Tab => child !== null);
        console.log(children, tabs);
        return (
            <Wrapper>
                <div>
                    {tabs.map((tab: Tab, index: number) => tab && this.renderTabSelector(tab, index))}
                </div>
                <div>
                    {tabs.map((tab: Tab, index: number) => tab && this.renderTabContent(tab, index))}
                </div>
            </Wrapper>
        );
    }

    private changeTab(activeTab: number) {
        this.setState({
            activeTab,
        });
    }

    private renderTabSelector(tab: Tab, index: number) {
        const { label, children } = tab.props;
        const { activeTab } = this.state;
        if (index === activeTab) {
            return (
                <ActiveTabListItem key={index}>{label}</ActiveTabListItem>
            );
        } else {
            // tslint:disable-next-line:jsx-no-lambda
            return <TabListItem key={index} onClick={(e) => this.changeTab(index)}>{label}</TabListItem>;
        }
    }
    private renderTabContent(tab: Tab, index: number) {
        const { label, children } = tab.props;
        const { activeTab } = this.state;
        if (index === activeTab) {
            return (
                <TabContent key={index}>{children}</TabContent>
            );
        } else {
            return "";
        }
    }
}

export default TabList;
