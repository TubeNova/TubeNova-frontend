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
import SignUpInterest from "./pages/SignUp/SignUpInterest";
import SignUpSuccess from "./pages/SignUp/SignUpSuccess";
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
          <Route path={`/upload`} element={<Upload />} />
        </Routes>
      </Wrapper>
    </BrowserRouter>
  );
}
