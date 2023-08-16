import { styled, css } from "styled-components";
import { NavCategoryData } from "../data/CategoryData";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  BiPencil,
  BiSearch,
  BiSolidChevronDown,
  BiSolidChevronUp,
} from "react-icons/bi";
import { useEffect, useState } from "react";
import Login from "../pages/Login";
import { useRecoilState } from "recoil";
import { LoginStateAtom } from "../atom";
import { IoPerson } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";

const NavContainer = styled.nav`
  display: flex;
  width: 100%;
  background-color: #fff;
  padding: 1rem 2rem;
  justify-content: space-between;
  box-sizing: border-box;
  box-shadow: 0px 0.5px 5px 3px rgba(0, 0, 0, 0.1);
  position: fixed;
  height: 60px;
  top: 0;
  z-index: 10;
`;
const NavLeftBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;
const NavTitle = styled.h1`
  color: ${(props) => props.theme.colors.primary};
  font-size: 1.5rem;
  font-family: "NanumSquareRoundEB";
  font-weight: bolder;
  cursor: pointer;
`;
const NavCategoryList = styled.ul`
  display: flex;
  gap: 0.8rem;
`;
const NavCategoryItem = styled(Link)`
  color: #949494;
  font-weight: bold;
  font-size: 1rem;
  &.active {
    color: ${({ theme }) => theme.colors.primary};
  }
  &:hover {
    color: ${(props) => props.theme.colors.primary};
    transition: 0.3s ease-in-out;
  }
`;

const NavRightBox = styled.div`
  display: flex;
  gap: 3rem;
  align-items: center;
`;
const NavSearchBox = styled.div`
  border-radius: 5.3rem;
  border: 1.3px #c3c3c3 solid;
  display: flex;
  width: 16rem;
  padding: 0 0.3rem 0 1rem;
  justify-content: space-between;
  align-items: center;
  height: fit-content;
`;
const NavSearchInput = styled.input.attrs({ type: "text" })`
  background-color: transparent;
  border: 0;
  padding: 0.5rem 0;
  width: 13rem;
  &:focus {
    outline: 0;
  }
  &::placeholder {
    color: #c3c3c3;
  }
`;
const NavSearchButton = styled.button`
  font-size: 1.4rem;
  width: 2rem;
  height: fit-content;
  align-items: center;
  display: flex;
  color: #c3c3c3;
`;
const NavLoginButton = styled.button`
  border-radius: 1.9rem;
  background-color: ${(props) => props.theme.colors.primary};
  color: #fff;
  display: flex;
  padding: 0.5rem 1.2rem;
  align-items: center;
  font-size: 0.9rem;
  font-weight: bold;
`;
const UserTabButton = styled.button`
  color: #949494;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-family: "NanumSquareRoundEB";
`;
const UserToolModalContainer = styled.div`
  position: fixed;
  right: 1rem;
  display: flex;
  z-index: 99;
  border-radius: 1.2rem;
  background: #fff;
  box-shadow: 0px 2px 2px 2px rgba(0, 0, 0, 0.15);
  padding: 1.5rem 2.3rem;
  margin-top: 0.1rem;
  gap: 1.2rem;
`;
const Tool = styled.button`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  font-size: 0.8rem;
  align-items: center;
`;
const ToolIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.8rem;
  svg {
    font-size: 1.7rem;
    color: #fff;
    background-color: ${({ theme }) => theme.colors.primary};
    border-radius: 100%;
    padding: 0.7rem;
  }
`;
const ToolName = styled.p``;
const Overlay = styled.div`
  width: 100%;
  height: 100vh;
  top: 0;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.2);
  z-index: 999;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: hidden;
`;
const ModalContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2.5rem 1.1rem;
  width: 30vw;
  gap: 15px;
  height: fit-content;
  border: none;
  box-shadow: 0px 4px 5px 2px rgba(0, 0, 0, 0.05);
  border-radius: 15px;
  background-color: #fff;
`;

