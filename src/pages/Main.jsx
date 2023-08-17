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
import { useRecoilValue } from "recoil";
import { LoginStateAtom } from "../atom";
import axios from "axios";

const Container = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 4rem;
`;



export default function Main() {
  const {accessToken} = useRecoilValue(LoginStateAtom)
  const [popularReviewData, setPopularReviewData] = useState([]);
  const [recentReviewData, setRecentReviewData] = useState([]);
  
  const getPopularReview = async() => {
    await axios({
      method: "get",
      url: `/reviews/weekly-popularity`,
    }).then(function (response) {
      console.log("getPopularReview")
      console.log(response.data)
      setPopularReviewData(response.data)
    }).catch((e) => {
    })
  }
  const getRecentReview = async() => {
    await axios({
      method: "get",
      url: `/reviews/latest`,
    }).then(function (response) {
      console.log("getRecentReview")
      console.log(response.data.content)
      setRecentReviewData(response.data.content)
    }).catch((e) => {
    })
  }


  useEffect(()=>{
    getPopularReview()
    getRecentReview()
  },[])
  return (
    <Container>
        <MainContentsRow contentsTitle="인기 Top 10" data={popularReviewData}/>
        <MainContentsRow contentsTitle="최신 리뷰" data={recentReviewData}/>
        {/* <MainContentsRow contentsTitle="user 님 취향저격 리뷰 🔫❤️" userLikes={true}/> */}
    </Container>
  );
}