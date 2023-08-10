import {
  BrowserRouter,
  RouterProvider,
  Route,
  Link,
  Routes,
} from "react-router-dom";
import Main from "./pages/Main";
import Nav from "./components/Nav";
import SignUp from "./pages/SignUp/SignUp";
import { styled } from "styled-components";
import SignUpEmail from "./pages/SignUp/SignUpEmail";
const Wrapper = styled.div`
  margin-top: 4.2rem;
  width: 100%;
  box-sizing: border-box;
  padding: 2rem;
  background-color: #f9fafb;
  min-height: calc(100vh - 4.2rem);
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
          </Route>
        </Routes>
      </Wrapper>
    </BrowserRouter>
  );
}
