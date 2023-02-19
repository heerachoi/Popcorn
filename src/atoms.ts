import { atom } from 'recoil';

// atom은 두 가지를 요구하는데 첫 번째는 key로 유니크해야한다.
// 두 번째는 default 값이 필요하다.

interface UserInfoState {
  isLogin: boolean;
  userInfomation: UserInfomation;
}

interface UserInfomation {
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
  uid: string | null;
}

type MapSearchValue = string;
type MapCategoryValue = string | null;

export const userInfo = atom<UserInfoState>({
  key: 'user',
  default: {
    isLogin: false,
    userInfomation: {
      displayName: '',
      email: '',
      photoURL: '',
      uid: '',
    },
  },
});

export const mapCategoryValue = atom<MapCategoryValue>({
  key: 'category',
  default: ' ',
});

export const mapSearchValue = atom<MapSearchValue>({
  key: 'searchValue',
  default: '',
});

export const mapFoodData = atom<any>({
  key: 'mapFoodData',
  default: [],
});

export const popupList = atom<any>({
  key: 'popupList',
  default: [],
});

// export const mapCategorySelector = selector<any>({
//   key: 'mapCategorySelector',
//   get: async ({ get }) => {
//     const category = get(mapCategoryValue);
//     const data = await getPopupData();

//     return data;
//   },
// });
