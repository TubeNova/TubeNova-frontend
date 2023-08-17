import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { RxTriangleDown } from "react-icons/rx";
import { BsBackspaceFill, BsCheck, BsPlusCircle } from "react-icons/bs";
import { PiBackspace } from "react-icons/pi";
import { IoPerson } from "react-icons/io5";
import CategoryGrid from "../components/CategoryGrid";
import { CategoryGridData } from "../data/CategoryGridData";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  gap: 1.5rem;
  justify-content: center;
`;
const EditorContainer = styled.div`
  width: 55vw;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const VideoContainer = styled.div`
  width: 35vw;
`;
const Box = styled.div`
  background-color: #fff;
  padding: 1rem;
  border-radius: 0.8rem;
  border: 1.2px solid #dfdcfb;
  display: flex;
`;
const CategorySelect = styled(Box)`
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
`;
const CategorySelectDesc = styled.p``;
const CategorySelectIcon = styled.span`
  font-size: 1.3rem;
  color: #9e96e3;
`;
const CategoryModalContainer = styled(Box)`
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: #fff;
  position: relative;
  top: -0.9rem;
  padding: 1rem;
  box-sizing: border-box;
`;
const UrlInputContainer = styled(Box)`
  justify-content: space-between;
  padding: 0;
  overflow: hidden;
`;
const UrlInputText = styled.input`
  width: 80%;
  padding: 1.4rem;
`;
const UrlInputBackspaceLabel = styled.label`
  width: 1.7rem;
  height: 1.7rem;
  margin: 1rem;
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #9e96e3;
  cursor: pointer;
  svg {
    font-size: 1.5rem;
  }
`;
const UrlInputBackspace = styled.input`
  background-color: transparent;
  display: none;
`;

const RecommendPost = styled.div`
  display: flex;
  gap: 1rem;
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
const RecommendDate = styled.p`
  color: #909090;
  font-size: 0.7rem;
`;

const ReviewInputContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const TitleInput = styled.input`
  padding: 1rem 0;
`;
const DescInput = styled.textarea`
  height: 10rem;
  &::placeholder {
    font-size: 0.9rem;
  }
`;
const SubmitButton = styled.input`
  background-color: ${({ theme }) => theme.colors.primary};
  color: #fff;
  padding: 1rem;
  border-radius: 0.5rem;
  font-weight: bold;
  font-size: 0.8rem;
  &:hover {
    filter: grayscale(30%);
    transition: 0.2s;
  }
`;

const Star = styled.span`
  display: inline-block;
  width: 3rem;
  height: 3rem;
  background-color: ${({ selected }) => (selected ? "#f90" : "#ddd")};
  margin: 0.125rem; // 2/16
  clip-path: polygon(
    50% 0%,
    61% 35%,
    98% 35%,
    68% 57%,
    79% 91%,
    50% 70%,
    21% 91%,
    32% 57%,
    2% 35%,
    39% 35%
  );
  cursor: pointer;
