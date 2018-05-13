import React from "react";
import styled from "styled-components";
import { darken } from "../util";
import Link from "./Link";
import { colorMagentaLachs } from "./StyledComponents";

const barHeight = 2;

const NavbarWrapper = styled.nav`
    background-color: ${colorMagentaLachs};
    color: #fff;
    box-shadow: inset 0 0 0 1px rgba(16,22,26,.2), 0 0 0 rgba(16,22,26,0), 0 1px 1px rgba(16,22,26,.4);;
    margin-bottom: 1rem;
    height: ${barHeight}rem;
    padding-left: .5vw;
    padding-right: .5vw;
    display: flex;
    align-items: center;
    position: fixed;
    width: 100%;
    top: 0;
    left: 0;
`;
const Head = styled.div`
    flex: 1;
`;
const LinkBox = styled.div`
    flex: 1;
    display: flex;
    text-align: right;
    justify-content: flex-end;
`;
const StyledLink = styled(Link)`
    color: #fff;
    text-decoration: none;
    display: inline-block;
    padding: 0.75vh 0.5vw;
    border-radius: 3px;
    &:hover{
        background-color: ${darken(colorMagentaLachs, 0.2)};
    }
`;

export default class Navbar extends React.Component {
    public render() {
        return (
            <NavbarWrapper>
                <Head>Kingdom: Death - Helper </Head>
                <LinkBox>
                    <StyledLink to="/">Home</StyledLink>
                    <StyledLink to="/gear">Gear</StyledLink>
                </LinkBox>
            </NavbarWrapper>
        );
    }
}
