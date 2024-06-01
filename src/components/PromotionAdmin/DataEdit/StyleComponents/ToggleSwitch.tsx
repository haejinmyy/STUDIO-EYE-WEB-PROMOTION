import React, { useEffect, useState } from 'react';
import CheckBox from './CheckBox';
import styled from 'styled-components';

type ToggleSwitchType = {
  option1: string;
  option2: string;
  selected: boolean;
  onToggle?: (value: boolean) => void;
};

const ToggleSwitch = (props: ToggleSwitchType) => {
  const [isPublic, setIsPublic] = useState(props.selected);

  useEffect(() => {
    setIsPublic(props.selected);
  }, [props.selected]);

  const handleToggle = (visibility: boolean) => {
    props.onToggle && props.onToggle(visibility);
  };

  return (
    <ToggleSwitchStyle>
      <label htmlFor='switch' className={`switch_label ${isPublic ? 'public' : 'private'}`}>
        <CheckBox
          onClick={() => {
            setIsPublic(true);
            handleToggle(true);
          }}
          className='public'
          selected={isPublic}
        >
          {props.option1}
        </CheckBox>
        <CheckBox
          onClick={() => {
            setIsPublic(false);
            handleToggle(false);
          }}
          className='private'
          selected={!isPublic}
        >
          {props.option2}
        </CheckBox>
      </label>
    </ToggleSwitchStyle>
  );
};

export default ToggleSwitch;

const ToggleSwitchStyle = styled.div`
  margin-top: 10px;
`;
