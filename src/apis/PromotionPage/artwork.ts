const BASIC_PATH = 'http://3.35.54.100:8080/';

export function getArtworkData() {
  return fetch(`${BASIC_PATH}api/projects`).then((response) => response.json());
}

export function getArtworkDetailData(id: number) {
  return fetch(`${BASIC_PATH}api/projects/${id}`).then((response) => response.json());
}
