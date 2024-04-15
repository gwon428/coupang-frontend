import "../assets/style.css";
import { FaBars } from "react-icons/fa6";

const Header = () => {
    return (
    <>
    <div className="tob-bar container">
      <div className="tob-bar-left">
        <a href="#">즐겨찾기</a>
        <a href="#">입점신청</a>
      </div>
      <div className="tob-bar-right">
        <a href="#">로그인</a>
        <a href="#">회원가입</a>
        <a href="#">고객센터</a>
      </div>
    </div>
    <header className="container">
        <div className="category-btn">
            <FaBars/>
            <p>카테고리</p>
        </div>
    </header>
    </>
    )
};

export default Header;