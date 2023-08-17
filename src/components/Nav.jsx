import { styled, css } from "styled-components";
import { NavCategoryData } from "../data/CategoryData";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  BiChevronRight,
  BiPencil,
  BiSearch,
  BiSolidChevronDown,
  BiSolidChevronUp,
} from "react-icons/bi";
import { useEffect, useState } from "react";
import Login from "../pages/Login";
import { useRecoilState, useRecoilValue } from "recoil";
import { LoginStateAtom } from "../atom";
import { IoPerson } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { useWindowSize } from "../hook/useWindow";
import { AiOutlineMenu } from "react-icons/ai";
import { TiThMenu } from "react-icons/ti";
import { TbUser, TbUserQuestion } from "react-icons/tb";
import CategoryGrid from "./CategoryGrid";
import axios from "axios";
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
  ${({ theme }) => theme.media.mobile} {
    padding: 10px;
  }
`;
const NavLeftBox = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  ${({ theme }) => theme.media.mobile} {
    gap: 8px;
  }
`;
const NavTitle = styled.h1`
  color: ${(props) => props.theme.colors.primary};
  font-size: 1.5rem;
  font-family: "NanumSquareRoundEB";
  font-weight: bolder;
  cursor: pointer;
  ${({ theme }) => theme.media.mobile} {
    font-size: 20px;
  }
`;
const NavCategoryList = styled.ul`
  display: flex;
  gap: 0.8rem;
  ${({ theme }) => theme.media.mobile} {
    display: none;
  }
  ${({ theme }) => theme.media.tablet} {
    display: none;
  }
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
  ${({ theme }) => theme.media.mobile} {
    gap: 1rem;
  }
`;
const NavSearchBox = styled.form`
  border-radius: 5.3rem;
  border: 1.3px #c3c3c3 solid;
  display: flex;
  width: 16rem;
  padding: 0 0.3rem 0 1rem;
  justify-content: space-between;
  align-items: center;
  height: fit-content;
  ${({ theme }) => theme.media.mobile} {
    width: 10rem;
  }
`;
const NavSearchInput = styled.input.attrs({ type: "text" })`
  background-color: transparent;
  border: 0;
  padding: 0.5rem 0;
  width: 13rem;
  font-size: 1rem;
  &:focus {
    outline: 0;
  }
  &::placeholder {
    color: #c3c3c3;
  }
  ${({ theme }) => theme.media.mobile} {
    width: 8rem;
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
  ${({ theme }) => theme.media.mobile} {
    display: none;
  }
  ${({ theme }) => theme.media.tablet} {
    display: none;
  }
`;
const UserTabButton = styled.button`
  color: #949494;
  font-size: 1rem;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-family: "NanumSquareRoundEB";
  ${({ theme }) => theme.media.mobile} {
    display: none;
  }
  ${({ theme }) => theme.media.tablet} {
    display: none;
  }
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
  ${({ theme }) => theme.media.mobile} {
    width: 90vw;
  }
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
  text-align: center;
  a {
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const SideNavButton = styled.button`
  font-size: 20px;
  color: ${({ theme }) => theme.colors.primary};
`;
const SideNavOverlay = styled.div`
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 999;
  position: fixed;
  top: 0;
  width: 0;
  overflow: hidden;
  &.active {
    width: 100vw;
  }
`;
const SideNav = styled.nav`
  z-index: 999;
  position: fixed;
  top: 0;
  width: 0 !important;
  overflow-x: hidden;
  background-color: #fff;
  height: 100vh;
  justify-content: start;
  align-items: baseline;
  flex-direction: column;
  box-sizing: border-box;
  padding: 0;
  overflow-y: auto;
  transition: 0.3s;
  display: flex;
  &.active {
    width: 70vw !important;
    padding: 15px 25px;
  }
`;
const SideNavTitle = styled.h1`
  font-family: "NanumSquareRoundEB";
  font-size: 20px;
  display: flex;
  align-self: center;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 20px;
`;
const SideNavLoginBtn = styled.button`
  display: flex;
  align-items: center;
  font-weight: bold;
  font-size: 16px;
  svg {
    font-size: 20px;
  }
`;
const ProfileIcon = styled.span`
  color: ${({ theme }) => theme.colors.primary};
  padding: 2px;
  font-size: 18px;
  width: 22px;
  height: 22px;
  border-radius: 7px;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.5);
  margin-right: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SideNavCategoryList = styled.ul`
  color: #4e576a;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;
`;
const SideNavCategoryItem = styled.li`
  width: 100%;
  &.active {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
const SideNavMoreCateList = styled.ul`
  margin-left: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 0 !important;
  overflow: hidden;
  transition: 0.3s;
  &.active {
    height: 400px !important;
  }
`;
const SideNavMoreCateItem = styled.li``;
const SideNavUserBtnContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`
const SideNavUserBtn = styled.button`
  font-weight: bold;
  font-size: 12px;
  color: #fff;
  background-color: ${({theme}) => theme.colors.primary};
  padding: 6px;
  border-radius: 5px;
  
`;

