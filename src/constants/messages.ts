const BUTTON_MSG = {
  SAVE: '저장하기',
  DELETE: '삭제하기',
  MODIFY: '수정하기',
  POST: '등록하기',
  UPLOAD: {
    LOGO: 'Logo Upload',
    SLOGAN: 'Slogan Upload',
  },
  ADD: {
    DETAIL: 'Add New Detail',
    PARTNER: 'Add New Partner',
    CLIENT: 'Add New Client',
  },
};

const CONFIRM_MSG = {
  SAVE: '저장하시겠습니까?',
  DELETE: '삭제하시겠습니까?',
  POST: '등록하시겠습니까?',
};

const ALERT_MSG = {
  SAVE: '저장되었습니다.',
  DELETE: '삭제되었습니다.',
  POST: '등록되었습니다.',
};

const PLACEHOLDER_MSG = {
  ADDRESS: '주소를 입력해주세요.',
  ENGLISH_ADDRESS: '영문 주소를 입력해주세요.',
  PHONE: '전화번호를 입력해주세요.',
  FAX: '팩스번호를 입력해주세요.',
  DETAIL: {
    TITLE: '제목을 입력해주세요.',
    CONTENT: '내용을 입력해주세요.',
  },
};

const INVALID_MSG = {
  ADDRESS: '유효한 주소를 입력해주세요.',
  ENGLISH_ADDRESS: '유효한 영문 주소를 입력해주세요.',
  PHONE: '유효한 전화번호를 입력해주세요. (예: 010-1234-5678) ',
  FAX: '유효한 팩스번호 형식을 입력해주세요. (예: 02-123-4567 또는 031-1234-5678)',
  DETAIL: 'Detail 항목은 최소 1개 이상 등록되어야 합니다.',
  LOGO: 'Logo 파일을 업로드해주세요',
  SLOGAN: 'Slogan 파일을 업로드해주세요',
};

const EXCEPTION_MSG = {
  NULL_DATA: '데이터가 존재하지 않습니다.',
};

const INFO_MSG = {};

export const MSG = {
  BUTTON_MSG,
  ALERT_MSG,
  CONFIRM_MSG,
  PLACEHOLDER_MSG,
  INVALID_MSG,
  EXCEPTION_MSG,
};
