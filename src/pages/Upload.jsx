import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const categories = [
  '라이프 스타일',
  '음악/댄스',
  '뷰티/패션',
  '영화/애니',
  '키즈',
  '게임',
  '여행/아웃도어',
  '스포츠/헬스',
  '뉴스/정치/이슈',
  '정부/기관/비영리',
  '엔터테인먼트',
  '푸드/쿠킹',
  '인물/유명인',
  'IT/기술/과학',
  '동물/펫',
  '차/배/바이크',
  '경제/금융/제태크',
  '취미',
  '교육/강의',
  '미분류',
];

const Upload = () => {
  const [category, setCategory] = useState(null);
  const [videoLink, setVideoLink] = useState('');
  const [title, setTitle] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);

  const handleSubmit = () => {
    const data = {
      category,
      videoLink,
      title,
      review,
      rating,
    };

    axios
      .post('서버 URL', JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        // Handle response
      })
      .catch((error) => {
        // Handle error
      });
  };

  return (
    <div>
      <h1
        style={{
          marginLeft: '10rem',
          fontSize: '1.3rem',
        }}
      >
        Write Review
      </h1>
      <Container>
        <h1 style={{ margin: '1rem', fontSize: '1.1rem' }}>
          The category of writing
        </h1>
        <CategoryWrapper>
          {/* 첫 번째 줄에는 7개의 카테고리 버튼을 배치 */}
          <CategoryRow>
            {categories.slice(0, 7).map((cat, index) => (
              <CategoryButton
                key={index}
                index={index}
                isSelected={category === cat}
                onClick={() => {
                  setCategory((currentCategory) =>
                    currentCategory === cat ? '' : cat
                  );
                  console.log(`선택한 카테고리: ${category}`);
                }}
              >
                {cat}
              </CategoryButton>
            ))}
          </CategoryRow>

          {/* 두 번째 줄에는 5개의 카테고리 버튼을 배치 */}
          <CategoryRow>
            {categories.slice(7, 12).map((cat, index) => (
              <CategoryButton
                key={index + 7} // 기존 인덱스에 7을 더하여 키 충돌을 방지
                index={index + 7}
                isSelected={category === cat}
                onClick={() => {
                  setCategory((currentCategory) =>
                    currentCategory === cat ? '' : cat
                  );
                  console.log(`선택한 카테고리: ${category}`);
                }}
              >
                {cat}
              </CategoryButton>
            ))}
          </CategoryRow>

          {/* 세 번째 줄에는 8개의 카테고리 버튼을 배치 */}
          <CategoryRow>
            {categories.slice(12, 20).map((cat, index) => (
              <CategoryButton
                key={index + 12} // 기존 인덱스에 12를 더하여 키 충돌을 방지
                index={index + 12}
                isSelected={category === cat}
                onClick={() => {
                  setCategory((currentCategory) =>
                    currentCategory === cat ? '' : cat
                  );
                  console.log(`선택한 카테고리: ${category}`);
                }}
              >
                {cat}
              </CategoryButton>
            ))}
          </CategoryRow>
        </CategoryWrapper>

        <TextWrapper>
          <Input
            placeholder="유튜브 동영상 링크"
            onChange={(e) => setVideoLink(e.target.value)}
            style={{
              marginBottom: '3rem',
              textAlign: 'center',
            }}
          />
          {videoLink && (
            <Thumbnail
              src={`https://img.youtube.com/vi/${
                videoLink.split('v=')[1]
              }/0.jpg`}
            />
          )}
          <TitleInput
            placeholder="Write a title for the content"
            onChange={(e) => setTitle(e.target.value)}
            style={{
              fontSize: '1.5rem',
              marginBottom: '2rem',
            }}
          />
          <TextArea
            placeholder="리뷰를 작성하세요."
            onChange={(e) => setReview(e.target.value)}
          />
        </TextWrapper>
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

          <div style={{ marginTop: '10px' }}>
            <Button onClick={handleSubmit}>올리기</Button>
          </div>
        </StarWrapper>
      </Container>
    </div>
  );
};

const Container = styled.div`
  max-width: 60rem;
  margin: 0 auto;
  padding: 1.25rem;
`;

const CategoryWrapper = styled.div`
  margin: 3rem 3rem;
  display: flex-box;
  flex-wrap: wrap;
  justify-content: center;
`;

const CategoryButton = styled.button`
  font-weight: bold;
  padding: 0.5rem 1rem;
  margin: 0.3125rem 0.5rem;
  border: 1px solid ${({ isSelected }) => (isSelected ? '#33277c' : 'black')}; // 수정된 부분
  background-color: ${({ isSelected }) =>
    isSelected ? '#33277c' : 'transparent'};
  color: ${({ isSelected }) => (isSelected ? 'white' : 'black')}; // 수정된 부분
  border-radius: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #33277c;
    color: white;
  }
`;

const CategoryRow = styled.div`
  display: flex;
  justify-content: center;
  margin: 1rem;
`;

const Input = styled.input`
  padding: 0.625rem;
  margin: 3rem 0 0 0;
  width: 80%;
  outline: none;
  border: none; // 모든 테두리 제거
  border-bottom: 0.1rem solid #ccc; // 하단만 테두리 설정
  border-radius: 0;
  font-size: 0.875rem;
  background-color: rgba(0, 0, 0, 0);
  font-family: 'NanumSquareRoundEB';
  font-weight: 100;
`;

const TitleInput = styled(Input)`
  &::placeholder {
    font-size: 1.2rem;
  }
`;

const TextWrapper = styled.div`
  margin: 3rem 3rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

const TextArea = styled.textarea`
  padding: 0.625rem; // 10/16
  width: 80%;
  outline: none;
  margin: 0.625rem 0; // 10/16
  min-height: 20rem; // 150/16
  border: none;
  border-radius: 0.3125rem; // 5/16
  font-size: 0.875rem; // 14/16
  background-color: rgba(0, 0, 0, 0);
  font-family: 'NanumSquareRoundEB';
  font-weight: 100;
`;

const Thumbnail = styled.img`
  width: 50%;
  border-radius: 1rem;
  display: block;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;

  &::before {
    content: '';
    display: block;
    padding-bottom: 56.25%; /* 9/16 * 100% = 56.25% */
  }
`;

const Star = styled.span`
  display: inline-block;
  width: 3rem;
  height: 3rem;
  background-color: ${({ selected }) => (selected ? 'gold' : '#ddd')};
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

const Button = styled.button`
  padding: 0.625rem 1.25rem; // 10/16, 20/16
  background-color: #33277c;
  color: white;
  border: none;
  border-radius: 0.3125rem; // 5/16
  transition: background-color 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const StarWrapper = styled.div`
  margin: 3rem 3rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default Upload;
