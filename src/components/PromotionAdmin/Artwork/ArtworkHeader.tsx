import { theme } from "@/styles/theme";
import { useEffect, useState } from "react";
import styled from "styled-components";

const ArtworkHeader=({initialCheck,control}:{initialCheck:number,control:(isEditing:number)=>void})=>{
const [isChecked,setIsChecked]=useState(initialCheck);
useEffect(()=>{ //초기값 변경될 때 상태 업데이트
    setIsChecked(initialCheck);
},[initialCheck]);

    return(
        <HeaderWrapper>
        <div className="tabs">
            <input type='radio' id='radio1' name='tabs' onClick={()=>control(0)} checked={isChecked==0}/>
            <label className='tab' htmlFor='radio1'>Artwork</label>
            <input type='radio' id='radio2' name='tabs' onClick={()=>control(1)} checked={isChecked==1}/>
            <label className='tab' htmlFor='radio2'>Main<br/>Sequence</label>
            <input type='radio' id='radio3' name='tabs' onClick={()=>control(2)} checked={isChecked==2}/>
            <label className='tab' htmlFor='radio3'>Other<br/>Sequence</label>
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
width: 450px;
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
input[id="radio3"] {
  &:checked {
    & ~ .glider {
      transform: translateX(200%);
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