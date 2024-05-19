import { theme } from "@/styles/theme";
import { useEffect, useState } from "react";
import styled from "styled-components";

const ArtworkHeader=({initialCheck,control}:{initialCheck:boolean,control:(isEditing:boolean)=>void})=>{
const [isChecked,setIsChecked]=useState(initialCheck);
useEffect(()=>{ //초기값 변경될 때 상태 업데이트
    setIsChecked(initialCheck);
},[initialCheck]);

    return(
        <HeaderWrapper>
        <div className="tabs">
            <input type='radio' id='radio1' name='tabs' onClick={()=>control(false)} checked={!isChecked}/>
            <label className='tab' htmlFor='radio1'>Artwork</label>
            <input type='radio' id='radio2' name='tabs' onClick={()=>control(true)} checked={isChecked}/>
            <label className='tab' htmlFor='radio2'>Edit Sequence</label>
            <span className="glider"></span>
        </div>
        </HeaderWrapper>
    );
};

export default ArtworkHeader;

const HeaderWrapper = styled.div`
font-family: 'pretendard-bold';
// font-size: 32px;
color: #595959;
margin-bottom: 21px;

.tabs {
width: 300px;
display: flex;
flex-direction:row;
// position: relative;
background-color: #fff;
border-radius: 99px; // just a high number to create pill effect
* {
  z-index: 2;
}}

input[type="radio"] {
display: none;
}

.tab {
display: flex;
align-items: center;
justify-content: center;
height: 50px;
width: 150px;
font-size: 1.2rem;
border-radius: 99px; // just a high number to create pill effect
cursor: pointer;
transition: color 0.15s ease-in;
}

input[type="radio"] {
&:checked {
  & + label {
    color: ${theme.color.yellow.bold};
  }
}}

input[id="radio1"] {
&:checked {
  & ~ .glider {
    transform: translateX(0);
  }
}}
input[id="radio2"] {
&:checked {
  & ~ .glider {
    transform: translateX(100%);
  }
}}

.glider {
position: absolute;
display: flex;
height: 50px;
width: 150px;
background-color: ${theme.color.yellow.light};
z-index: 1;
border-radius: 99px;
transition: 0.25s ease-out;
}
`;