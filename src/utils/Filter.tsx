// library
import { useQuery } from 'react-query';
import { getTodayDate } from './FormatDate';
// types
import { Store } from '../types/data/storeInterface';
// API
import { getPopupData } from '../services/api';
import LoadingAnimation from '../components/GlobalComponents/LoadingAnimation';

// 현재 진행중인 스토어
export const CurrentlyOpen = () => {
  const todayDate = getTodayDate();
  const { isLoading, isError, data, error } = useQuery('popup', getPopupData, {
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return <LoadingAnimation />;
  }
  if (isError) {
    console.log('오류내용', error);
    return <p>Error!!!</p>;
  }

  let currentlyOpen: Store[] = [];
  data
    .filter((store: Store) => {
      const openDate = Number(store.open.split('.').join(''));
      const closeDate = Number(store.close.split('.').join(''));
      return todayDate >= openDate && todayDate <= closeDate;
    })
    .forEach((store: Store) => {
      currentlyOpen.push(store);
    });
  return currentlyOpen;
};

// 뷰순위
export const MostViews = () => {};

// 여성 인기 팝업스토어
export const PopularToWomen = () => {
  const todayDate = getTodayDate();
  const { isLoading, isError, data, error } = useQuery('popup', getPopupData, {
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return <LoadingAnimation />;
  }
  if (isError) {
    console.log('오류내용', error);
    return <p>Error!!!</p>;
  }

  let currentlyOpen: any = [];
  data
    .filter((store: Store) => {
      const openDate = Number(store.open.split('.').join(''));
      const closeDate = Number(store.close.split('.').join(''));
      return todayDate >= openDate && todayDate <= closeDate;
    })
    .forEach((store: Store) => {
      currentlyOpen.push(store);
    });

  return currentlyOpen
    .sort((a: Store, b: Store) => b.view.female - a.view.female)
    .slice(0, 2);
};

// 남성 인기 팝업스토어
export const PopularToMen = () => {
  const todayDate = getTodayDate();
  const { isLoading, isError, data, error } = useQuery('popup', getPopupData, {
    staleTime: 5 * 60 * 1000,
  });

  if (isLoading) {
    return <LoadingAnimation />;
  }
  if (isError) {
    return <p>Error!!!</p>;
  }

  let currentlyOpen: any = [];
  data
    .filter((store: Store) => {
      const openDate = Number(store.open.split('.').join(''));
      const closeDate = Number(store.close.split('.').join(''));
      return todayDate >= openDate && todayDate <= closeDate;
    })
    .forEach((store: Store) => {
      currentlyOpen.push(store);
    });

  // 남성 조회 많은 순
  // const menViewSort = currentlyOpen.sort(
  //   (a: Store, b: Store) => b.view.male - a.view.male,
  // );
  // // 마감 순
  // const closingSoon = menViewSort.sort(
  //   (a: Store, b: Store) =>
  //     Number(a.close.split('.').join('')) - Number(b.close.split('.').join('')),
  // );
  // const menTopTwo = menViewSort.slice(0, 2);
  return currentlyOpen
    .sort((a: Store, b: Store) => b.view.male - a.view.male)
    .slice(0, 2);
};
