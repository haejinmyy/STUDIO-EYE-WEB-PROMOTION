import React, { useEffect, useState } from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import htmlToDraft from 'html-to-draftjs';
import { IEditorData } from '@/types/PromotionAdmin/faq';
import TextColorEditor from '../../TextColorEditor';
import { useQuery } from 'react-query';
import { getCompanyData } from '@/apis/PromotionAdmin/dataEdit';
import { ICompanyData } from '@/types/PromotionAdmin/dataEdit';

import { Wrapper, ContentBlock, InputWrapper, InputTitle } from '../CompanyFormStyleComponents';
import axios from 'axios';
import { PROMOTION_BASIC_PATH } from '@/constants/basicPathConstants';
import draftToHtml from 'draftjs-to-html';
import { DATAEDIT_NOTICE_COMPONENTS, DATAEDIT_TITLES_COMPONENTS } from '../StyleComponents';
import Button from '../../StyleComponents/Button';
import styled from 'styled-components';
import { MSG } from '@/constants/messages';

interface IIntrodutionProps {
  setEditIntroduction: (editMode: boolean) => void;
}

const Introduction = ({ setEditIntroduction }: IIntrodutionProps) => {
  const { data, isLoading, error } = useQuery<ICompanyData, Error>(['company', 'id'], getCompanyData);
  const [putData, setPutData] = useState({
    mainOverview: data?.mainOverview,
    commitment: data?.commitment,
    introduction: data?.introduction,
  });

  useEffect(() => {
    if (data) {
      setPutData({
        mainOverview: data.mainOverview,
        commitment: data.commitment,
        introduction: data.introduction,
      });

      setMainOverviewState(() => {
        const blocksFromHtml = htmlToDraft(data.mainOverview);
        if (blocksFromHtml) {
          const { contentBlocks, entityMap } = blocksFromHtml;
          const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
          return EditorState.createWithContent(contentState);
        } else {
          return EditorState.createEmpty();
        }
      });

      setCommitmentState(() => {
        const blocksFromHtml = htmlToDraft(data.commitment);
        if (blocksFromHtml) {
          const { contentBlocks, entityMap } = blocksFromHtml;
          const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
          return EditorState.createWithContent(contentState);
        } else {
          return EditorState.createEmpty();
        }
      });

      setIntroductionState(() => {
        const blocksFromHtml = htmlToDraft(data.introduction);
        if (blocksFromHtml) {
          const { contentBlocks, entityMap } = blocksFromHtml;
          const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
          return EditorState.createWithContent(contentState);
        } else {
          return EditorState.createEmpty();
        }
      });
    }
  }, [data]);

  const [mainOverviewState, setMainOverviewState] = useState(EditorState.createEmpty());
  const [commitmentState, setCommitmentState] = useState(EditorState.createEmpty());
  const [introductionState, setIntroductionState] = useState(EditorState.createEmpty());
  const [blocks, setBlocks] = useState<IEditorData[]>([]);
  const updateMainOverview = async (state: EditorState) => {
    await setMainOverviewState(state);
    setBlocks(convertToRaw(mainOverviewState.getCurrentContent()).blocks);
  };
  const updateCommitment = async (state: EditorState) => {
    await setCommitmentState(state);
    setBlocks(convertToRaw(commitmentState.getCurrentContent()).blocks);
  };
  const updateIntroduction = async (state: EditorState) => {
    await setIntroductionState(state);
    setBlocks(convertToRaw(introductionState.getCurrentContent()).blocks);
  };

  const checkIsEmpty = (editorState: EditorState, attribute: string) => {
    const isEmpty = !editorState.getCurrentContent().hasText();
    if (isEmpty) {
      alert(`${attribute}을(를) 작성해주세요.`);
      return true;
    }
    return false;
  };

  const handleSaveClick = async () => {
    const updateData = {
      mainOverview: draftToHtml(convertToRaw(mainOverviewState.getCurrentContent())),
      commitment: draftToHtml(convertToRaw(commitmentState.getCurrentContent())),
      introduction: draftToHtml(convertToRaw(introductionState.getCurrentContent())),
    };

    const isEmpty =
      checkIsEmpty(mainOverviewState, 'Main Overview') ||
      checkIsEmpty(commitmentState, 'Commitment') ||
      checkIsEmpty(introductionState, 'Introduction');

    if (!isEmpty && window.confirm(MSG.CONFIRM_MSG.SAVE)) {
      axios
        .put(`${PROMOTION_BASIC_PATH}/api/company/introduction`, updateData)
        .then((response) => {
          console.log('Company Introduction updated:', response);
          alert(MSG.ALERT_MSG.SAVE);
          setEditIntroduction(false);
        })
        .catch((error) => {
          console.error('Error updating company:', error);
        });
    }
  };

  if (isLoading) return <>is Loading...</>;
  if (error) return <>{error.message}</>;
  return (
    <Wrapper>
      <ContentBlock isFocused={true}>
        <TitleWrapper>
          {DATAEDIT_TITLES_COMPONENTS.Introduction}
          <Button description={MSG.BUTTON_MSG.SAVE} onClick={handleSaveClick} width={100} />
        </TitleWrapper>
        {DATAEDIT_NOTICE_COMPONENTS.TEXT.INTRODUCTION}

        <InputWrapper>
          <InputTitle>Main Overview</InputTitle>
          <TextColorEditor
            editorState={mainOverviewState}
            onEditorStateChange={updateMainOverview}
            attribute='Main Overview'
          />
          <InputTitle>Commitment</InputTitle>
          <TextColorEditor
            editorState={commitmentState}
            onEditorStateChange={updateCommitment}
            attribute='Commitment'
          />
          <InputTitle>Introduction</InputTitle>
          <TextColorEditor
            editorState={introductionState}
            onEditorStateChange={updateIntroduction}
            attribute='Introduction'
          />
        </InputWrapper>
      </ContentBlock>
    </Wrapper>
  );
};

export default Introduction;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;
