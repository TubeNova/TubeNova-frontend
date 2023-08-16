import { Link, useNavigate } from "react-router-dom";
import { styled } from "styled-components";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { IoPerson } from "react-icons/io5";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Reviews } from "../data/Reviews";
import MainContentsRow from "../components/MainContentsRow";

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 4rem;
`;
const Footer = styled.footer`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 2rem;
`
const Logo = styled.h1`
    color: ${({theme}) => theme.colors.primary};
    font-size: 1.8rem;
    font-family: "NanumSquareRoundEB";
`
const Info = styled.p`
    color: #333;
    font-size: 0.8rem;
`

export default function Main() {
  return (
    <Container>
        <MainContentsRow contentsTitle="인기 Top 10"/>
        <MainContentsRow contentsTitle="최신 리뷰"/>
        <MainContentsRow contentsTitle="user 님 취향저격 리뷰 🔫❤️" userLikes={true}/>
        <Footer>
            <Logo>TubeNova</Logo>
            <Info>copyright © 2023 TubeNova All Rights Reserved.</Info>
        </Footer>
    </Container>
  );
}