import styled from "styled-components";

const StatElement = styled.div`
    cursor:pointer;
    padding: .25rem;
    text-align:center;
`;

const StatWrapper = styled.div`
    position:relative;
`;

const StatLayer = styled.div`
    background:#fff;
    border:1px solid #ddd;
    border-radius: .5rem;
    box-shadow:3px 3px 10px;
    display:flex;
    flex-wrap:wrap;
    left:50%;
    padding:.5rem;
    position:absolute;
    top:50%;
    transform:translate3d(-50%, -50%, 0);
    width:30vw;
    z-index:10;
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
        background: #888;
    }
`;
const HeavyWound = LightWound.extend`
    border-width:3px;
`;

export { HeavyWound, Input, Label, LightWound, StatElement, StatLayer, StatLayerHeadline, StatWrapper };
