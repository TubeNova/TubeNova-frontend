import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { IoPerson } from "react-icons/io5";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Reviews } from "../data/Reviews";
import emptyImage from "../static/empty.png";
import { useWindowSize } from "../hook/useWindow";
import axios from "axios";

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 1rem;
`;

const ContentRowHeader = styled.div`
  display: flex;
  align-items: end;
  gap: 0.8rem;
`;
const ContentRowTitle = styled.h1`
  font-weight: bold;
  font-size: 1.3rem;
  ${({ theme }) => theme.media.mobile} {
    font-size: 1.1rem;
  }
`;
const ContentRowMore = styled(Link)`
  font-size: 0.7rem;
  color: ${({ theme }) => theme.colors.primary};
  font-weight: bold;
`;
const ContentCategoryList = styled.ul`
  display: flex;
  gap: 0.3rem;
`;
const ContentCategoryItem = styled.li`
  width: fit-content;
  background-color: #fff;
  color: ${({ theme }) => theme.colors.primary};
  border-radius: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  font-size: 0.8rem;
  padding: 0.3rem 0.5rem;
  cursor: pointer;
  &.active {
    color: #fff;
    background-color: ${({ theme }) => theme.colors.primary};
  }
`;
const CarouselButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 5rem;
  position: absolute;
  left: 1rem;
  width: calc(100% - 2rem);

  ${({ theme }) => theme.media.mobile} {
    left: 0.2rem;
    width: calc(100% - 0.4rem);
    margin-top: 3rem;
  }
`;

const CarouselPreviousButton = styled.button`
  font-size: 1.4rem;
  background-color: #f9f9f9;
  border-radius: 100%;
  width: 1.6rem;
  height: 1.6rem;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0.5px 0.5px 0.5px rgba(0, 0, 0, 0.1);
  color: #525252;
  z-index: 2;
`;

const CarouselNextButton = styled(CarouselPreviousButton)`
  left: initial;
`;

const ReviewRow = styled.div`
  width: 100%;
  display: flex;
  overflow: hidden;
  gap: 1.2rem;
  ${({ theme }) => theme.media.mobile} {
    gap: 0.8rem;
  }
`;

