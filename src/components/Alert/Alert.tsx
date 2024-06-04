import Swal from 'sweetalert2';
import styled from 'styled-components';

export const Alert = {
  basic: (title: string, text?: string) => {
    Swal.fire({
      title,
      text,
      customClass: {
        container: 'AlertContainer',
      },
    });
  },
  confirmDelete: (title: string, text: string) => {
    Swal.mixin({
      customClass: {
        container: 'swal2-container',
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger',
      },
      buttonsStyling: true,
    }).fire({
      title,
      text,
      showCancelButton: true,
      confirmButtonText: '삭제',
      cancelButtonText: '취소',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('', '삭제되었습니다.');
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // Swal.fire('취소', '취소되었습니다.');
      }
    });
  },
  confirmAction: (title: string, text: string) => {
    Swal.fire({
      title,
      text,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '확인',
      customClass: {
        container: 'swal2-container',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('', '작업이 완료되었습니다.');
      }
    });
  },
  confirmSave: (title: string, confirmButtonText: string, denyButtonText: string) => {
    Swal.fire({
      title,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText,
      denyButtonText,
      customClass: {
        container: 'swal2-container',
      },
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('', '저장되었습니다.');
      } else if (result.isDenied) {
        // Swal.fire('', '저장이 취소되었습니다.');
      }
    });
  },

};

export default Alert;
