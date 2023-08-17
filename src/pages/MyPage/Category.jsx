// import React, { useState } from 'react';
// import styled from 'styled-components';
// import axios from 'axios';
// import { useRecoilValue } from 'recoil';
// import { LoginStateAtom } from '../../atom';

// const CATEGORY_MAP = {
//   '라이프 스타일': 'LIFESTYLE',
//   '음악/댄스': 'MUSICNDANCE',
//   '뷰티/패션': 'BEAUTYNFASHION',
//   '영화/애니': 'FILMNANIMATION',
//   키즈: 'KIDS',
//   게임: 'GAME',
//   '여행/아웃도어': 'OUTDOOR',
//   '스포츠/ 헬스': 'SPORTS',
//   '뉴스/정치/이슈': 'NEWSNPOLITICS',
//   '정부/기관/비영리': 'GOVERNAGENCY',
//   엔터테인먼트: 'ENTERTAINMENT',
//   '푸드/쿠킹': 'FOOD',
//   '인물/유명인': 'CELEBRITY',
//   'IT/기술/과학': 'SCIENCE',
//   '동물 / 펫': 'ANIMAL',
//   '차/배/바이크': 'VEHICLE',
//   '경제/금융/제태크': 'ECONOMY',
//   취미: 'HOBBY',
//   '교육/강의': 'EDUCATION',
//   미분류: 'UNTITLED',
// };

// const categories = Object.keys(CATEGORY_MAP);

// const transformCategories = (favorites) => {
//   return favorites.map((category) => CATEGORY_MAP[category]);
// };

// const Category = () => {
//   const { accessToken } = useRecoilValue(LoginStateAtom);
//   const [favorites, setFavorites] = useState([]); // 즐겨찾기 카테고리 배열

//   const handleFavoriteClick = (category) => {
//     if (favorites.includes(category)) {
//       setFavorites((prevFavorites) =>
//         prevFavorites.filter((fav) => fav !== category)
//       );
//     } else {
//       if (favorites.length >= 3) {
//         alert('즐겨찾기는 3개까지만 선택할 수 있어요');
//       } else {
//         setFavorites((prevFavorites) => [...prevFavorites, category]);
//       }
//     }
//   };

//   const handleSendFavorites = () => {
//     const transformedFavorites = transformCategories(favorites);

//     const dataToSend = {
//       categories: transformedFavorites,
//     };

//     axios
//       .post(
//         'https://port-0-tubenova-backend-eu1k2llldkkxjy.sel3.cloudtype.app/member/me/update',
//         dataToSend,
//         {
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${accessToken}`,
//           },
//         }
//       )
//       .then((response) => {
//         console.log(dataToSend);
//         console.log('Server Response:', response.data);
//       })
//       .catch((error) => {
//         console.log(dataToSend);
//         console.log('응~에러야~');
//       });
//   };

//   return (
//     <div>
//       <h1
//         style={{ fontSize: '1.3rem', fontWeight: 'bolder', marginTop: '1rem' }}
//       >
//         즐겨찾기 설정{' '}
//         <span style={{ fontSize: '0.8rem', fontWeight: 'bolder' }}>
//           (최대 3개)
//         </span>
//       </h1>

//       <CategoryWrapper>
//         {/* 첫 번째 줄에는 5개의 카테고리 버튼을 배치 */}
//         <CategoryRow>
//           {categories.slice(0, 5).map((category, index) => (
//             <CategoryButton
//               key={index}
//               $isSelected={favorites.includes(category)}
//               onClick={() => handleFavoriteClick(category)}
//             >
//               {category}
//             </CategoryButton>
//           ))}
//         </CategoryRow>

//         {/* 두 번째 줄에는 5개의 카테고리 버튼을 배치 */}
//         <CategoryRow>
//           {categories.slice(5, 10).map((category, index) => (
//             <CategoryButton
//               key={index + 5} // 기존 인덱스에 5를 더하여 키 충돌을 방지
//               $isSelected={favorites.includes(category)}
//               onClick={() => handleFavoriteClick(category)}
//             >
//               {category}
//             </CategoryButton>
//           ))}
//         </CategoryRow>

//         {/* 세 번째 줄에는 5개의 카테고리 버튼을 배치 */}
//         <CategoryRow>
//           {categories.slice(10, 15).map((category, index) => (
//             <CategoryButton
//               key={index + 10} // 기존 인덱스에 10를 더하여 키 충돌을 방지
//               $isSelected={favorites.includes(category)}
//               onClick={() => handleFavoriteClick(category)}
//             >
//               {category}
//             </CategoryButton>
//           ))}
//         </CategoryRow>

//         {/* 네 번째 줄에는 5개의 카테고리 버튼을 배치 */}
//         <CategoryRow>
//           {categories.slice(15, 20).map((category, index) => (
//             <CategoryButton
//               key={index + 15} // 기존 인덱스에 15를 더하여 키 충돌을 방지
//               $isSelected={favorites.includes(category)}
//               onClick={() => handleFavoriteClick(category)}
//             >
//               {category}
//             </CategoryButton>
//           ))}
//         </CategoryRow>
//       </CategoryWrapper>

//       <SubmitButton onClick={handleSendFavorites}>
//         즐겨찾기 수정하기
//       </SubmitButton>
//     </div>
//   );
// };

// const CategoryWrapper = styled.div`
//   display: flex;
//   flex-wrap: wrap;
//   justify-content: center;
//   margin: 5rem 0;
// `;

// const CategoryButton = styled.button`
//   font-weight: bold;
//   padding: 0.5rem 1rem;
//   margin: 0.3125rem 0.5rem;
//   border: 1px solid ${({ $isSelected }) => ($isSelected ? '#33277c' : 'black')}; // 변경된 부분
//   background-color: ${({ $isSelected }) =>
//     $isSelected ? '#33277c' : 'transparent'}; // 변경된 부분
//   color: ${({ $isSelected }) =>
//     $isSelected ? 'white' : 'black'}; // 변경된 부분
//   border-radius: 1rem;
//   transition: background-color 0.3s;

//   &:hover {
//     background-color: #33277c;
//     color: white;
//   }
// `;

// const SubmitButton = styled.button`
//   display: block;
//   margin: 2rem auto;
//   padding: 1rem 2rem;

//   border: none; // 변경된 부분
//   background-color: rgb(228, 228, 228);
//   border-radius: 0.5rem;
//   font-weight: bolder;
//   font-size: 1rem;
//   &:hover {
//     background-color: #33277c;
//     color: white;
//   }
// `;
// const CategoryRow = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin-bottom: 2rem;
//   width: 100%;
//   flex-wrap: wrap;
// `;

// export default Category;
