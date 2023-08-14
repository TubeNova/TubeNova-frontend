// import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { IoPerson } from 'react-icons/io5';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { FaHeart } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Reviews } from '../../data/Reviews';

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 4rem;
`;
const ContentRow = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 1rem;
`;

const ReviewRow = styled.div`
  width: 100%;
  display: flex;
  overflow: hidden;
  gap: 1.2rem;
  flex-wrap: wrap; // 추가된 코드
`;

const ReviewItem = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(
    (100% - 3.6rem) / 4
  ); // 현재 한 행에 4개의 리뷰를 보여줍니다. 필요하다면 이 값을 조절할 수 있습니다.
  gap: 0.5rem;
`;
const ReviewThumbnailContainer = styled.div`
  display: flex;
  border-radius: 1rem;
  overflow: hidden;
  width: 100%;
  flex-direction: column;
`;
const ReviewThumbnail = styled.img`
  width: 100%;
`;
const ReviewVideoTitle = styled.p`
  background-color: #ececec;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  padding: 0.7rem;
  box-sizing: border-box;
  font-size: 0.7rem;
`;
const ReviewUserContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ReviewUser = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.8rem;
  svg {
    font-size: 1.4rem;
    color: #fff;
    background-color: #d9d9d9;
    border-radius: 100%;
    padding: 0.2rem;
  }
`;
const ReviewRate = styled.div`
  color: #f90;
`;
const ReviewDesc = styled.p`
  font-size: 0.8rem;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
`;
const ReviewItemFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: end;
`;
const ReviewDate = styled.span`
  font-size: 0.7rem;
`;
const ReviewLikes = styled.span`
  display: flex;
  align-items: center;
  font-size: 0.8rem;
  svg {
    color: #d35757;
    margin-right: 0.4rem;
    font-size: 1rem;
  }
`;

const LikeReview = () => {
  return (
    <Container>
      <h1
        style={{
          fontSize: '1.3rem',
          fontWeight: 'bolder',
          marginTop: '1rem',
        }}
      >
        공감한 리뷰
      </h1>
      <ContentRow>
        <ReviewRow>
          {Reviews.map((item, index) => (
            <ReviewItem
              as={motion.div}
              initial={{ x: 200 }}
              animate={{ x: 0 }}
              exit={{ opacity: 1, x: -200 }}
              transition={{ duration: 0.15 }}
              key={index}
            >
              <ReviewThumbnailContainer>
                <ReviewThumbnail src={item.thumbnail} />
                <ReviewVideoTitle>{item.videoTitle}</ReviewVideoTitle>
              </ReviewThumbnailContainer>
              <ReviewUserContainer>
                <ReviewUser>
                  <IoPerson />
                  {item.userName}
                </ReviewUser>
                <ReviewRate>
                  {(function () {
                    const stars = [];
                    for (let i = 0; i < item.rate; i++) {
                      stars.push(<AiFillStar key={'filled' + i} />);
                    }
                    for (let i = 0; i < 5 - item.rate; i++) {
                      stars.push(<AiOutlineStar key={'outlined' + i} />);
                    }
                    return stars;
                  })()}
                </ReviewRate>
              </ReviewUserContainer>
              <ReviewDesc>{item.desc}</ReviewDesc>
              <ReviewItemFooter>
                <ReviewDate>{item.date}</ReviewDate>
                <ReviewLikes>
                  <FaHeart />
                  {item.likes}
                </ReviewLikes>
              </ReviewItemFooter>
            </ReviewItem>
          ))}
        </ReviewRow>
      </ContentRow>
    </Container>
  );
};

export default LikeReview;

// const Reviews = [
//   {
//     thumbnail:
//       "https://i.ytimg.com/vi/J9DlrnNlgfE/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDIl-EjUPHzEQNfXBWWG-r9GjHWCw",
//     videoTitle:
//       "NewJeans(뉴진스) - Super Shy @인기가요 inkigayo 20230716 게시자: 스브스케이팝 X INKIGAYO",
//     userName: "뉴진스짱",
//     rate: 4,
//     desc: "뉴진스도 뉴진스인데 코디랑 헤메가 미쳤다 ..곡이랑 너무 잘어울리고 멤버별로 특색입게 입히면서 통일성 있음. 올드하지 않으면서 세련되게 잘 입히는 듯.",
//     date: "2023.07.27",
//     likes: 146,
//   },
// ];

// ... (스타일링 코드는 동일하게 유지합니다.)

// ... (다른 import 문은 그대로 유지)

// ... (나머지 스타일과 컴포넌트 코드는 그대로 유지)
