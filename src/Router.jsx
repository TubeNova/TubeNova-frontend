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
import Category from './pages/MyPage/Category';
import MyWriting from './pages/MyPage/MyWriting';
import LikeReview from './pages/MyPage/LikeReview';

import Rank from './pages/Rank';
import ReviewDetail from './pages/ReviewDetail';
const Wrapper = styled.div`
  margin-top: 60px;
  width: 100%;
  box-sizing: border-box;
  padding: 2rem;
  background-color: #f9fafb;
  min-height: calc(100vh - 60px);
`;
export default function Router() {
  return (
    <BrowserRouter>
      <Nav />
      <Wrapper>
        <Routes>
          <Route path={`/`} element={<Main />} />
          <Route path={`/sign-up`}>
            <Route path={`/sign-up`} element={<SignUp />} />
            <Route path={`/sign-up/email`} element={<SignUpEmail />} />
            <Route path={`/sign-up/interest`} element={<SignUpInterest />} />
            <Route path={`/sign-up/success`} element={<SignUpSuccess />} />
          </Route>
          <Route path={`review/:id`} element={<ReviewDetail/>}>

          </Route>
          <Route path={`/upload`} element={<Upload />} />
          <Route path={`/rank`} element={<Rank />} />
          {/* 마이페이지 라우터 */}
          <Route path="/mypage" element={<MyWriting />}>
            <Route index element={<div />} />{' '}
            <Route path="account" element={<Account />} />
            <Route path="likereview" element={<LikeReview />} />
            <Route path="category" element={<Category />} />
          </Route>
        </Routes>
      </Wrapper>
    </BrowserRouter>
  );
}