export default function Nav() {
  const [isLoggedIn, setIsLoggedIn] = useRecoilState(LoginStateAtom);
  const [modalOpen, setModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [userToolModal, setUserToolModal] = useState(false);
  const [showMoreCategories, setShowMoreCategories] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [showSideNavBtn, setShowSideNavBtn] = useState(false);
  const [showSideNav, setShowSideNav] = useState(false);
  const [showSideNavMoreCate, setShowSideNavMoreCate] = useState(false);
  const windowSize = useWindowSize();
  const navigate = useNavigate();
  useEffect(() => {
    if (!updateModalOpen) {
      setModalOpen(false);
    }
  }, [updateModalOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?keyword=${searchKeyword}`);
    setSearchKeyword("");
  };
  useEffect(() => {
    if (windowSize.width <= 1280) {
      setShowSideNavBtn(true);
    } else {
      setShowSideNavBtn(false);
    }
  }, [windowSize]);

  useEffect(() => {
    if (!showSideNav) {
      setShowSideNavMoreCate(false);
    }
  }, [showSideNav]);

  useEffect(()=>{
    console.log(isLoggedIn)
  },[isLoggedIn])

  const getMyInfo = async () => {
    try {
      await axios({
        method: "get",
        url: `/member/me`,
        headers: {
          Authorization: `Bearer ${isLoggedIn.accessToken}`,
        },
      }).then((response) => {
        console.log(response);
      });
    } catch (e) {}
  };

  return (
    <>
      <SideNavOverlay
        className={showSideNav && "active"}
        onClick={() => {
          setShowSideNav(false);
        }}
      >
        <SideNav
          className={showSideNav && "active"}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <SideNavTitle>TubeNova</SideNavTitle>
          {isLoggedIn.state ? (
            <>
              <ProfileIcon>
                <TbUser />
              </ProfileIcon>
            <SideNavUserBtnContainer>
            <SideNavUserBtn
              onClick={() => {
                setIsLoggedIn({
                  state: false,
                  accessToken: "",
                  accessTokenExpiresIn: 0,
                  authority: "",
                  grantType: "",
                  refreshToken: "",
                });
                setShowSideNav(false);
              }}
            >
              로그아웃
            </SideNavUserBtn>
            <SideNavUserBtn
              onClick={() => {
                setShowSideNav(false);
                navigate('/upload')
              }}
            >
              글쓰기
            </SideNavUserBtn>
            <SideNavUserBtn
              onClick={() => {
                setShowSideNav(false);
                navigate('/mypage')
              }}
            >
              마이페이지
            </SideNavUserBtn>
            </SideNavUserBtnContainer>
            </>
          ) : (
            <SideNavLoginBtn
              onClick={() => {
                setModalOpen(true);
                setUpdateModalOpen(true);
                setShowSideNav(false);
              }}
            >
              <ProfileIcon>
                <TbUserQuestion />
              </ProfileIcon>
              로그인해주세요
              <BiChevronRight />
            </SideNavLoginBtn>
          )}
          <SideNavCategoryList>
            {NavCategoryData.map((item) => {
              if (item.name === "더보기") {
                return (
                  <>
                    <SideNavCategoryItem
                      className={showSideNavMoreCate && "active"}
                      onClick={() => {
                        setShowSideNavMoreCate((prev) => {
                          return !prev;
                        });
                      }}
                    >
                      {item.name}
                    </SideNavCategoryItem>
                    <SideNavMoreCateList
                      className={showSideNavMoreCate && "active"}
                    >
                      {NavCategoryData[
                        NavCategoryData.length - 1
                      ].etcCategory.map((item) => {
                        {
                          return (
                            <SideNavCategoryItem
                              onClick={() => {
                                navigate(item.url);
                                setShowSideNav(false);
                              }}
                            >
                              {item.name}
                            </SideNavCategoryItem>
                          );
                        }
                      })}
                    </SideNavMoreCateList>
                  </>
                );
              } else {
                return (
                  <SideNavCategoryItem
                    onClick={() => {
                      navigate(item.url);
                      setShowSideNav(false);
                    }}
                  >
                    {item.name}
                  </SideNavCategoryItem>
                );
              }
            })}
          </SideNavCategoryList>

        </SideNav>
      </SideNavOverlay>
      <NavContainer>
        <NavLeftBox>
          {showSideNavBtn && (
            <SideNavButton
              onClick={() => {
                setShowSideNav(true);
              }}
            >
              <TiThMenu />
            </SideNavButton>
          )}
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
          <NavSearchBox
            onSubmit={(e) => {
              handleSearch(e);
            }}
          >
            <NavSearchInput
              value={searchKeyword}
              onChange={(e) => {
                setSearchKeyword(e.target.value);
              }}
              placeholder="검색어를 입력해주세요"
            />
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
              setIsLoggedIn({
                state: false,
                accessToken: "",
                accessTokenExpiresIn: 0,
                authority: "",
                grantType: "",
                refreshToken: "",
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
