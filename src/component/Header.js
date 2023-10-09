import React from 'react';
import "./Header.css";

const Header = () => {
  const dateStr = (date) => {
    let week = ['일', '월', '화', '수', '목', '금', '토'];
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let dayName = week[date.getDay()];
    
    return `${year}년 ${month}월 ${day}일 ${dayName}요일`;
  }
  return (
   <div className="Header">
    <h3>오늘은 📆</h3>
    <h1>{dateStr(new Date())}</h1>
   </div>
  );
}

export default React.memo(Header);