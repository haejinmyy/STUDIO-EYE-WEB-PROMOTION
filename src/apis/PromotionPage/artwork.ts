import { PROMOTION_BASIC_PATH } from '@/constants/basicPathConstants';

export function getArtworkData() {
  return fetch(`${PROMOTION_BASIC_PATH}/api/projects`).then((response) => response.json());
}

export function getArtworkDetailData(id: number) {
  return fetch(`${PROMOTION_BASIC_PATH}/api/projects/${id}`).then((response) => response.json());
}
