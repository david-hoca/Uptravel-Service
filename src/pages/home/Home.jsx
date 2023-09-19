import React, { useEffect, useState } from "react";
import Banner from "../../shared/assets/images/home-banner.png";
import Alien from "../../shared/assets/images/snoo-home-alien.png";
import { Header } from "../../widgets/header/Header";
import PostService from "../../API/Posts";
import { Link, useNavigate } from "react-router-dom";
import "./Home.scss";

// ANT DESIGN
import { Button, Space } from "antd";
import { Modal, Input } from "antd";

// MUI
import { TextField } from "@mui/material";
import CollectionsOutlinedIcon from "@mui/icons-material/CollectionsOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import MarkChatUnreadOutlinedIcon from "@mui/icons-material/MarkChatUnreadOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import Skeleton from "@mui/material/Skeleton";
import AutorenewOutlinedIcon from "@mui/icons-material/AutorenewOutlined";

// const token = localStorage.getItem("token");

export const Home = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [postTitle, setPostTitle] = useState("");
  const [postContent, setPostContent] = useState("");
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchAllPosts() {
      try {
        const response = await PostService.getAllContent();
        console.log(response);
        setPosts(response.data);
        setLoadingPosts(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    }

    fetchAllPosts();
  }, []);

  const navigate = useNavigate();
  const showModal = () => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    } else {
      setIsModalVisible(true);
    }
  };

  const handleOk = async () => {
    // Create an object with the post data
    const newPost = {
      title: postTitle,
      text: postContent,
    };

    await PostService.postContent(newPost);
    setIsModalVisible(false);
    setPostTitle("");
    setPostContent("");
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <React.Fragment>
      <Header />
      <section className="home">
        <div className="container">
          {/* BOTTOM SECTION */}
          <section className="home__side">
            <div>
              <div className="home__side-inner">
                <div className="home__side-input">
                  <TextField
                    className="home__side__innerInput"
                    required
                    id="outlined-required"
                    placeholder="Create Post"
                    onClick={showModal}
                    inputProps={{
                      style: { width: "350px", height: "20px" },
                    }}
                  />
                  <div className="home__side-groupIcon">
                    <div onClick={showModal} className="home__ic">
                      <CollectionsOutlinedIcon className="home__side-galleryIcon" />
                    </div>
                    <div onClick={showModal} className="home__ic">
                      <AttachFileOutlinedIcon className="home__side-attachIcon" />
                    </div>
                  </div>
                </div>
                {posts ? (
                  ""
                ) : (
                  <em className="home__italicText">
                    <AutorenewOutlinedIcon /> Please log in to your account, to
                    access the full page..
                  </em>
                )}
              </div>
              {/* BLOGS POSTS */}
              <section className="posts">
                {loadingPosts ? (
                  <>
                    <Skeleton height={100} width={400} />
                    <Skeleton height={100} width={400} />
                    <Skeleton height={100} width={400} />
                  </>
                ) : (
                  posts?.map((post) => (
                    <div key={post._id} className="posts__inner">
                      <span className="posts__by">
                        {post.owner?.email} ·{" "}
                        <span className="posts__namePost">
                          Posted by 3 hours ago
                        </span>
                      </span>
                      <span className="posts__title">{post.title}</span>
                      <span className="posts__text">{post.text}</span>
                      <div className="posts__actions">
                        <span className="posts__actionItem">
                          <MarkChatUnreadOutlinedIcon className="posts__mark" />
                          {post.comments.length} Comments
                        </span>
                        <span className="posts__actionItem">
                          <ShareOutlinedIcon className="posts__mark" />
                          Share
                        </span>
                        <span className="posts__actionItem">
                          <FavoriteBorderOutlinedIcon className="posts__mark" />
                          {post.likes.length} Likes
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </section>
            </div>
            <div className="home__side-right">
              <div className="home__side-up">
                <img
                  className="home__side-smallBanner"
                  src={Banner}
                  alt="banner"
                />
                <div className="home__side-innerBanner">
                  <div className="home__side-alien">
                    <img
                      className="home__side-alienPic"
                      src={Alien}
                      alt="alien"
                      width={45}
                    />
                    <span>Home</span>
                  </div>
                  <div className="home__side-alienTextWrap">
                    <p>
                      Your personal Uptravel frontpage. Come here to check in
                      with your favorite communities.
                    </p>
                  </div>
                  <Button
                    className="home__side-postCreate"
                    type="primary"
                    onClick={showModal}
                  >
                    Create Post
                  </Button>
                  <Link to={"/traveling"}>
                    <Button
                      variant="outlined"
                      className="home__side-postCreate"
                    >
                      Traveling opportunities
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="home__footer">
                <div className="home__footer-wrapper">
                  <ul className="home__footer-list">
                    <div>
                      <li>
                        <a href="#">User Agreement</a>
                      </li>
                      <li>
                        <a href="#">Privacy Policy</a>
                      </li>
                    </div>
                    <div>
                      <li>
                        <a href="#">Content Policy</a>
                      </li>
                      <li>
                        <a href="#">Moderator Code of Conduct</a>
                      </li>
                    </div>
                  </ul>
                  <ul className="home__footer-langList">
                    <li>
                      <a href="#">English</a>
                    </li>
                    <li>
                      <a href="#">Korea</a>
                    </li>
                    <li>
                      <a href="#">Русский</a>
                    </li>
                    <li>
                      <a href="#">Kazakh</a>
                    </li>
                  </ul>
                  <span className="home__footer-copyrightSym">
                    Uptravel, Inc. © 2023. All rights reserved.
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>
      <Modal
        title="Create Post"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Create
          </Button>,
        ]}
      >
        <Input
          placeholder="Title"
          v
          alue={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
          style={{ marginBottom: "16px" }}
        />
        <Input.TextArea
          placeholder="Post Content"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          style={{ marginBottom: "16px" }}
        />
        <Space>
          <Button>Upload Image</Button>
          <Button>Add Tags</Button>
        </Space>
      </Modal>
    </React.Fragment>
  );
};
