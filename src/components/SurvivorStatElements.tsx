import styled from "styled-components";
import { colorMagentaLachs } from "./StyledComponents";

const SurvivorStat = styled.div`
    flex: 1;
    max-width: 50%;
    text-align:center;
    padding:.25rem;
    border: 1px solid #aaa;
    @media only screen
      and (min-device-width: 375px)
      and (max-device-width: 667px) {
         flex-basis:33.33333%;
    }
`;

const StatElement = styled.div`
    border:1px solid #eee;
    cursor:pointer;
    margin-bottom:.5vh;
    padding: .25rem;
    position:relative;
    text-align:center;
    &.gear:before {
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          width: 0;
          height: 0;
          border-top: 20px solid ${colorMagentaLachs};
          border-left: 20px solid transparent;
    }
    &.token:after {
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          width: 0;
          height: 0;
          border-top: 10px solid limegreen;
          border-left: 10px solid transparent;
    }
`;
const StatLabel = styled.span`
    font-weight:bold;
`;

const StatEdit = styled.div`
    width:33.33333%;
    margin-bottom:1rem;
`;

const StatWrapper = styled.div`
`;

const Input = styled.input`
    border-radius: 0;
    margin:.5rem 0;
    width:70%;
`;

const Label = styled.div`
    margin:.5rem 0;
    width:30%;
`;

const LightWound = styled.div`
    border:1px solid #444;
    cursor:pointer;
    display: inline-block;
    margin:0 .25vh;
    width:1rem;
    height:1rem;
    &.active {
        background: ${colorMagentaLachs};
    }
`;
const HeavyWound = LightWound.extend`
    border-width:3px;
`;

export { HeavyWound, Input, Label, LightWound, StatEdit, StatElement, StatLabel, StatWrapper, SurvivorStat };
