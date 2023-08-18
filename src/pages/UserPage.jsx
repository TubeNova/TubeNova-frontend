import { IoPerson } from "react-icons/io5";
import { styled } from "styled-components";
import { CategoryReviewData } from "../data/CategoryReviewData";
import { useLocation, useNavigate } from "react-router";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import { CategoryGridData } from "../data/CategoryGridData";

const Wrapper = styled.section`
  display: flex;
  width: 100%;
  justify-content: center;
`;
const Container = styled.section`
  width: calc(100% - 10px);
  display: flex;
  background-color: #fff;
  padding: 20px;
  box-sizing: border-box;
  box-shadow: 0 2px 2px 2px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  min-height: 40vh;
  flex-direction: column;
  ${({ theme }) => theme.media.desktop} {
    width: 50vw;
  }
  ${({ theme }) => theme.media.tablet} {
    width: 80vw;
  }
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding-bottom: 10px;
  border-bottom: 2px solid #ececec;
`;
const Profile = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 10px;
`;
const ProfileIcon = styled.div`
  display: flex;
  align-items: center;
  svg {
    font-size: 50px;
    color: #fff;
    background-color: #d9d9d9;
    border-radius: 100%;
    padding: 3px;
  }
`;
const UserName = styled.p`
  font-size: 20px;
  font-weight: bold;
  color: #333;
`;
const Follow = styled.button`
  background-color: ${({ theme }) => theme.colors.primary};
  color: #fff;
  height: fit-content;
  width: 70px;
  padding: 5px 0;
  border-radius: 5px;
`;
const Contents = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 15px 5px;
`;
const ReviewResultItem = styled.li`
  display: flex;
  gap: 10px;
  cursor: pointer;
  transition: 0.3s;
  &:hover img {
    transform: scale(110%);
    transition: 0.3s;
  }
  &:not(hover) img {
    transform: scale(100%);
    transition: 0.3s;
  }
`;
const ReviewImgContainer = styled.div`
  width: 240px;
  height: 180px;
  border-radius: 10px;
  overflow: hidden;
  ${({ theme }) => theme.media.mobile} {
    width: 120px;
    height: 90px;
  }
`;
const ReviewThumbnail = styled.img`
  width: 240px;
  height: 180px;
  ${({ theme }) => theme.media.mobile} {
    width: 120px;
    height: 90px;
  }
`;
const RevieVideoTitle = styled.p`
  width: 240px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 11px;
  position: absolute;
  margin-top: -24px;
  box-sizing: border-box;
  background-color: #f1f1f1d8;
  padding: 5px;
  border-radius: 0 0 10px 10px;
  ${({ theme }) => theme.media.mobile} {
    display: none;
  }
`;
const ReviewTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 40vw);
  gap: 10px;
  justify-content: space-around;
  ${({ theme }) => theme.media.mobile} {
    gap: 5px;
    width: 100%;
  }
`;
const ReviewHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  ${({ theme }) => theme.media.mobile} {
    gap: 3px;
  }
`;
const ReviewUserContainer = styled.div`
  display: flex;
  gap: 4px;
`;
const UserIcon = styled.span`
  background-color: #d7d7d7;
  border-radius: 100%;
  padding: 2px;
  color: #fff;
  width: 30px;
  height: 30px;
  font-size: 25px;
  align-items: center;
  display: flex;
  justify-content: center;
  ${({ theme }) => theme.media.mobile} {
    display: none;
  }
`;
const NameAndRate = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
  ${({ theme }) => theme.media.mobile} {
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
  }
`;
const ReviewUserName = styled.span`
  font-size: 12px;
  ${({ theme }) => theme.media.mobile} {
    background-color: #eee;
    padding: 1px 2px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const Rate = styled.span`
  color: #f90;
`;
const DescContainer = styled.div``;
const Desc = styled.p`
  line-height: 1.4;
  font-size: 14px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  ${({ theme }) => theme.media.mobile} {
    font-size: 12px;
  }
`;
const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  align-items: center;
  ${({ theme }) => theme.media.mobile} {
    font-size: 10px;
  }
`;
const Likes = styled.span`
  display: flex;
  align-items: center;
  svg {
    color: #d35757;
    margin-right: 2px;
  }
`;
const Date = styled.span``;
const data = {
  userName: "사용자",
};

export default function UserPage() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const userId = pathname.split("/user/")[1];
  const [userReviewList, setUserReviewList] = useState();

  const getUserReview = async (id) => {
    await axios({
      method: "get",
      url: `reviews/member/${id}`,
    }).then((response) => {
      console.log(response.data.content);
      setUserReviewList(response.data.content);
    });
  };

  useEffect(() => {
    getUserReview(userId);
  }, []);
  return (
    <Wrapper>
      <Container>
        <Header>
          <Profile>
            <ProfileIcon>
              <IoPerson />
            </ProfileIcon>
            <UserName>{data.userName}</UserName>
          </Profile>
          <Follow>구독</Follow>
        </Header>
        <Contents>
          {userReviewList?.map((item) => {
            return (
              <ReviewResultItem
                key={item.id}
                onClick={() => {
                  navigate(`/review/${item.id}`);
                }}
              >
                <ReviewImgContainer>
                  <ReviewThumbnail src={item.videoImageUrl} />
                  <RevieVideoTitle>{item.videoTitle}</RevieVideoTitle>
                </ReviewImgContainer>
                <ReviewTextContainer>
                  <ReviewHeader>
                    <ReviewUserContainer>
                      <UserIcon>
                        <IoPerson />
                      </UserIcon>
                      <NameAndRate>
                        <ReviewUserName>
                          {CategoryGridData.map((category) => {
                            let result = "";
                            if (category.id === item.category) {
                              result = category.name;
                            }
                            return result;
                          })}
                        </ReviewUserName>
                        <Rate>
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
                        </Rate>
                      </NameAndRate>
                    </ReviewUserContainer>
                    <DescContainer>
                      <Desc>{item.contents}</Desc>
                    </DescContainer>
                  </ReviewHeader>
                  <Footer>
                    <Date>
                      {item.reviewCreatedTime.slice(0, 10).replaceAll("-", ".")}
                    </Date>
                    <Likes>
                      <FaHeart />
                      {item.likes}
                    </Likes>
                  </Footer>
                </ReviewTextContainer>
              </ReviewResultItem>
            );
          })}
        </Contents>
      </Container>
    </Wrapper>
  );
}
