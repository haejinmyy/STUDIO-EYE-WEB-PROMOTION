import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

export interface IAuth {
  accessToken: string;
  userId: number;
}

export const authState = atom<IAuth>({
  key: 'auth',
  default: {
    accessToken: '',
    userId: 0,
  },
  effects_UNSTABLE: [persistAtom],
});

export const notiState = atom<boolean>({
  key: 'notiState',
  default: false,
});

export const ppHeaderState = atom<boolean>({
  key: 'ppHeader',
  default: false,
});

export const ppHeaderScrolledState = atom({
  key: 'ppHeaderScrolledState',
  default: true,
});

export const backdropState = atom<boolean>({
  key: 'backdropState',
  default: false,
});
