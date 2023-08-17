import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const NavContainer = styled.div`
  position: fixed;
  left: 0;
  width: 11rem;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 1rem;
`;

const NavLink = styled(Link)`
  border-radius: 1rem;
  margin-bottom: 10px;
  padding: 1rem;
  margin: 1rem;
  font-weight: 900;
  border-bottom: 0.1rem solid rgb(228, 228, 228);
  background-color: ${(props) =>
    props.$noBackgroundChange
      ? 'transparent'
      : props.$isActive
      ? 'lightgray'
      : 'transparent'};
`;

export default function MyPageNav() {
  const location = useLocation();

  return (
    <NavContainer>
      <span
        style={{
          fontSize: '1.5rem',
          border: 'none',
        }}
      >
        MY Page
      </span>
      <NavLink to="/mypage" $isActive={location.pathname === '/mypage'}>
        내가 올린 리뷰
      </NavLink>
      <NavLink
        to="/mypage/likereview"
        $isActive={location.pathname === '/mypage/likereview'}
      >
        공감한 리뷰
      </NavLink>

      <NavLink
        to="/mypage/account"
        $isActive={location.pathname === '/mypage/account'}
      >
        계정관리
      </NavLink>
    </NavContainer>
  );
}
