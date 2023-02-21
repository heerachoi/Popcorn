import React from 'react';
import { useState } from 'react';
import { InfoErrorForm, ErrorImgLabel } from './style';
import { BiImageAdd } from 'react-icons/bi';
import { storage } from '../../services/firebase';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { auth } from '../../services/firebase';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import * as S from './style';
import { useNavigate } from 'react-router-dom';

interface InfoErrInput {
  title: string;
  storeName: string;
}

interface ErrContent {
  infoErrContent: string;
  infoModifiContent: string;
}

// 정보 오류/수정 제보
const InfoError: any = () => {
  const navigate = useNavigate()

  // input 초기값
  const initInfoErrModifiInput = {
    title: '',
    storeName: '',
  };

  // 오류, 수정 내용 적는 textarea 초기값
  const initErrContent = {
    infoErrContent: '',
    infoModifiContent: '',
  };

  const [infoErrModifiInput, setInfoErrModifiInput] = useState<InfoErrInput>(
    initInfoErrModifiInput,
  );
  const [errContent, setErrContent] = useState<ErrContent>(initErrContent);
  const [errImgFile, setErrImgFile] = useState(''); // 이미지 파일
  const [errFileName, setErrFileName] = useState(''); //이미지 파일 이름

  const userId = auth?.currentUser;

  // input onChange 함수
  const infoErrModifiOnChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInfoErrModifiInput({
      ...infoErrModifiInput,
      [event.target.name]: event.target.value,
    });
  };

  const errContentOnchangeHandler = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setErrContent({
      ...errContent,
      [event.target.name]: event.target.value,
    });
  };

  // 이미지 파일 input onChange 함수
  const errModifiImgOnChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const target = event.currentTarget;
    const theFile = (target.files as FileList)[0]; // 이벤트로부터 파일을 얻어와서 첫 번째 파일만 받음
    setErrFileName(theFile.name);

    const reader = new FileReader();
    reader.readAsDataURL(theFile); // file 객체를 data url로 바꿔줌

    reader.onloadend = (finishedEvent: any) => {
      setErrImgFile(finishedEvent.currentTarget.result);
    };
  };

  // 취소 버튼 방지
  const cancleHandler = () => {
    if(window.confirm('작성을 취소하시겠습니까?')) {
      navigate('/')
    }
  }

  // // 제보하기 버튼 onSubmit 함수 (json db 추가)
  const errModifiInfoAddHandler = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    // firebase storage에 이미지 업로드
    const errInfoImgRef = ref(storage, `errInfoImg/${errFileName}`);

    let downloadImgUrl;
    if (errImgFile) {
      const response = await uploadString(
        errInfoImgRef,
        errImgFile,
        'data_url',
      );
      downloadImgUrl = await getDownloadURL(response.ref);
    } else {
      downloadImgUrl = '';
    }

    // 제보 날짜 받기 위해 today라는 변수 생성
    const today = new Date();

    // db에 올라가는 데이터 구조
    const newErrModifiInfo = {
      id: uuidv4(),
      userId,
      title: infoErrModifiInput.title,
      storeName: infoErrModifiInput.storeName,
      infoErrContent: errContent.infoErrContent,
      infoModifiContent: errContent.infoModifiContent,
      errImg: downloadImgUrl,
      reportedDate: today.toLocaleString(),
      category: '오류&수정',
      status: false,
    };

    // db에 추가
    try {
      axios.post(
        'http://localhost:3001/infoErrModifiContents',
        newErrModifiInfo,
      );
      setInfoErrModifiInput(initInfoErrModifiInput);
      setErrImgFile('');
      setErrContent(initErrContent);

      alert('제보 완료!');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <S.InfoErrorForm onSubmit={errModifiInfoAddHandler}>
      <S.ReportGrid>
        <S.ReportTitle>제보 제목</S.ReportTitle>
        <S.ReportTitleInput
          type="text"
          name="title"
          placeholder="제목을 입력해 주세요."
          required
          onChange={infoErrModifiOnChangeHandler}
          value={infoErrModifiInput.title}
        />
      </S.ReportGrid>
      <S.ReportGrid>
        <S.ReportTitle>
          브랜드명
          <div>(스토어 이름)</div>
        </S.ReportTitle>
        <S.ReportTitleInput
          type="text"
          name="storeName"
          placeholder="스토어 이름을 입력해 주세요."
          required
          onChange={infoErrModifiOnChangeHandler}
          value={infoErrModifiInput.storeName}
        />
      </S.ReportGrid>
      <S.ReportGrid>
        <S.ReportTitle>정보 오류</S.ReportTitle>
        <S.TextArea
          style={{ height: 100 }}
          name="infoErrContent"
          placeholder='정보 오류 내용을 입력해 주세요. 없을 시 "없음"으로 입력해 주세요.'
          required
          onChange={errContentOnchangeHandler}
          value={errContent.infoErrContent}
        />
      </S.ReportGrid>
      <S.ReportGrid>
        <S.ReportTitle>정보 수정</S.ReportTitle>
        <S.TextArea
          style={{ height: 100 }}
          name="infoModifiContent"
          placeholder='정보 수정 내용을 입력해 주세요. 없을 시 "없음"으로 입력해 주세요.'
          required
          onChange={errContentOnchangeHandler}
          value={errContent.infoModifiContent}
        />
      </S.ReportGrid>
      <S.ReportGrid>
        <S.ReportTitle>이미지</S.ReportTitle>
        <ErrorImgLabel htmlFor="storeInfoImg">
          <BiImageAdd style={{ fontSize: '60px' }} />
          {errImgFile && (
            <img src={errImgFile} style={{ width: 150, height: 150 }} />
          )}
        </ErrorImgLabel>
        <input
          type="file"
          accept="image/*"
          id="storeInfoImg"
          onChange={errModifiImgOnChangeHandler}
          style={{ display: 'none' }}
        />
      </S.ReportGrid>
      <S.ButtonBox>
        <S.CancleBtn onClick={cancleHandler}>취소</S.CancleBtn>
        <S.AddBtn type="submit">제보하기</S.AddBtn>
      </S.ButtonBox>
    </S.InfoErrorForm>
  );
};

export default InfoError;
