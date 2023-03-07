import { useQuery } from 'react-query';
import * as S from './style';
import { getBookMark } from '../../../services/api';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userInfo } from '../../../atoms';
import BookmarkNoResult from '../NoResults/BookmarkNoResult';
import { kakaoAccessToken, userInfoState } from '../../../atoms';

const BookMarkList = () => {
  const user = useRecoilValue(userInfo);
  const userInfos = user.userInfomation;
  const [kakaoUserInfo, setKakaoUserInfo] = useRecoilState(userInfoState);
  const accessToken = useRecoilValue(kakaoAccessToken);
  const { data, isLoading } = useQuery('BookMarkList', getBookMark);

  if (isLoading) {
    console.log('로딩중');
    return <p>Loading...</p>;
  }

  console.log('accessToken', accessToken);
  console.log('kakaoUserInfo', kakaoUserInfo);
  console.log('userInfos', userInfos);

  const bookmarkList = data?.filter((bookmark: any) => {
    return (
      userInfos?.uid === bookmark?.user || kakaoUserInfo.id === bookmark.uid
    );
  });

  return (
    <>
      {bookmarkList.length === 0 ? (
        <BookmarkNoResult />
      ) : (
        <S.BookMarkContainer>
          {bookmarkList.map((li: any) => {
            return (
              <S.BookMarkCard key={li.id}>
                <S.BookMarkStoreImg src={li.imgURL} />
                <S.BookMarkStoreInfo>
                  <S.BookMarkStoreContainer>
                    <S.StoreTitle>{li.title}</S.StoreTitle>
                    <S.StoreDate>
                      {li.open} - {li.close}
                    </S.StoreDate>
                  </S.BookMarkStoreContainer>
                  <S.StoreCategoryContainer>
                    <S.StoreCategory>{li.item}</S.StoreCategory>
                  </S.StoreCategoryContainer>
                </S.BookMarkStoreInfo>
              </S.BookMarkCard>
            );
          })}
        </S.BookMarkContainer>
      )}
    </>
  );
};

export default BookMarkList;
