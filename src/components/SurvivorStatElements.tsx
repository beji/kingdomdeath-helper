import styled from "styled-components";
import { colorMagentaLachs } from "./StyledComponents";

const SurvivorStat = styled.div`
    flex: 1;
    max-width: 50%;
    text-align:center;
    margin-bottom:.5vh;
    padding:.25rem;
    border: 1px solid #aaa;
    @media only screen
      and (min-device-width: 375px)
      and (max-device-width: 667px) {
            width: 33.33333%;
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
          top: 0%;
          right: 0%;
          width: 0px;
          height: 0px;
          border-top: 20px solid ${colorMagentaLachs};
          border-left: 20px solid transparent;
    }
    &.token:after {
          content: "";
          position: absolute;
          top: 0%;
          right: 0%;
          width: 0px;
          height: 0px;
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

const StatLayer = styled.div`
    background:#fff;
    border:1px solid #ddd;
    border-radius: .5rem;
    box-shadow:3px 3px 10px;
    display:flex;
    justify-content: space-between;
    flex-wrap:wrap;
    left:50%;
    padding:.5rem;
    position:fixed;
    top:50%;
    transform:translate3d(-50%, -50%, 0);
    width:30vw;
    z-index:10;
    @media only screen
      and (min-device-width: 375px)
      and (max-device-width: 667px) {
            width: 90%;
    }
`;

const StatLayerHeadline = styled.div`
    font-weight:bold;
    padding:.5rem;
    text-align:center;
    width:100%;
`;

const Input = styled.input`
    width:70%;
    margin:.5rem 0;
`;

const Label = styled.div`
    width:30%;
    margin:.5rem 0;
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

export { HeavyWound, Input, Label, LightWound, StatEdit, StatElement, StatLabel, StatLayer, StatLayerHeadline, StatWrapper, SurvivorStat };