`;
const StarWrapper = styled.div`
  margin: 3rem 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Upload = () => {
  const [rating, setRating] = useState(0);
  const [videoUrl, setVideoUrl] = useState("");
  const [videoInfo, setVideoInfo] = useState({});
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState([]);
  const [reviewInfo, setReviewInfo] = useState({});
  const navigate = useNavigate();

  const apiClient = axios.create({
    baseURL: "https://youtube.googleapis.com/youtube/v3",
    params: { key: process.env.REACT_APP_YOUTUBE_API_KEY },
  });

  const getVideoInfo = async (videoId) => {
    try {
      const response = await apiClient.get("videos", {
        params: {
          part: "snippet",
          id: videoId,
        },
      });
      setVideoInfo(response.data.items[0].snippet);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (videoInfo.title !== undefined) {
      setReviewInfo((prev) => {
        return {
          ...prev,
          videoUrl,
          channelName: videoInfo.channelTitle,
          videoTitle: videoInfo.title,
          videoThumbnail: videoInfo.thumbnails.standard.url,
          publishedAt: videoInfo.publishedAt,
        };
      });
    }
  }, [videoInfo]);

  const handleUrlCheck = () => {
    setVideoInfo({});
    let regex = new RegExp(
      "(youtu.*be.*)/(watch?v=|embed/|v|shorts|)(.*?((?=[&#?])|$))"
    );
    let videoId = "";
    if (regex.test(videoUrl)) {
      if (videoUrl.indexOf("/watch?v=") > 0) {
        videoId = videoUrl.split("/watch?v=")[1];
      } else if (videoUrl.indexOf("youtu.be/")) {
        videoId = videoUrl.split("youtu.be/")[1];
      }

      getVideoInfo(videoId);
    } else {
      // console.log("형식에 어긋납니다.");
    }
  };
  useEffect(() => {
    if (category.length === 1) {
      setReviewInfo((prev) => {
        return {
          ...prev,
          category: category[0],
        };
      });
      setCategoryModalOpen(false);
    }
  }, [category]);
  useEffect(() => {
    setReviewInfo((prev) => {
      return {
        ...prev,
        rate: rating,
      };
    });
  }, [rating]);

  const handleSubmit = () => {
    if (
      reviewInfo.videoTitle.length > 0 &&
      reviewInfo.category.length > 0 &&
      reviewInfo.desc.length > 0 &&
      reviewInfo.rate > 0
    ) {
      try {
        axios({
          method: "post",
          url: `https://port-0-tubenova-backend-eu1k2llldkkxjy.sel3.cloudtype.app/auth/signup`,
          headers: {
            "Content-Type": "application/json",
          },
          data: {
           
          },
        }).then((response) => {
          console.log(response);
          alert("업로드되었습니다");
          navigate(`/review/${response.data.id}`);
        });
      } catch (e) {
        console.log(e);
      }
    } else {
      console.log(reviewInfo);
      alert("모두 채워주세요");
    }
  };
  return (
    <Container>
      <EditorContainer>
        <CategorySelect
          onClick={() => {
            setCategory([]);
            setCategoryModalOpen((prev) => {
              return !prev;
            });
          }}
        >
          <CategorySelectDesc>
            {category.length === 1
              ? CategoryGridData.map((item) => {
                  let result = "";
                  if (item.id === category[0]) {
                    result = item.name;
                  }
                  return result;
                })
              : "카테고리 선택"}
          </CategorySelectDesc>
          <CategorySelectIcon>
            <RxTriangleDown />
          </CategorySelectIcon>
        </CategorySelect>
        {categoryModalOpen && (
          <CategoryModalContainer>
            <CategoryGrid
              setCategory={setCategory}
              category={category}
              max={1}
            />
          </CategoryModalContainer>
        )}
        <UrlInputContainer>
          <UrlInputText
            type="text"
            placeholder="동영상 링크를 입력해주세요"
            value={videoUrl}
            onChange={(e) => {
              setVideoUrl(e.target.value);
            }}
            onKeyUp={(e) => {
              handleUrlCheck();
            }}
          />
          {videoUrl.length > 0 && (
            <UrlInputBackspaceLabel>
              <UrlInputBackspace
                type="button"
                onClick={() => {
                  setVideoUrl("");
                  setVideoInfo({});
                }}
              />
              <PiBackspace />
            </UrlInputBackspaceLabel>
          )}
        </UrlInputContainer>
        <ReviewInputContainer>
          <TitleInput
            placeholder="(선택) 제목을 입력해주세요"
            value={reviewInfo.title}
            onChange={(e) => {
              setReviewInfo((prev) => {
                return { ...prev, title: e.target.value };
              });
            }}
          />
          <DescInput
            placeholder="내용을 입력해주세요"
            value={reviewInfo.desc}
            onChange={(e) => {
              setReviewInfo((prev) => {
                return { ...prev, desc: e.target.value };
              });
            }}
          />
        </ReviewInputContainer>
        <StarWrapper>
          <div>
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                selected={rating > i}
                onClick={() => {
                  if (rating === i + 1) {
                    setRating(0); // 별점이 이미 기록되어 있고 해당 별을 다시 클릭하면 별점 초기화
                  } else {
                    setRating(i + 1);
                  }
                }}
              />
            ))}
          </div>
        </StarWrapper>
        <SubmitButton
          type="submit"
          value="업로드"
          onClick={() => {
            handleSubmit();
          }}
        />
      </EditorContainer>
      <VideoContainer>
        {videoInfo.title !== undefined && (
          <RecommendPost>
            <RecommendImgWrapper>
              <RecommendImg src={videoInfo.thumbnails.standard.url} />
            </RecommendImgWrapper>
            <RecommendInfo>
              <RecommendVideoTitle>{videoInfo.title}</RecommendVideoTitle>
              <RecommendUser>
                <IoPerson />
                {videoInfo.channelTitle}
              </RecommendUser>
              <RecommendDate>
                {videoInfo.publishedAt.slice(0, 10).replaceAll("-", ".")}
              </RecommendDate>
            </RecommendInfo>
          </RecommendPost>
        )}
      </VideoContainer>
    </Container>
  );
};

export default Upload;
