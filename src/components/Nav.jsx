import { styled, css } from "styled-components";
import { NavCategoryData } from "../data/CategoryData";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BiSearch, BiSolidChevronDown } from "react-icons/bi";
import { useEffect, useState } from "react";
import Login from "../pages/Login";

const NavContainer = styled.nav`
  display: flex;
  width: 100%;
  background-color: #fff;
  padding: 1rem 2rem;
  justify-content: space-between;
  box-sizing: border-box;
  box-shadow: 0px 0.5px 5px 3px rgba(0, 0, 0, 0.1);
  position: fixed;
  height: 4.2rem;
  top: 0;
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
  width: 30%;
  gap: 15px;
  height: fit-content;
  border: none;
  box-shadow: 0px 4px 5px 2px rgba(0, 0, 0, 0.05);
  border-radius: 15px;
  background-color: #fff;
`;

export default function Nav() {
  const [userTabActive, setUserTabActice] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
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
              return (
                <NavCategoryItem to={item.url}>{item.name}</NavCategoryItem>
              );
            })}
          </NavCategoryList>
        </NavLeftBox>
        <NavRightBox>
          <NavSearchBox>
            <NavSearchInput placeholder="검색어를 입력해주세요" />
            <NavSearchButton>
              <BiSearch />
            </NavSearchButton>
          </NavSearchBox>
          {isLoggedIn ? (
            <UserTabButton>
              user님 <BiSolidChevronDown />
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
    </>
  );
}
