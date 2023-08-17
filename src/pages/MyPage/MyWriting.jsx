// import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import MyPageNav from './MyPageNav';
import { Outlet, useRoutes } from 'react-router-dom';
import styled from 'styled-components';
import { IoPerson } from 'react-icons/io5';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { FaHeart } from 'react-icons/fa';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { LoginStateAtom } from '../../atom';

function MyWriting() {
  const { accessToken } = useRecoilValue(LoginStateAtom);
  const [myReviews, setMyReviews] = useState([]);
  const hasChildRoutes = useRoutes([
    { path: 'account', element: <></> },
    { path: 'likereview', element: <></> },
    { path: 'category', element: <></> },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          '/reviews/my',
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setMyReviews(response.data.content);
      } catch (error) {
        console.error('응 에러야~ 다시해봐~', error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <MyPageNav />
      <MyPageContent>
        <Outlet />

        {/* 중첩된 라우트가 활성화되어 있지 않은 경우에만 해당 내용을 렌더링 */}
        {!hasChildRoutes && (
          <>
            <Container>
              <h1
                style={{
                  fontSize: '1.3rem',
                  fontWeight: 'bolder',
                  marginTop: '1rem',
                }}
              >
                내가 올린 리뷰
              </h1>

              <ContentRow>
                {myReviews.length === 0 ? (
                  <p>내가 올린 리뷰가 없어요</p>
                ) : (
                  <ReviewRow>
                    {myReviews.map((item, index) => (
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
                                stars.push(
                                  <AiOutlineStar key={'outlined' + i} />
                                );
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
          </>
        )}
      </MyPageContent>
    </>
  );
}

const MyPageContent = styled.div`
  padding-left: 11rem;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
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

export default MyWriting;
