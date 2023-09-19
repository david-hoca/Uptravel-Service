import React from "react";
import Logo from "../../shared/assets/images/uptravel-logo.jpg";
import "./Header.scss";
import { Link } from "react-router-dom";
import { Dropdown, Menu } from "antd";
import { LogoutOutlined } from "@ant-design/icons";

const token = localStorage.getItem("token");

export const Header = () => {
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.replace("/login");
  };

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Link to={"/profile"}>Profile</Link>
      </Menu.Item>
      <Menu.Item key="2" onClick={handleLogout} className="danger-menu-item">
        Log out <LogoutOutlined />
      </Menu.Item>
    </Menu>
  );

  return (
    <React.Fragment>
      <div className="home">
        <div className="container">
          <div className="home__inner">
            <Link to={"/"}>
              <img src={Logo} alt="logo" width={150} height={130} />
            </Link>
            <div className="home__link">
              <ul className="home__list">
                <li className="home__item">
                  <Link className="home__navlink" to={"/jobs"}>
                    Jobs
                  </Link>
                </li>
                <li className="home__item">
                  <Link className="home__navlink" to={"/traveling"}>
                    Traveling
                  </Link>
                </li>
                <li className="home__item">
                  <Link className="home__navlink" to={"/traveling"}>
                    Contact us
                  </Link>
                </li>
              </ul>
              {token ? (
                <Dropdown overlay={menu} placement="bottomRight">
                  <span className="home__logout-button">User</span>
                </Dropdown>
              ) : (
                <Link className="home__login" variant="outlined" to={"/login"}>
                  Log in
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
