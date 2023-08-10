import { styled } from "styled-components";
import { SocialLoginButton } from "../Login";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from "react-router-dom";

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

const GreetingTitle = styled.h1`
  display: flex;
  width: 100%;
  justify-self: center;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 2rem;
  font-family: "NanumSquareRoundEB";
  width: fit-content;
  padding: 0.5rem 1.2rem;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const InputContainer = styled.label``;
const Input = styled.input`
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
const SocialSignUpButton = styled(SocialLoginButton)`
  width: 15rem;
  padding: 0.5rem 2rem;
  justify-content: left;
  padding: 0.5rem 1rem;
`;
const SignUpButtonText = styled.span`
  display: flex;
  justify-content: center;
  width: 12rem;
`;
const Icon = styled.span`
  font-size: 1rem;
`;

export default function SignUpEmail() {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Container>
        <GreetingTitle>TubeNova</GreetingTitle>
        <Form>
            <InputContainer>
                <Input type="text" placeholder="이메일"/>
            </InputContainer>
        </Form>
      </Container>
    </Wrapper>
  );
}
