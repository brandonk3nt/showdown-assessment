import { NavLink } from "react-router-dom";
import styled from "styled-components";


const MenuLlink = styled(NavLink)`
  background: none;
  color: #fff;
  padding: 2px 4px;
  border-radius: 0;
  text-decoration: none;
  font-size: 16px;
  transition: color 0.3s ease;

  &:hover, &.active {
    color: #FFC627;
    border: none;
    background: none;
  }

  &:hover {
    text-decoration: underline;
  }
`;

const Header = () => {
  return (
    <header className="absolute top-0 left-0 w-full">
      <nav className="container mx-auto flex gap-6 py-8 px-4">
        <MenuLlink
          to="/"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Model Show Down
        </MenuLlink>
        {/* <MenuLlink
          to="/leaderboard"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Leaderboard
        </MenuLlink> */}
      </nav>
    </header>
  );
};

export default Header;