const MoreCategories = styled.ul`
  position: fixed;
  top: 50px;
  left: 0;
  display: grid;
  row-gap: 1rem;
  grid-template-columns: repeat(8, 1fr);
  width: 100%;
  background-color: #fff;
  padding: 1em 2rem 1rem 2rem;
  box-sizing: border-box;
  box-shadow: 0px 0.5px 5px 0px rgba(0, 0, 0, 0.1);
`;

export default function Nav() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginStateAtom);
  const [modalOpen, setModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [userToolModal, setUserToolModal] = useState(false);
  const [showMoreCategories, setShowMoreCategories] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (!updateModalOpen) {
      setModalOpen(false);
    }
  }, [updateModalOpen]);

  return (
    <>
      <NavContainer>
        <NavLeftBox>
          <NavTitle
            onClick={() => {
              navigate("/");
            }}
          >
            TubeNova
          </NavTitle>
          <NavCategoryList>
            {NavCategoryData.map((item) => {
              if (item.name === "더보기") {
                return (
                  <NavCategoryItem
                    className={showMoreCategories ? "active" : null}
                    to={item.url}
                    onClick={(e) => {
                      setShowMoreCategories((prev) => {
                        return !prev;
                      });
                    }}
                  >
                    {item.name}
                  </NavCategoryItem>
                );
              } else {
                return (
                  <NavCategoryItem
                    to={item.url}
                    onClick={() => {
                      setShowMoreCategories(false);
                    }}
                  >
                    {item.name}
                  </NavCategoryItem>
                );
              }
            })}
          </NavCategoryList>
          {showMoreCategories && (
            <MoreCategories>
              {NavCategoryData[NavCategoryData.length - 1].etcCategory.map(
                (item) => {
                  return (
                    <NavCategoryItem
                      to={item.url}
                      onClick={() => {
                        setShowMoreCategories(false);
                      }}
                    >
                      {item.name}
                    </NavCategoryItem>
                  );
                }
              )}
            </MoreCategories>
          )}
        </NavLeftBox>
        <NavRightBox>
          <NavSearchBox>
            <NavSearchInput placeholder="검색어를 입력해주세요" />
            <NavSearchButton>
              <BiSearch />
            </NavSearchButton>
          </NavSearchBox>
          {isLoggedIn.state ? (
            <UserTabButton
              onClick={() => {
                setUserToolModal((prev) => !prev);
              }}
            >
              user님{" "}
              {userToolModal ? <BiSolidChevronUp /> : <BiSolidChevronDown />}
            </UserTabButton>
          ) : (
            <NavLoginButton
              onClick={() => {
                setModalOpen(true);
                setUpdateModalOpen(true);
              }}
            >
              로그인
            </NavLoginButton>
          )}
        </NavRightBox>
      </NavContainer>
      {modalOpen && (
        <Overlay
          onClick={() => {
            setModalOpen(false);
          }}
        >
          <ModalContainer
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <Login setUpdateModalOpen={setUpdateModalOpen} />
          </ModalContainer>
        </Overlay>
      )}
      {userToolModal && (
        <UserToolModalContainer>
          <Tool
            onClick={() => {
              navigate("/mypage");
              setUserToolModal(false);
            }}
          >
            <ToolIcon>
              <IoPerson />
            </ToolIcon>
            <ToolName>마이페이지</ToolName>
          </Tool>
          <Tool
            onClick={() => {
              navigate("/upload");
              setUserToolModal(false);
            }}
          >
            <ToolIcon>
              <BiPencil />
            </ToolIcon>
            <ToolName>글쓰기</ToolName>
          </Tool>
          <Tool
            onClick={() => {
              setIsLoggedIn((prev) => {
                return { ...prev, state: false };
              });
              setUserToolModal(false);
            }}
          >
            <ToolIcon>
              <FiLogOut />
            </ToolIcon>
            <ToolName>로그아웃</ToolName>
          </Tool>
        </UserToolModalContainer>
      )}
    </>
  );
}
