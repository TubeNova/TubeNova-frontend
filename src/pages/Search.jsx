import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { styled } from "styled-components";
import { Reviews } from "../data/Reviews";
import { IoPerson } from "react-icons/io5";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";

const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 10px 0;
`;
const SearchTitle = styled.h1`
  font-size: 16px;
  font-weight: bold;
  span {
    font-weight: normal;
    background-color: ${({ theme }) => theme.colors.primary};
    color: #fff;
    border-radius: 8px;
    padding: 4px 6px;
    margin-right: 3px;
    font-size: 16px;
  }
`;
const ReviewsContainer = styled.section`
  display: flex;
  flex-direction: column;
`;
const Tab = styled.nav`
  border-bottom: 1.2px solid ${({ theme }) => theme.colors.primary};
  padding-bottom: 12px;
  padding-left: 10px;
  font-size: 20px;
  font-weight: bold;
`;
const ReviewResultList = styled.ul`
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
const Header = styled.div`
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
const UserName = styled.span`
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
export default function Search() {
  const location = useLocation();
  const navigate = useNavigate();
  const searchTitle = decodeURIComponent(location.search.split("?keyword=")[1]);

  useEffect(() => {
    console.log();
  }, [searchTitle]);

  return (
    <Container>
      <SearchTitle>
        <span>{searchTitle}</span>에 대한 검색결과
      </SearchTitle>
      <ReviewsContainer>
        <Tab>리뷰</Tab>
        <ReviewResultList>
          {Reviews.map((item) => {
            return (
              <ReviewResultItem
                key={item.id}
                onClick={() => {
                  navigate(`/review/${item.id}`);
                }}
              >
                <ReviewImgContainer>
                  <ReviewThumbnail src={item.thumbnail} />
                  <RevieVideoTitle>{item.videoTitle}</RevieVideoTitle>
                </ReviewImgContainer>
                <ReviewTextContainer>
                  <Header>
                    <ReviewUserContainer>
                      <UserIcon>
                        <IoPerson />
                      </UserIcon>
                      <NameAndRate>
                        <UserName>{item.userName}</UserName>
                        <Rate>
                          {(function () {
                            const stars = [];
                            for (let i = 0; i < item.rate; i++) {
                              stars.push(<AiFillStar />);
                            }
                            for (let i = 0; i < 5 - item.rate; i++) {
                              stars.push(<AiOutlineStar />);
                            }
                            return stars;
                          })()}
                        </Rate>
                      </NameAndRate>
                    </ReviewUserContainer>
                    <DescContainer>
                      <Desc>{item.desc}</Desc>
                    </DescContainer>
                  </Header>
                  <Footer>
                    <Date>{item.date}</Date>
                    <Likes>
                      <FaHeart />
                      {item.likes}
                    </Likes>
                  </Footer>
                </ReviewTextContainer>
              </ReviewResultItem>
            );
          })}
        </ReviewResultList>
      </ReviewsContainer>
    </Container>
  );
}
