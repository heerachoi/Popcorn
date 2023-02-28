import React from 'react';
import * as S from './style';
import { auth } from '../../../services/firebase';
import { useQuery } from 'react-query';
import { getInfoErrReport, getNewStoreReport } from '../../../services/api';
import NoResults from '../NoResults/NoResults';

const MyReportList = () => {
  const {
    isLoading,
    isError,
    data: newStores,
    error,
  } = useQuery('newStores', getNewStoreReport);

  const { status, data: errReport } = useQuery(
    'infoErrModifiContents',
    getInfoErrReport,
  );

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (isLoading) {
    console.log('로딩중');
    return <p>Loading...</p>;
  }
  if (isError) {
    console.log('오류내용', error);
    return <p>Error!!!</p>;
  }
  const uid = auth.currentUser?.uid;

  const myErrReport = errReport.filter((item: any) => item.userId.uid === uid);
  console.log('myErrReport', myErrReport);
  const myNewStoreReport = newStores.filter(
    (item: any) => item.userId.uid === uid,
  );
  console.log('myNewStoreReport', myNewStoreReport);
  const myReports = myErrReport.concat(myNewStoreReport);
  console.log('myReports', myReports);

  return (
    <S.ReportWrap>
      {myReports.length === 0 ? (
        <NoResults />
      ) : (
        <S.ReportContainer>
          {myReports.map((li: any) => {
            return (
              <S.ListBox key={li.id}>
                <S.ListContent>
                  <S.ReportTitleText>{li.title}</S.ReportTitleText>
                  <S.ReportDateText>{li.reportedDate}</S.ReportDateText>
                </S.ListContent>
                <S.ListContent>
                  <S.ReportCategory>{li.category}</S.ReportCategory>
                  {li.status === false ? (
                    <S.ReportStatusText>진행중</S.ReportStatusText>
                  ) : (
                    <S.ReportStatusText style={{ color: 'black' }}>
                      완료
                    </S.ReportStatusText>
                  )}
                </S.ListContent>
              </S.ListBox>
            );
          })}
        </S.ReportContainer>
      )}
    </S.ReportWrap>
  );
};

export default MyReportList;

{
  /* {errReport
          .filter((item: any) => item.userId.uid === uid)
          .map((li: any) => {
            return (
              <S.ListBox key={li.id}>
                <S.ListContent>
                  <S.ReportTitleText>{li.title}</S.ReportTitleText>
                  <S.ReportDateText>{li.reportedDate}</S.ReportDateText>
                </S.ListContent>
                <S.ListContent>
                  <S.ReportCategory>{li.category}</S.ReportCategory>
                  {li.status === false ? (
                    <S.ReportStatusText>진행중</S.ReportStatusText>
                  ) : (
                    <S.ReportStatusText style={{ color: 'black' }}>
                      완료
                    </S.ReportStatusText>
                  )}
                </S.ListContent>
              </S.ListBox>
            );
          })}
        {newStores
          .filter((item: any) => item.userId.uid === uid)
          .map((li: any) => {
            return (
              <S.ListBox key={li.id}>
                <S.ListContent>
                  <S.ReportTitleText>{li.title}</S.ReportTitleText>
                  <S.ReportDateText>{li.reportedDate}</S.ReportDateText>
                </S.ListContent>
                <S.ListContent>
                  <S.ReportCategory>{li.category}</S.ReportCategory>
                  {li.status === false ? (
                    <S.ReportStatusText>진행중</S.ReportStatusText>
                  ) : (
                    <S.ReportStatusText style={{ color: 'black' }}>
                      완료
                    </S.ReportStatusText>
                  )}
                </S.ListContent>
              </S.ListBox>
            );
          })} */
}
