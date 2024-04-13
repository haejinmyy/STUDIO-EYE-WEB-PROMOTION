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
