import { useEffect } from "react";
import { useLocation } from "react-router"
import { styled } from "styled-components";

const Container = styled.section`
    
`
const SearchTitle = styled.h1``


export default function Search(){
    const location = useLocation();
    const searchTitle = location.pathname

    useEffect(()=>{
        console.log(decodeURIComponent(location.search.split('?keyword=')[1]))
    },[])
    
    return(<>'search'</>)
}