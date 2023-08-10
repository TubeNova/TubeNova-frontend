import { styled } from "styled-components";
import { SocialLoginButton } from "../Login";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 20rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  background-color: #fff;
  padding: 2rem;
  padding-bottom: 4rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.2);
  border-radius: 1rem;
`;

const Title = styled.h1`
  display: flex;
  width: 100%;
  justify-self: center;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 2rem;
  font-family: "NanumSquareRoundEB";
  width: fit-content;
  padding: 0.5rem 1.2rem;
  margin-bottom: 1rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 17px;
`;

const InputLabel = styled.label`
  color: #a4a4a4;

  font-size: 0.8rem;
  font-weight: bold;
  position: absolute;
  pointer-events: none;
  top: 8px;
  padding: 0 5px;
  background: #fff;
  transition: 0.2s ease all;
  -moz-transition: 0.2s ease all;
  -webkit-transition: 0.2s ease all;
`;
const Input = styled.input`
  font-size: 12px;
  display: block;
  width: 100%;
  height: 34px;
  background: #fff;
  color: #323840;
  box-shadow: none;
  border: 0;
  border-bottom: solid #dcdcdc 2px;
  padding: 0 5px;
  font-weight: bold;
  font-family: "NanumSquareRound";

  box-sizing: border-box;
  &:focus {
    outline: none;
    border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
    ~ ${InputLabel} {
      top: -8px;
      font-size: 13px;
      color: ${({ theme }) => theme.colors.primary};
    }
  }
`;
const InputContainer = styled.div`
  position: relative;
  ${Input}:not(:placeholder-shown) ~ ${InputLabel} {
    top: -8px;
    font-size: 13px;
  }
`;
const NextButton = styled(SocialLoginButton)`
  width: 15rem;
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #fff;
`;

export default function SignUpEmail() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [passwordInfo, setPasswordInfo] = useState({
    password: "",
    passwordCheck: "",
  });
  const navigate = useNavigate();
  const handleNextStep = (e) => {
    e.preventDefault();
    if (
      loginInfo.email.length > 0 &&
      loginInfo.password.length > 0 &&
      passwordInfo.passwordCheck.length > 0
    ) {
        let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
        if (regex.test(loginInfo.email)) {
            if (passwordInfo.password === passwordInfo.passwordCheck) {
                navigate("/sign-up/interest");
              } else {
                alert("비밀번호를 확인해주세요");
              }
        } else {
            alert("이메일 형식을 확인해주세요")
        }

    } else {
      alert("모두 입력해주세요");
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Wrapper>
        <Container>
          <Title>TubeNova</Title>
          <Form
            onSubmit={(e) => {
              handleNextStep(e);
            }}
          >
            <InputContainer>
              <Input
                type="text"
                placeholder=" "
                onChange={(e) => {
                  setLoginInfo((prev) => {
                    return { ...prev, email: e.target.value };
                  });
                }}
              />
              <InputLabel>이메일</InputLabel>
            </InputContainer>
            <InputContainer>
              <Input
                type="password"
                placeholder=" "
                onChange={(e) => {
                  setLoginInfo((prev) => {
                    return { ...prev, password: e.target.value };
                  });
                  setPasswordInfo((prev) => {
                    return { ...prev, password: e.target.value };
                  });
                }}
              />
              <InputLabel>비밀번호</InputLabel>
            </InputContainer>
            <InputContainer>
              <Input
                type="password"
                placeholder=" "
                onChange={(e) => {
                  setPasswordInfo((prev) => {
                    return { ...prev, passwordCheck: e.target.value };
                  });
                }}
              />
              <InputLabel>비밀번호 확인</InputLabel>
            </InputContainer>
            <NextButton>다음</NextButton>
          </Form>
        </Container>
      </Wrapper>
    </motion.div>
  );
}