const ReviewItem = styled.div`
  display: flex;
  flex-direction: column;
  width: calc((100% - 3.6rem) / 4);
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
  ${({ theme }) => theme.media.mobile} {
    width: calc((100% - 0.8rem) / 2);
  }
`;
const ReviewThumbnailContainer = styled.div`
  display: flex;
  border-radius: 1rem;
  overflow: hidden;
  width: 100%;
  flex-direction: column;
  background-image: url(${emptyImage});
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
  ${({ theme }) => theme.media.mobile} {
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
  strong {
    color: ${({theme}) => theme.colors.primary};
    margin-right: 2px;
  }
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

export default function MainContentsRow({ contentsTitle, userLikes, data }) {
  const [initialAnimation, setInitialAnimation] = useState(false);
  const [carouselData, setCarouselData] = useState();
  const [rankVisible, setRankVisible] = useState(0);
  const [rankBack, setRankBack] = useState(false);
  const [visibleNumber, setVisibleNumber] = useState(4);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategoryReview, setSelectedCategoryReview] = useState();
  const navigate = useNavigate();
  const windowSize = useWindowSize();

  const getReviewByCategoryOrderByLikes = async (categoryName) => {
    await axios({
      method: "get",
      url: `/reviews/${categoryName}/likes`,
    }).then((response) => {
      console.log(response.data.content);
      setTimeout(()=>{
        setCarouselData(response.data.content)
      },500)
    });
  };

  const getReviewByCategoryOrderById = async (categoryName) => {
    await axios({
      method: "get",
      url: `/reviews/${categoryName}/id`,
    }).then((response) => {
      console.log(response.data.content);
      setTimeout(()=>{
        setCarouselData(response.data.content)
      },500)
    });
  };


  const getAllReviewOrderByLikes = async () => {
    await axios({
      method: "get",
      url: `/reviews/weekly-popularity`,
    }).then((response) => {
      console.log(response.data);
      setTimeout(()=>{
        setCarouselData(response.data)
      },500)
    });
  };

  const getAllReviewOrderById = async () => {
    await axios({
      method: "get",
      url: `/reviews/latest`,
    }).then((response) => {
      console.log(response.data);
      setTimeout(()=>{
        setCarouselData(response.data.content)
      },500)
    });
  };

  // useEffect(() => {
  //   getAllReviewOrderById()
  // }, []);
  
  useEffect(() => {
    if (windowSize.width <= 768) {
      setVisibleNumber(2);
    } else {
      setVisibleNumber(4);
    }
  }, [windowSize]);

  useEffect(() => {
    rankVisible === 0 && setRankBack(false);
    rankVisible + visibleNumber >= Reviews.length && setRankBack(true);
  }, [rankVisible]);

  const BasicCategoryList = [
    { name: "전체", id: "ALL" },
    { name: "엔터테인먼트", id: "ENTERTAINMENT" },
    { name: "음악 · 댄스", id: "MUSICNDANCE" },
    { name: "뷰티 · 패션", id: "BEAUTYNFASHION" },
    { name: "게임", id: "GAME" },
  ];

  const UserLikesCategoryList = [
    { name: "엔터테인먼트" },
    { name: "음악 · 댄스" },
    { name: "뷰티 · 패션" },
  ];

  const ReviewContents = ({ item, index }) => {
    return (
      <AnimatePresence mode="wait" initial={initialAnimation}>
        <ReviewItem
          as={motion.div}
          initial={{ x: rankBack ? -200 : 200 }}
          animate={{ x: 0 }}
          exit={{ opacity: 1, x: rankBack ? 200 : -200 }}
          transition={{ duration: 0.15 }}
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
          <ReviewDesc><strong>{item.title}</strong>{item.contents}</ReviewDesc>
          <ReviewItemFooter>
            <ReviewDate>
              {item.reviewCreatedTime.slice(0, 10).replaceAll("-", ".")}
            </ReviewDate>
            <ReviewLikes>
              <FaHeart />
              {item.likes}
            </ReviewLikes>
          </ReviewItemFooter>
        </ReviewItem>
      </AnimatePresence>
    );
  };

  const handleCategoryClick = (e) => {
    const target = e.target;
    const parent = e.target.parentElement;
    if (Array.from(target.classList).indexOf("active") < 0) {
      Array.from(parent.getElementsByClassName("active")).forEach((item) => {
        item.classList.remove("active");
      });
      target.classList.add("active");
      if (target.id === "ALL") {
        if (contentsTitle === "인기 Top 10") {
          getAllReviewOrderByLikes()
        } else {
          getAllReviewOrderById()
        }
      } else {
        if (contentsTitle === "인기 Top 10") {

          getReviewByCategoryOrderByLikes(target.id);
        } else{
          getReviewByCategoryOrderById(target.id);

        }

      }
    }
  };


  
  useEffect(()=>{
    setTimeout(()=>{
      setCarouselData(data)
    },100)
  },[data])
  return (
    <Container>
      <ContentRowHeader>
        <ContentRowTitle>{contentsTitle}</ContentRowTitle>
        <ContentRowMore to="/rank">
          더보기 <FiChevronRight />
        </ContentRowMore>
      </ContentRowHeader>
      {userLikes ? (
        UserLikesCategoryList.map((item) => {
          return (
            <>
              <ContentCategoryList>
                <ContentCategoryItem
                  className={[item.name === "전체" && "active", item.id]}
                  onClick={(e) => {
                    handleCategoryClick(e);
                  }}
                >
                  {item.name}
                </ContentCategoryItem>
              </ContentCategoryList>
              <ReviewRow>
                <CarouselButtonContainer>
                  <CarouselPreviousButton
                    onClick={() => {
                      setInitialAnimation(true);
                      setRankBack(true);
                      setRankVisible((prev) =>
                        prev === 0 ? 0 : prev - visibleNumber
                      );
                    }}
                  >
                    <FiChevronLeft />
                  </CarouselPreviousButton>
                  <CarouselNextButton
                    onClick={() => {
                      setInitialAnimation(true);
                      setRankBack(false);
                      setRankVisible((prev) =>
                        prev + 4 >= Reviews.length ? prev : prev + visibleNumber
                      );
                    }}
                  >
                    <FiChevronRight />
                  </CarouselNextButton>
                </CarouselButtonContainer>
                {Reviews.map((item, index) => {
                  return (index >= rankVisible) &
                    (index <= rankVisible + visibleNumber - 1)
                    ? ReviewContents({ item, index })
                    : null;
                })}
              </ReviewRow>
            </>
          );
        })
      ) : (
        <>
          <ContentCategoryList>
            {BasicCategoryList.map((item) => {
              return (
                <ContentCategoryItem
                  id={item.id}
                  className={item.name === "전체" && "active"}
                  onClick={(e) => {
                    handleCategoryClick(e);
                  }}
                >
                  {item.name}
                </ContentCategoryItem>
              );
            })}
          </ContentCategoryList>

          <ReviewRow>
            <CarouselButtonContainer>
              <CarouselPreviousButton
                onClick={() => {
                  setInitialAnimation(true);
                  setRankBack(true);
                  setRankVisible((prev) =>
                    prev === 0 ? 0 : prev - visibleNumber
                  );
                }}
              >
                <FiChevronLeft />
              </CarouselPreviousButton>
              <CarouselNextButton
                onClick={() => {
                  setInitialAnimation(true);
                  setRankBack(false);
                  setRankVisible((prev) =>
                    prev + 4 >= Reviews.length ? prev : prev + visibleNumber
                  );
                }}
              >
                <FiChevronRight />
              </CarouselNextButton>
            </CarouselButtonContainer>
            {(carouselData !== undefined) && (
              carouselData?.map((item, index) => {
                return (index >= rankVisible) &
                  (index <= rankVisible + visibleNumber - 1)
                  ? ReviewContents({ item, index })
                  : null;
              })
            )}
          </ReviewRow>
        </>
      )}
    </Container>
  );
}
