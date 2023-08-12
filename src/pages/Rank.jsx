import { Link } from "react-router-dom";
import { styled } from "styled-components";
import { FiChevronRight } from "react-icons/fi";
import { IoPerson } from "react-icons/io5";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;
const ContentRow = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 0.5rem;
`;
const ContentRowHeader = styled.div`
  display: flex;
  align-items: end;
  gap: 0.8rem;
`;
const ContentRowTitle = styled.h1`
  font-weight: bold;
  font-size: 1.3rem;
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
const ReviewItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 20rem;
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

const BasicCategoryList = [
  { name: "전체" },
  { name: "엔터테인먼트" },
  { name: "음악 · 댄스" },
  { name: "뷰티 · 패션" },
  { name: "게임" },
];

const handleCategoryClick = (e) => {
  const target = e.target;
  const parent = e.target.parentElement
 console.log(target)
  if (Array.from(target.classList).indexOf("active") < 0) {
    Array.from(parent.getElementsByClassName("active")).forEach((item) => {
        item.classList.remove("active")
    })
      target.classList.add("active");
  } else {
  }
};

export default function Rank() {
  return (
    <Container>
      <ContentRow>
        <ContentRowHeader>
          <ContentRowTitle>인기 Top 10</ContentRowTitle>
          <ContentRowMore>
            더보기 <FiChevronRight />
          </ContentRowMore>
        </ContentRowHeader>
        <ContentCategoryList>
          {BasicCategoryList.map((item) => {
            return (
              <ContentCategoryItem
                onClick={(e) => {
                  handleCategoryClick(e);
                }}
              >
                {item.name}
              </ContentCategoryItem>
            );
          })}
        </ContentCategoryList>
        {Reviews.map((item) => {
          return (
            <ReviewItem>
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
                      stars.push(<AiFillStar />);
                    }
                    for (let i = 0; i < 5 - item.rate; i++) {
                      stars.push(<AiOutlineStar />);
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
          );
        })}
      </ContentRow>
    </Container>
  );
}
const Reviews = [
  {
    thumbnail:
      "https://i.ytimg.com/vi/J9DlrnNlgfE/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLDIl-EjUPHzEQNfXBWWG-r9GjHWCw",
    videoTitle:
      "NewJeans(뉴진스) - Super Shy @인기가요 inkigayo 20230716 게시자: 스브스케이팝 X INKIGAYO",
    userName: "뉴진스짱",
    rate: 4,
    desc: "뉴진스도 뉴진스인데 코디랑 헤메가 미쳤다 ..곡이랑 너무 잘어울리고 멤버별로 특색입게 입히면서 통일성 있음. 올드하지 않으면서 세련되게 잘 입히는 듯.",
    date: "2023.07.27",
    likes: 146,
  },
];
