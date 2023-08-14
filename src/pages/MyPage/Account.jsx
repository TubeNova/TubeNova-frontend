import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const StyledLabel = styled.label`
  margin-bottom: 0.5rem;
  margin-right: 1rem;
  font-weight: bold;
  width: 150px; // 너비를 고정
  display: inline-block; // 블록 요소처럼 너비를 적용
`;

const StyledInput = styled.input`
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  font-size: 1rem;
`;

const InputLabelGroup = styled.div`
  margin: 2rem 0;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
  padding: 10rem;
`;

const SubmitButton = styled.button`
  display: block;
  margin: 2rem auto;
  padding: 1rem 2rem;
  border: none;
  background-color: rgb(228, 228, 228);
  border-radius: 0.5rem;
  font-weight: bolder;
  font-size: 1rem;
  &:hover {
    background-color: #33277c;
    color: white;
  }
`;

const Account = () => {
  const [currentName, setCurrentName] = useState('이름없음');
  const [newName, setNewName] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    setNewName(currentName);
  }, [currentName]);

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };

  const handleCurrentPasswordChange = (e) => {
    setCurrentPassword(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  //서버 통신 파트

  const handleSubmit = async (e) => {
    e.preventDefault();

    const accountData = {
      currentName,
      newName,
      currentPassword,
      newPassword,
    };

    try {
      let response = await axios.post('/api/update-account', accountData);

      if (response.data.success) {
        setCurrentName(response.data.updatedName || currentName);
        alert('계정 정보가 업데이트되었습니다.');
      } else {
        alert(response.data.message || '오류가 발생했습니다.');
      }
    } catch (error) {
      alert('서버 요청 중 오류가 발생했습니다.');
    }

    setNewName('');
    setCurrentPassword('');
    setNewPassword('');
  };

  return (
    <>
      <h1
        style={{
          fontSize: '1.3rem',
          fontWeight: 'bolder',
          marginTop: '1rem',
        }}
      >
        계정 관리
      </h1>
      <Container>
        <form onSubmit={handleSubmit}>
          <InputLabelGroup>
            <StyledLabel>이름</StyledLabel>
            <StyledInput
              type="text"
              value={newName}
              onChange={handleNameChange}
              placeholder="이름 입력"
            />
          </InputLabelGroup>
          <InputLabelGroup>
            <StyledLabel>현재 비밀번호</StyledLabel>
            <StyledInput
              type="password"
              value={currentPassword}
              onChange={handleCurrentPasswordChange}
            />
          </InputLabelGroup>
          <InputLabelGroup>
            <StyledLabel>새 비밀번호</StyledLabel>
            <StyledInput
              type="password"
              value={newPassword}
              onChange={handleNewPasswordChange}
            />
          </InputLabelGroup>
          <SubmitButton type="submit">계정 정보 수정하기</SubmitButton>
        </form>
      </Container>
    </>
  );
};

export default Account;
