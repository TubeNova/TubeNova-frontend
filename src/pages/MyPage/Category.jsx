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
  '스포츠/ 헬스',
  '뉴스/정치/이슈',
  '정부/기관/비영리',
  '엔터테인먼트',
  '푸드/쿠킹',
  '인물/유명인',
  'IT/기술/과학',
  '동물 / 펫',
  '차/배/바이크',
  '경제/금융/제태크',
  '취미',
  '교육/강의',
  '미분류',
];

const Category = () => {
  const [favorites, setFavorites] = useState([]); // 즐겨찾기 카테고리 배열

  const handleFavoriteClick = (category) => {
    if (favorites.includes(category)) {
      setFavorites((prevFavorites) =>
        prevFavorites.filter((fav) => fav !== category)
      );
    } else {
      if (favorites.length >= 3) {
        alert('즐겨찾기는 3개까지만 선택할 수 있어요');
      } else {
        setFavorites((prevFavorites) => [...prevFavorites, category]);
      }
    }
  };

  const handleSendFavorites = () => {
    // JavaScript 객체를 JSON 문자열로 변환
    const jsonFavorites = JSON.stringify(favorites);

    axios
      .post('서버api주소', jsonFavorites, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log(jsonFavorites);
        console.log('Server Response:', response.data);
      })
      .catch((error) => {
        console.log(jsonFavorites);
        console.error('Error sending data:', error);
      });
  };

  return (
    <div>
      <h1
        style={{ fontSize: '1.3rem', fontWeight: 'bolder', marginTop: '1rem' }}
      >
        즐겨찾기 설정{' '}
        <span style={{ fontSize: '0.8rem', fontWeight: 'bolder' }}>
          (최대 3개)
        </span>
      </h1>

      <CategoryWrapper>
        {/* 첫 번째 줄에는 5개의 카테고리 버튼을 배치 */}
        <CategoryRow>
          {categories.slice(0, 5).map((category, index) => (
            <CategoryButton
              key={index}
              $isSelected={favorites.includes(category)}
              onClick={() => handleFavoriteClick(category)}
            >
              {category}
            </CategoryButton>
          ))}
        </CategoryRow>

        {/* 두 번째 줄에는 5개의 카테고리 버튼을 배치 */}
        <CategoryRow>
          {categories.slice(5, 10).map((category, index) => (
            <CategoryButton
              key={index + 5} // 기존 인덱스에 5를 더하여 키 충돌을 방지
              $isSelected={favorites.includes(category)}
              onClick={() => handleFavoriteClick(category)}
            >
              {category}
            </CategoryButton>
          ))}
        </CategoryRow>

        {/* 세 번째 줄에는 5개의 카테고리 버튼을 배치 */}
        <CategoryRow>
          {categories.slice(10, 15).map((category, index) => (
            <CategoryButton
              key={index + 10} // 기존 인덱스에 10를 더하여 키 충돌을 방지
              $isSelected={favorites.includes(category)}
              onClick={() => handleFavoriteClick(category)}
            >
              {category}
            </CategoryButton>
          ))}
        </CategoryRow>

        {/* 네 번째 줄에는 5개의 카테고리 버튼을 배치 */}
        <CategoryRow>
          {categories.slice(15, 20).map((category, index) => (
            <CategoryButton
              key={index + 15} // 기존 인덱스에 15를 더하여 키 충돌을 방지
              $isSelected={favorites.includes(category)}
              onClick={() => handleFavoriteClick(category)}
            >
              {category}
            </CategoryButton>
          ))}
        </CategoryRow>
      </CategoryWrapper>

      <SubmitButton onClick={handleSendFavorites}>
        즐겨찾기 수정하기
      </SubmitButton>
    </div>
  );
};

const CategoryWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin: 5rem 0;
`;

const CategoryButton = styled.button`
  font-weight: bold;
  padding: 0.5rem 1rem;
  margin: 0.3125rem 0.5rem;
  border: 1px solid ${({ $isSelected }) => ($isSelected ? '#33277c' : 'black')}; // 변경된 부분
  background-color: ${({ $isSelected }) =>
    $isSelected ? '#33277c' : 'transparent'}; // 변경된 부분
  color: ${({ $isSelected }) =>
    $isSelected ? 'white' : 'black'}; // 변경된 부분
  border-radius: 1rem;
  transition: background-color 0.3s;

  &:hover {
    background-color: #33277c;
    color: white;
  }
`;

const SubmitButton = styled.button`
  display: block;
  margin: 2rem auto;
  padding: 1rem 2rem;

  border: none; // 변경된 부분
  background-color: rgb(228, 228, 228);
  border-radius: 0.5rem;
  font-weight: bolder;
  font-size: 1rem;
  &:hover {
    background-color: #33277c;
    color: white;
  }
`;
const CategoryRow = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 2rem;
  width: 100%;
  flex-wrap: wrap;
`;

export default Category;
