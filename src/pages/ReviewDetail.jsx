import { styled } from "styled-components";
import { useLocation, useNavigate } from "react-router";
import { IoPerson } from "react-icons/io5";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { BiLink } from "react-icons/bi";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { LoginStateAtom } from "../atom";
import { ReviewRecommendData } from "../data/ReviewDetailData";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  ${({ theme }) => theme.media.mobile} {
    flex-direction: column;
    padding: 0 0.5rem;
    align-items: center;
    gap: 4rem;
  }
`;

const Contents = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 65vw;
  ${({ theme }) => theme.media.mobile} {
    width: 100%;
  }
`;

const CategoryInfo = styled.p`
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
`;

const VideoContainer = styled.div`
  display: flex;
  gap: 1rem;
  ${({ theme }) => theme.media.mobile} {
    flex-direction: column;
  }
`;
const VideoImg = styled.img`
  width: 25rem;
  border-radius: 1rem;
  ${({ theme }) => theme.media.mobile} {
    width: 100%;
  }
`;
const VideoInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 1rem 0;
`;
const VideoTitle = styled.strong`
  font-size: 1.2rem;
  font-weight: bold;
  line-height: 1.4;
  svg {
    cursor: pointer;
    color: ${({ theme }) => theme.colors.primary};
    position: relative;
    top: 0.1rem;
  }
`;

const VideoTags = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const VideoTagRow = styled.div`
  display: flex;
  gap: 0.6rem;
  font-size: 1rem;
  align-items: center;
`;

const VideoTagName = styled.span`
  background-color: ${({ theme }) => theme.colors.primary};
  border-radius: 0.4rem;
  color: #fff;
  padding: 0.3rem 0.5rem;
`;

const VideoTagDesc = styled.span`
  color: #6f6f6f;
`;

const ReviewContainer = styled.section`
  display: flex;
  flex-direction: column;
`;
const ReviewUserContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 1rem;
`;
const ReviewUserIcon = styled.div`
  svg {
    font-size: 3rem;
    color: #fff;
    background-color: #d9d9d9;
    border-radius: 100%;
    padding: 0.5rem;
  }
`;
const ReviewUserAndRate = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const ReviewUserName = styled.p``;
const ReviewUserRate = styled.p`
  color: #f90;
  font-size: 1.2rem;
`;

const ReviewDescContainer = styled.div`
  background-color: #fbfaff;
  border-radius: 0 1.2rem 1.2rem 1.2rem;
  padding: 2rem;
  box-shadow: 0 1px 1px 1px rgba(82, 82, 82, 0.1);
  display: flex;
  gap: 1rem;
  flex-direction: column;
`;
const ReviewTitle = styled.p`
  font-weight: bold;
  font-size: 1.2rem;
`;
const ReviewDesc = styled.div`
  line-height: 1.7;
  font-size: 1rem;
`;
const LikeContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;
const LikeButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem;
  width: 5rem;
  height: 5rem;
  border-radius: 1.2rem;
  background: #fff;
  box-shadow: 0px 2px 2px 1px rgba(0, 0, 0, 0.14);
  gap: 0.5rem;
  font-size: 0.9rem;
  ${({ active }) => active} {
    transition: 0.2s;
    background-color: #d35757;
    color: #fff;
    svg {
      color: #fff;
    }
  }
  &:hover {
    transition: 0.2s;
    background-color: #d35757;
    color: #fff;
    svg {
      color: #fff;
    }
  }
  &:not(hover) {
    transition: 0.2s;
    background-color: #fff;
    color: #000;
    svg {
      color: #d35757;
    }
  }
  svg {
    font-size: 1.5rem;
    color: #d35757;
  }
`;
const RecommendContainer = styled.section`
  width: 25vw;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  ${({ theme }) => theme.media.mobile} {
    width: 100%;
    gap: 2rem;
  }
`;
const RecommendTitle = styled.p`
  font-weight: bold;
  font-size: 1.2rem;
`;

const RecommendList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  ${({ theme }) => theme.media.mobile} {
    gap: 2rem;
  }
`;
const RecommendPost = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  cursor: pointer;
  &:hover img {
    transform: scale(110%);
    transition: 0.3s;
  }
  &:not(hover) img {
    transform: scale(100%);
    transition: 0.3s;
  }
`;
const RecommendHeader = styled.div`
  display: flex;
  gap: 1rem;
  width: 100%;
`;

const RecommendImgWrapper = styled.div`
  width: 20rem;
  overflow: hidden;
  border-radius: 1rem;
  width: 45%;
`;
const RecommendImg = styled.img`
  width: 100%;
`;
const RecommendInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  justify-content: center;
  width: 55%;
  color: #5a5a5a;
  line-height: 1.3;
  font-size: 0.9rem;
`;
const RecommendVideoTitle = styled.p`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
`;
const RecommendRate = styled.span`
  color: #f90;
`;
const RecommendUser = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.8rem;
  svg {
    font-size: 1.2rem;
    color: #fff;
    background-color: #d9d9d9;
    border-radius: 100%;
    padding: 0.1rem;
  }
`;
const RecommendDesc = styled.p`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  font-size: 0.9rem;
  line-height: 1.3;
  color: #333;
`;
const RecommendFooter = styled.div`
  display: flex;
  justify-content: space-between;
`;
const RecommendDate = styled.p`
  color: #909090;
  font-size: 0.7rem;
