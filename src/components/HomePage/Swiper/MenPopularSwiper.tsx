// library
import { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
// utils
import { PopularToMen } from '../../../utils/Filter';
import { getTodayDate } from '../../../utils/FormatDate';
// API
import { getPopupData } from '../../../services/api';
// types
import { Store } from '../../../types/data/storeInterface';
// style
import * as S from './style';
import LoadingAnimation from '../../GlobalComponents/LoadingAnimation';

interface Props {
  data: Store[];
}

const MenPopularSwiper = ({ data }: Props) => {
  const navigate = useNavigate();
  const menTopTwo = PopularToMen();

  const [todayDate, setTodayDate] = useState<number | any>();

  // 오늘날짜
  useEffect(() => {
    setTodayDate(getTodayDate());
  }, []);

  /** popupList: 전체 데이터
   * 최근 오픈했어요
   */
  const popupList = data.filter((store: Store) => {
    return (
      parseInt(store.open.split('.').join('')) >= todayDate - 140 &&
      todayDate <= parseInt(store.close.split('.').join(''))
    );
  });
  // 최근 오픈 순
  const openingSoon = popupList.sort(
    (a: Store, b: Store) =>
      Number(b.open.split('.').join('')) - Number(a.open.split('.').join('')),
  );

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrow: true,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <S.SwiperContainer {...settings}>
        {menTopTwo.map((popup: Store) => {
          return (
            <S.StoreContainer
              key={popup.id}
              onClick={() => navigate(`/detail/${popup.id}`, { state: popup })}
            >
              <S.PopupImg src={popup.imgURL[0]} alt="팝업스토어사진" />
              <S.StoreInformation>
                <S.InformationContainer>
                  <S.PopupTitle>{popup.title}</S.PopupTitle>
                  <S.PopupDate>
                    {popup.open} - {popup.close}
                  </S.PopupDate>
                </S.InformationContainer>
                <S.CategoryContainer>
                  <S.Category
                    onClick={(event) => {
                      event.stopPropagation();
                      navigate(`/search?search=${popup.location}`);
                    }}
                  >
                    {popup.location}
                  </S.Category>
                  <S.Category
                    onClick={(event) => {
                      event.stopPropagation();
                      navigate(`/search?search=${popup.category}`);
                    }}
                  >
                    {popup.category}
                  </S.Category>
                  <S.Category
                    onClick={(event) => {
                      event.stopPropagation();
                      navigate(`/search?search=${popup.item}`);
                    }}
                  >
                    {popup.item}
                  </S.Category>
                </S.CategoryContainer>
              </S.StoreInformation>
            </S.StoreContainer>
          );
        })}
        <S.SeeMoreContainer onClick={() => navigate(`/search`)}>
          <S.SeeMoreImage src={require('../../../assets/Img/SeeMore.jpg')} />
          <S.SeeMoreText>더 많은 팝업스토어 보기</S.SeeMoreText>
        </S.SeeMoreContainer>
      </S.SwiperContainer>
    </>
  );
};

export default MenPopularSwiper;
