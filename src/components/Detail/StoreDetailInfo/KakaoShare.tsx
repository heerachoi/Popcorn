import { useEffect } from 'react';
import styled from 'styled-components';

interface Props {
  detailData: any;
}

const KakaoShare = ({ detailData }: Props) => {
  useEffect(() => {
    // 공유하기 위해서 Kakao.init()을 해줘야 함
    if (!window.Kakao.isInitialized()) {
      window.Kakao.init('89784cc6b64373d03c202e76af427626');
      window.Kakao.isInitialized(); // init되면 true, 아니면 false를 반환한다
    }
  }, []);

  // 공유하는 함수
  const shareKakao = () => {
    window.Kakao.Share.createDefaultButton({
      container: '#KakaoShareBtn', // 공유하려고 누르는 태그의 id
      objectType: 'feed', // 공유 타입
      content: {
        // 필수로 보낼 값
        title: detailData.title,
        description: '#' + detailData.item,
        imageUrl: detailData.imgURL[0],
        link: {
          // [내 애플리케이션] > [플랫폼] 에서 등록한 사이트 도메인과 일치해야 함
          mobileWebUrl: 'http://localhost:3000',
          webUrl: 'http://localhost:3000',
        },
      },
      social: {
        // 나중에 글 추천수의 데이터를 받아와서 바꿔줌
        likeCount: 286,
      },
      buttons: [
        {
          title: '웹으로 보기',
          link: {
            mobileWebUrl: 'http://localhost:3000',
            webUrl: 'http://localhost:3000',
          },
        },
      ],
    });
  };

  return (
    <div id="KakaoShareBtn">
      <KakaoImgBtn onClick={shareKakao}></KakaoImgBtn>
    </div>
  );
};

export default KakaoShare;

export const KakaoImgBtn = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  img {
    width: 100px;
    height: 100px;
  }
`;
