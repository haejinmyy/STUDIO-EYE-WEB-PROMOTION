import styled from 'styled-components';
import { ReactComponent as InfoIcon } from '@/assets/images/PA/infoIcon.svg';
import Title from '../StyleComponents/Title';
import Tooltip from '../StyleComponents/Tooltip';
import NoticeComponent from '../StyleComponents/NoticeComponent';

const TitleWrapper = styled.div`
  display: flex;
  margin-bottom: 10px;
`;
const NoticeComponentWrapper = styled.div`
  margin-top: 10px;
`;

export const INPUT_MAX_LENGTH = {
  BASIC_ADDRESS: 10,
  BASIC_PHONE: 10,
  BASIC_FAX: 10,
  DETAIL_TITLE: 15,
  DETAIL_CONTENT: 100,
  FAQ_QUESTION: 50,
};

const IMAGE_PIXEL = {
  LOGO: '200x200',
  SLOGAN: '1080x1080',
  CEOIMG: '320x330',
};

const IMAGE_COLOR = {
  LOGO: '밝은 색상',
  SLOGAN: '밝은 색상',
  CEOIMG: '밝은 색상',
};

const DATAEDIT_COLUMNS = {
  CEO: {
    title: 'CEO',
    description: 'About 화면에 반영됩니다.',
  },

  CEOIMG: {
    title: 'CEO Image',
    description: 'CEO 이미지 설정입니다. (CEO 소개 배경과 아래 사진 배경이 같습니다.)',
  },

  Basic: {
    title: 'Basic',
    description: 'Contact 화면과 Footer에 반영됩니다.',
  },

  Logo: {
    title: 'Logo',
    description: 'Header, Footer에 반영됩니다.',
  },

  Slogan: {
    title: 'Slogan',
    description: 'About 화면에 반영됩니다.',
  },

  Detail: {
    title: 'Detail',
    description: 'About 화면에 반영됩니다.',
  },

  Introduction: {
    title: 'Introduction',
    description:
      'Main Overview: Main 화면에 반영됩니다. \nCommitment: Main 화면에 반영됩니다. \nIntroduction: About 화면 반영됩니다. ',
  },

  Partner: {
    title: 'Partner',
    description: 'About 화면에 반영됩니다.',
  },

  Client: {
    title: 'Client',
    description: 'Main 화면에 반영됩니다.',
  },

  FAQ: {
    title: 'FAQ',
    description: 'FAQ 화면에 반영됩니다.',
  },
};

export const DATAEDIT_NOTICE_COMPONENTS = {
  IMAGE: {
    LOGO: (
      <NoticeComponentWrapper>
        <NoticeComponent description={`권장 픽셀: ${IMAGE_PIXEL.LOGO}`} />
      </NoticeComponentWrapper>
    ),
    SLOGAN: <NoticeComponent description={`권장 픽셀: ${IMAGE_PIXEL.SLOGAN}`} />,
    CEOIMG: <NoticeComponent description={`권장 픽셀: ${IMAGE_PIXEL.CEOIMG}`} />,
  },

  COLOR: {
    LOGO: <NoticeComponent description={`권장 색상: ${IMAGE_COLOR.LOGO}`} />,
    SLOGAN: <NoticeComponent description={`권장 색상: ${IMAGE_COLOR.SLOGAN}`} />,
    CEOIMG: <NoticeComponent description={`권장 색상: ${IMAGE_COLOR.CEOIMG}`} />,
  },
};

export const DATAEDIT_TITLES_COMPONENTS = {
  CEO: (
    <TitleWrapper>
      <Tooltip description={DATAEDIT_COLUMNS.CEO.description} svgComponent={<InfoIcon width={20} height={20} />} />
      <Title description={DATAEDIT_COLUMNS.CEO.title} />
    </TitleWrapper>
  ),

  CEOIMG: (
    <TitleWrapper>
      <Tooltip description={DATAEDIT_COLUMNS.CEOIMG.description} svgComponent={<InfoIcon width={20} height={20} />} />
      <Title description={DATAEDIT_COLUMNS.CEOIMG.title} />
    </TitleWrapper>
  ),

  Basic: (
    <TitleWrapper>
      <Tooltip description={DATAEDIT_COLUMNS.Basic.description} svgComponent={<InfoIcon width={20} height={20} />} />
      <Title description={DATAEDIT_COLUMNS.Basic.title} />
    </TitleWrapper>
  ),

  Logo: (
    <TitleWrapper>
      <Tooltip description={DATAEDIT_COLUMNS.Logo.description} svgComponent={<InfoIcon width={20} height={20} />} />
      <Title description={DATAEDIT_COLUMNS.Logo.title} />
    </TitleWrapper>
  ),

  Slogan: (
    <TitleWrapper>
      <Tooltip description={DATAEDIT_COLUMNS.Slogan.description} svgComponent={<InfoIcon width={20} height={20} />} />
      <Title description={DATAEDIT_COLUMNS.Slogan.title} />
    </TitleWrapper>
  ),

  Introduction: (
    <TitleWrapper>
      <Tooltip
        description={DATAEDIT_COLUMNS.Introduction.description}
        svgComponent={<InfoIcon width={20} height={20} />}
      />
      <Title description={DATAEDIT_COLUMNS.Introduction.title} />
    </TitleWrapper>
  ),

  Detail: (
    <TitleWrapper>
      <Tooltip description={DATAEDIT_COLUMNS.Detail.description} svgComponent={<InfoIcon width={20} height={20} />} />
      <Title description={DATAEDIT_COLUMNS.Detail.title} />
    </TitleWrapper>
  ),

  Partner: (
    <TitleWrapper>
      <Tooltip description={DATAEDIT_COLUMNS.Partner.description} svgComponent={<InfoIcon width={20} height={20} />} />
      <Title description={DATAEDIT_COLUMNS.Partner.title} />
    </TitleWrapper>
  ),

  Client: (
    <TitleWrapper>
      <Tooltip description={DATAEDIT_COLUMNS.Client.description} svgComponent={<InfoIcon width={20} height={20} />} />
      <Title description={DATAEDIT_COLUMNS.Client.title} />
    </TitleWrapper>
  ),

  FAQ: (
    <TitleWrapper>
      <Tooltip description={DATAEDIT_COLUMNS.FAQ.description} svgComponent={<InfoIcon width={20} height={20} />} />
      <Title description={DATAEDIT_COLUMNS.FAQ.title} />
    </TitleWrapper>
  ),
};
