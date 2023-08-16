import { styled } from "styled-components";
import { CategoryGridData } from "../data/CategoryGridData";
import { useState } from "react";

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



export default function CategoryGrid({category, setCategory, max}) {
  const handleSelect = (e) => {
    if (e.target.tagName !== "BUTTON") {
      const buttonTarget = e.target.parentElement;
      const buttonClassList = Array.from(buttonTarget.classList);
      if (buttonClassList.indexOf("selected") > 0) {
        buttonTarget.classList.remove("selected");
        setCategory((prev) => {
          return prev.filter((item) => item !== buttonTarget.id);
        });
      } else {
        if (category.length < max ) {
          buttonTarget.classList.add("selected");
          setCategory((prev) => {
            return [...prev, buttonTarget.id];
          });
        } else {
          alert(`최대 ${max}가지만 선택할 수 있습니다`);
        }
      }
    } else {
      const targetClassList = Array.from(e.target.classList);
      if (targetClassList.indexOf("selected") > 0) {
        e.target.classList.remove("selected");
        setCategory((prev) => {
          return prev.filter((item) => item !== e.target.id);
        });
      } else {
        if (category.length < max) {
          e.target.classList.add("selected");
          setCategory((prev) => {
            return [...prev, e.target.id];
          });
        } else {
          alert(`최대 ${max}가지만 선택할 수 있습니다`);
        }
      }
    }
  };

  return (
    <InterestGrid>
            {CategoryGridData.map((item) => {
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

  );
}
