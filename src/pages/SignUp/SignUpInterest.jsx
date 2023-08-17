import { styled } from "styled-components";
import { SocialLoginButton } from "../Login";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { CategoryGridData } from "../../data/CategoryGridData";
import { useEffect, useState } from "react";
import CategoryGrid from "../../components/CategoryGrid";
import axios from "axios";

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 25rem;
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
`;
const Desc = styled.p`
  margin-bottom: 1rem;
  display: flex;
  text-align: center;
  font-weight: bold;
  font-size: 0.8rem;
  margin-bottom: 1rem;
`;


const NextButton = styled(SocialLoginButton)`
  width: 15rem;
  padding: 0.5rem 1rem;
  background-color: ${({ theme }) => theme.colors.primary};
  color: #fff;
  margin-top: 2rem;
`;

export default function SignUpInterest() {
  const navigate = useNavigate();
  const [category, setCategory] = useState([]);
  const location = useLocation();
  let signUpInfo = location.state.signUpInfo

  const handleSignUp = () => {
    if (category.length === 0) {
      alert("1가지 이상의 관심사를 선택해주세요");
    } else {
      signUpInfo = {...signUpInfo, categories: category}
      try {
        axios({
          method: "post",
          url: `/auth/signup`,
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            username: signUpInfo.email,
            password: signUpInfo.password,
            name: signUpInfo.name,
            categories: signUpInfo.categories
          },
        }).then((response) => {
          console.log(response)
          navigate("/sign-up/success");
        });
      } catch (e) {
        console.log(e);
      }
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
          <Title>관심사</Title>
          <Desc>1~3가지의 관심사를 선택해주세요</Desc>
          <CategoryGrid setCategory={setCategory} category={category} max={3}/>
          <NextButton
            onClick={() => {
              handleSignUp();
            }}
          >
            회원가입
          </NextButton>
        </Container>
      </Wrapper>
    </motion.div>
  );
}
