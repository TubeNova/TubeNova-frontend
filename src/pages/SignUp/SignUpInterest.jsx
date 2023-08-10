import { styled } from "styled-components";
import { SocialLoginButton } from "../Login";
import { FcGoogle } from "react-icons/fc";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { InterestData } from "../../data/InterestData";
import { useEffect, useState } from "react";

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

const InterestGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 1rem;
  row-gap: 1rem;
`;
const InterestItem = styled.button`
  width: 5rem;
  height: 5rem;
  display: flex;
  background-color: #faf8ff;
  border-radius: 0.5rem;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  font-size: 0.8rem;
  font-weight: bold;
  cursor: pointer;
  box-sizing: border-box;
  transition: transform 0.3s;
  &.selected {
    border: 1.2px solid ${({ theme }) => theme.colors.primary};
    transform: scale(110%);
  }
`;
const Icon = styled.span``;
const ItemName = styled.p`
  text-align: center;
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
  const [interestResult, setInterestResult] = useState([]);
  const handleSelect = (e) => {
    if (e.target.tagName !== "BUTTON") {
      const buttonTarget = e.target.parentElement;
      const buttonClassList = Array.from(buttonTarget.classList);
      if (buttonClassList.indexOf("selected") > 0) {
        buttonTarget.classList.remove("selected");
        setInterestResult((prev) => {
          return prev.filter((item) => item !== buttonTarget.id);
        });
      } else {
        if (interestResult.length < 3) {
          buttonTarget.classList.add("selected");
          setInterestResult((prev) => {
            return [...prev, buttonTarget.id];
          });
        } else {
          alert("최대 3가지의 관심사를 선택할 수 있습니다");
        }
      }
    } else {
      const targetClassList = Array.from(e.target.classList);
      if (targetClassList.indexOf("selected") > 0) {
        e.target.classList.remove("selected");
        setInterestResult((prev) => {
          return prev.filter((item) => item !== e.target.id);
        });
      } else {
        if (interestResult.length < 3) {
          e.target.classList.add("selected");
          setInterestResult((prev) => {
            return [...prev, e.target.id];
          });
        } else {
          alert("최대 3가지의 관심사를 선택할 수 있습니다");
        }
      }
    }
  };

  const handleSignUp = () => {
    if (interestResult.length === 0) {
      alert("1가지 이상의 관심사를 선택해주세요");
    } else {
      navigate("/sign-up/success");
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
          <InterestGrid>
            {InterestData.map((item) => {
              return (
                <InterestItem
                  id={item.id}
                  onClick={(e) => {
                    handleSelect(e);
                  }}
                >
                  <Icon>{item.icon}</Icon>
                  <ItemName>{item.name}</ItemName>
                </InterestItem>
              );
            })}
          </InterestGrid>
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
