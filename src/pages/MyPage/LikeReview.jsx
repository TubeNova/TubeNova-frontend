// import { Link } from 'react-router-dom';
import { styled } from 'styled-components';
import { IoPerson } from 'react-icons/io5';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { FaHeart } from 'react-icons/fa';
// import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { LoginStateAtom } from '../../atom';

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 4rem;
  min-height: 100vh;
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
  width: calc((100% - 3.6rem) / 4);
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
// const ReviewDesc = styled.p`
//   font-size: 0.8rem;
//   line-height: 1.3;
//   display: -webkit-box;
//   -webkit-box-orient: vertical;
//   -webkit-line-clamp: 3;
//   overflow: hidden;
// `;
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
  const [likeReviews, setLikeReviews] = useState([]);
  const { accessToken } = useRecoilValue(LoginStateAtom);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('백엔드api 주소 파트', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setLikeReviews(response.data.content);
      } catch (error) {
        console.error('응 에러야~ 다시해~', error);
      }
    };

    fetchData();
  }, []);

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
        {likeReviews.length === 0 ? (
          <p>좋아요를 누른 리뷰가 없어요</p>
        ) : (
          <ReviewRow>
            {likeReviews.map((item, index) => (
              <ReviewItem key={index}>
                <ReviewThumbnailContainer>
                  <ReviewThumbnail src={item.linkURL} />
                  <ReviewVideoTitle>{item.title}</ReviewVideoTitle>
                </ReviewThumbnailContainer>
                <ReviewUserContainer>
                  <ReviewUser>
                    <IoPerson />
                    {item.writer}
                  </ReviewUser>
                  <ReviewRate>
                    {(function () {
                      const stars = [];
                      for (let i = 0; i < item.rating; i++) {
                        stars.push(<AiFillStar key={'filled' + i} />);
                      }
                      for (let i = 0; i < 5 - item.rating; i++) {
                        stars.push(<AiOutlineStar key={'outlined' + i} />);
                      }
                      return stars;
                    })()}
                  </ReviewRate>
                </ReviewUserContainer>
                {/* <ReviewDesc>{item.desc}</ReviewDesc> */}
                <ReviewItemFooter>
                  <ReviewDate>{item.reviewCreatedTime}</ReviewDate>
                  <ReviewLikes>
                    <FaHeart />
                    {item.likes}
                  </ReviewLikes>
                </ReviewItemFooter>
              </ReviewItem>
            ))}
          </ReviewRow>
        )}
      </ContentRow>
    </Container>
  );
};

export default LikeReview;
