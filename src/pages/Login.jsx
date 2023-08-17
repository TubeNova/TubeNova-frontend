import { useEffect, useState } from "react";
import { styled } from "styled-components";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { LoginStateAtom } from "../atom";

const ServiceTitle = styled.p`
  font-size: 2rem;
  font-family: "NanumSquareRoundEB";
  color: ${({ theme }) => theme.colors.primary};
`;
const LoginContainer = styled.form`
  display: flex;
  flex-direction: column;
  width: 16rem;
  gap: 20px;
`;

const IdInput = styled.input`
  height: 1.4rem;
  border: 0;
  border-bottom: solid #dcdcdc 2px;
  font-size: 0.8rem;
  padding: 0.4rem;
  font-weight: bold;
  color: #333;
  &:focus {
    outline: 0;
    border-bottom: solid ${({ theme }) => theme.colors.primary} 2px;
    transition: 0.5s;
  }
`;
const PwInput = styled(IdInput)``;
const LoginButton = styled.input`
  background-color: ${({ theme }) => theme.colors.primary};
  color: #fff;
  padding: 0.7rem 0.5rem;
  border-radius: 0.5rem;
  font-weight: bold;
  font-size: 0.8rem;
  &:hover {
    filter: grayscale(30%);
    transition: 0.2s;
  }
`;
export const SocialLoginButton = styled.button`
  border-radius: 0.5rem;
  width: 100%;
  background-color: #f8f8f8;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.2);
  font-size: 0.8rem;
  padding: 0.5rem 0;
  display: flex;
  gap: 0.5rem;
  justify-content: center;
  align-items: center;
  color: #525252;
  font-weight: bold;
  svg {
    font-size: 1.4rem;
  }
`;
const SignUpButton = styled.button`
  display: flex;
  align-self: center;
  margin-top: 1rem;
  width: fit-content;
  font-size: 0.7rem;
  color: #333;
  text-decoration: underline;
`;

export default function Login({ setUpdateModalOpen }) {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginStateAtom)
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    pw: "",
  });
  const handleLogin = (e) => {
    e.preventDefault();
    if (loginInfo.email.length > 0 && loginInfo.pw.length > 0) {
      setUpdateModalOpen(false)
      setIsLoggedIn((prev) => {return({...prev, state: true})})
    }
  };

  return (
    <>
      <ServiceTitle>TubeNova</ServiceTitle>
      <LoginContainer
        onSubmit={(e) => {
          handleLogin(e);
        }}
      >
        <IdInput
          type="text"
          placeholder="이메일"
          value={loginInfo.email}
          onChange={(e) =>
            setLoginInfo((prev) => {
              return { ...prev, email: e.target.value };
            })
          }
        />
        <PwInput
          type="password"
          placeholder="비밀번호"
          value={loginInfo.pw}
          onChange={(e) =>
            setLoginInfo((prev) => {
              return { ...prev, pw: e.target.value };
            })
          }
        />
        <LoginButton type="submit" value="로그인" />
        <SocialLoginButton>
          <FcGoogle />
          구글로 로그인하기
        </SocialLoginButton>
        <SignUpButton
          onClick={() => {
            navigate("/sign-up", { state: { modalOpen: false } });
            setUpdateModalOpen(false);
          }}
        >
          회원가입하기
        </SignUpButton>
      </LoginContainer>
    </>
  );
}