`;
const RecommendLikes = styled.p`
  font-size: 0.7rem;
  display: flex;
  align-items: center;
  svg {
    color: #d35757;
    margin-right: 0.4rem;
  }
`;

export default function ReviewDetail() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [post, setPost] = useState();
  const postId = pathname.split("/review/")[1];
  const { accessToken } = useRecoilValue(LoginStateAtom);
  const [category, setCategory] = useState("");
  const [recommendPosts, setRecommendPosts] = useState();

  const getReviewDetail = async () => {
    await axios({
      mehtod: "get",
      url: `/reviews/${postId}`,
    }).then((response) => {
      console.log(response);
      setPost(response.data);
      setCategory(response.data.category)
    });
  };

  const postLikes = async () => {
    await axios({
      method: "post",
      url: "/likes",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`
      },
      data: {
        reviewId: Number(postId),
      },
    }).then((response) => {
      console.log(response);
    });
  };

  const getReviewByCategory = async (categoryName) => {
    await axios({
      method: "get",
      url: `/reviews/${categoryName}/likes`,
    }).then((response)=>{
      console.log(response.data.content)
      setRecommendPosts(response.data.content)
    })
  }

  useEffect(() => {
    getReviewDetail();
    if (category !== ""){
      getReviewByCategory(category)
    }
  }, [category]);
  return (
    <Container>
      <Contents>
        <CategoryInfo>
          카테고리 {">"} {post?.category}
        </CategoryInfo>
        <VideoContainer>
          <VideoImg src={post?.videoImageUrl} />
          <VideoInfo>
            <VideoTitle>
              {post?.videoTitle}{" "}
              <BiLink
                onClick={() => {
                  window.open(post?.linkURL, "_blank");
                }}
              />
            </VideoTitle>
            <VideoTags>
              <VideoTagRow>
                <VideoTagName>채널</VideoTagName>
                <VideoTagDesc>{post?.channel}</VideoTagDesc>
              </VideoTagRow>
              <VideoTagRow>
                <VideoTagName>날짜</VideoTagName>
                <VideoTagDesc>
                  {post?.videoDate.slice(0, 10).replaceAll("-", ".")}
                </VideoTagDesc>
              </VideoTagRow>
              {/* <VideoTagRow>
                <VideoTagName>조회수</VideoTagName>
                <VideoTagDesc>{post?.videoViews}</VideoTagDesc>
              </VideoTagRow> */}
            </VideoTags>
          </VideoInfo>
        </VideoContainer>
        <ReviewContainer>
          <ReviewUserContainer>
            <ReviewUserIcon onClick={()=>{navigate(`/user/${post?.member_id}`)}}>
              <IoPerson />
            </ReviewUserIcon>
            <ReviewUserAndRate>
              <ReviewUserName onClick={()=>{navigate(`/user/${post?.member_id}`)}}>{post?.writer}</ReviewUserName>
              <ReviewUserRate>
                {(function () {
                  const stars = [];
                  for (let i = 0; i < post?.rating; i++) {
                    stars.push(<AiFillStar />);
                  }
                  for (let i = 0; i < 5 - post?.rating; i++) {
                    stars.push(<AiOutlineStar />);
                  }
                  return stars;
                })()}
              </ReviewUserRate>
            </ReviewUserAndRate>
          </ReviewUserContainer>
          <ReviewDescContainer>
            <ReviewTitle>{post?.title}</ReviewTitle>
            <ReviewDesc>{post?.contents}</ReviewDesc>
          </ReviewDescContainer>
        </ReviewContainer>
        <LikeContainer>
          <LikeButton
            active={post?.memberLikes}
            onClick={() => {
              postLikes();
            }}
          >
            <FaHeart />
            {post?.likes}
          </LikeButton>
        </LikeContainer>
      </Contents>
      <RecommendContainer>
        <RecommendTitle>추천 리뷰 ✨</RecommendTitle>
        <RecommendList>
          {recommendPosts?.map((item) => {
            return (
              <RecommendPost
                key={item.id}
                onClick={() => {
                  navigate(`/review/${item.id}`);
                }}
              >
                <RecommendHeader>
                  <RecommendImgWrapper>
                    <RecommendImg src={item.videoImageUrl} />
                  </RecommendImgWrapper>
                  <RecommendInfo>
                    <RecommendVideoTitle>
                      {item.videoTitle}
                    </RecommendVideoTitle>
                    <RecommendRate>
                      {(function () {
                        const stars = [];
                        for (let i = 0; i < item.rating; i++) {
                          stars.push(<AiFillStar />);
                        }
                        for (let i = 0; i < 5 - item.rating; i++) {
                          stars.push(<AiOutlineStar />);
                        }
                        return stars;
                      })()}
                    </RecommendRate>
                    <RecommendUser>
                      <IoPerson />
                      {item.writer}
                    </RecommendUser>
                  </RecommendInfo>
                </RecommendHeader>

                <RecommendDesc>{item.title}?{item.title}:{item.contents}</RecommendDesc>
                <RecommendFooter>
                  <RecommendDate>{item.reviewCreatedTime.slice(0,10).replaceAll("-",".")}</RecommendDate>
                  <RecommendLikes>
                    <FaHeart />
                    {item.recommendLikes}
                  </RecommendLikes>
                </RecommendFooter>
              </RecommendPost>
            );
          })}
        </RecommendList>
      </RecommendContainer>
    </Container>
  );
}
