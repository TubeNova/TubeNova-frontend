import {
  BrowserRouter,
  RouterProvider,
  Route,
  Link,
  Routes,
} from 'react-router-dom';
import Main from './pages/Main';
import Nav from './components/Nav';
import SignUp from './pages/SignUp/SignUp';
import { styled } from 'styled-components';
import SignUpEmail from './pages/SignUp/SignUpEmail';
import Upload from './pages/Upload';
import SignUpInterest from './pages/SignUp/SignUpInterest';
import SignUpSuccess from './pages/SignUp/SignUpSuccess';

import Account from './pages/MyPage/Account';

import MyWriting from './pages/MyPage/MyWriting';
import LikeReview from './pages/MyPage/LikeReview';

import Rank from './pages/Rank';
import ReviewDetail from './pages/ReviewDetail';
import Search from './pages/Search';
import CategoryReviewList from './pages/CategoryReviewList';
const Wrapper = styled.div`
  margin-top: 60px;
  width: 100%;
  box-sizing: border-box;
  padding: 2rem;
  background-color: #f9fafb;
  min-height: calc(100vh - 60px);
  ${({ theme }) => theme.media.mobile} {
    padding: 0.8rem;
  }
`;

const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 5rem 0 2rem 0;
`;
const Logo = styled.h1`
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.8rem;
  font-family: 'NanumSquareRoundEB';
`;
const Info = styled.p`
  color: #333;
  font-size: 0.8rem;
`;
export default function Router() {
  return (
    <BrowserRouter>
      <Nav />
      <Wrapper>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/category/:categoryName" element={<CategoryReviewList />} />
          <Route path="/sign-up">
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/sign-up/email" element={<SignUpEmail />} />
            <Route path="/sign-up/interest" element={<SignUpInterest />} />
            <Route path="/sign-up/success" element={<SignUpSuccess />} />
          </Route>
          <Route path="review/:id" element={<ReviewDetail />}></Route>
          <Route path="/upload" element={<Upload />} />
          <Route path="/rank" element={<Rank />} />
          <Route path="/search" element={<Search />} />
          {/* 마이페이지 라우터 */}
          <Route path="/mypage" element={<MyWriting />}>
            <Route index element={<div />} />{' '}
            <Route path="account" element={<Account />} />
            <Route path="likereview" element={<LikeReview />} />
          </Route>
        </Routes>
        <Footer>
          <Logo>TubeNova</Logo>
          <Info>copyright © 2023 TubeNova All Rights Reserved.</Info>
        </Footer>
      </Wrapper>
    </BrowserRouter>
  );
}
