import { useEffect } from "react"
import { useLocation, useNavigate } from "react-router"
import { styled } from "styled-components"
import { CategoryReviewData, CategoryReviewsData } from "../data/CategoryReviewData";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { IoPerson } from "react-icons/io5";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { useWindowSize } from "../hook/useWindow";
import { CategoryGridData } from "../data/CategoryGridData";

const Container = styled.div``
const Title= styled.h1`
    margin: 10px 0 20px 0;
    font-size: 18px;
    font-weight: bold;
`

const ReviewGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, calc((100% - 3.6rem) / 4));
  overflow: hidden;
  column-gap: 1.2rem;
  row-gap: 30px;
  ${({ theme }) => theme.media.mobile} {
    column-gap: 0.8rem;
  }
  ${({ theme }) => theme.media.mobile} {
    grid-template-columns: repeat(2, calc((100% - 0.8em) / 2));
  }
`

const ReviewItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;
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
const ReviewThumbnailContainer = styled.div`
  display: flex;
  border-radius: 1rem;
  overflow: hidden;
  width: 100%;
  flex-direction: column;
  height: fit-content;
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
  z-index: 1;
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
  display: flex;
  align-items: center;
  ${({theme}) => theme.media.mobile} {
    font-size: 0.8rem;
  }
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
export default function CategoryReviewList () {
    const {pathname} = useLocation()
    const navigate = useNavigate()
    const categoryName = pathname.split("/category/")[1]
    

    return (
        <Container>
            <Title>{CategoryGridData.map((item) => {
                  let result = "";
                  if (item.id === categoryName) {
                    result = item.name + item.icon;
                  }
                  return result;
                })}</Title>
        <ReviewGrid>
            {CategoryReviewData.map((item, index)=>{return(
                <ReviewItem
                key={index}
                onClick={() => {
                  navigate(`/review/${item.id}`);
                }}
              >
                <ReviewThumbnailContainer>
                  <ReviewThumbnail src={item.videoImageUrl} />
                  <ReviewVideoTitle>{item.videoTitle}</ReviewVideoTitle>
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
                        stars.push(<AiFillStar />);
                      }
                      for (let i = 0; i < 5 - item.rating; i++) {
                        stars.push(<AiOutlineStar />);
                      }
                      return stars;
                    })()}
                  </ReviewRate>
                </ReviewUserContainer>
                <ReviewDesc>{item.contents}</ReviewDesc>
                <ReviewItemFooter>
                  <ReviewDate>{item.reviewCreatedTime.slice(0,10).replaceAll("-",".")}</ReviewDate>
                  <ReviewLikes>
                    <FaHeart />
                    {item.likes}
                  </ReviewLikes>
                </ReviewItemFooter>
              </ReviewItem>
            )})}
        </ReviewGrid>
        </Container>

    )
}