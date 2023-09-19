import React, { useState, useEffect } from "react";
import { Header } from "../../widgets/header/Header";
import "./Profile.scss";
import HomeIcon from "@mui/icons-material/Home";
import UserService from "../../API/User";
import PostService from "../../API/Posts";
// MUI
import AirlineStopsOutlinedIcon from "@mui/icons-material/AirlineStopsOutlined";
import { Tabs, Tab, Box, Typography, Button, CardContent } from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import MarkChatUnreadOutlinedIcon from "@mui/icons-material/MarkChatUnreadOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import DoDisturbOutlinedIcon from "@mui/icons-material/DoDisturbOutlined";
import Skeleton from "@mui/material/Skeleton";
import { Card } from "antd";
import { Link } from "react-router-dom";

export const Profile = () => {
  const [fullNameInput, setFullNameInput] = useState("");
  const [imageInput, setImageInput] = useState(null);
  const [activeTab, setActiveTab] = useState(0);
  const [loadingUserData, setLoadingUserData] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);

  // Define state variables for user data and form inputs
  const [userData, setUserData] = useState({
    email: "",
    fullName: "",
    img: "",
    posts: [],
    jobs: [],
    travel: [],
  });

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    async function fetchUserProfile() {
      try {
        const response = await UserService.getProfile();
        const { data } = response.data;
        setUserData(data);
        setFullNameInput(data.fullName);
        setLoadingUserData(false);
        setLoadingPosts(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }

    fetchUserProfile();
  }, []);

  // Function to handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("fullName", fullNameInput);
      if (imageInput) {
        formData.append("img", imageInput);
      }

      await UserService.putProfile(formData);

      const response = await UserService.getProfile();
      const { data } = response.data;
      setUserData(data);
      setLoadingPosts(false);
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  // TabPanel component to conditionally render tab content
  function TabPanel(props) {
    const { children, value, index } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`tabpanel-${index}`}
        aria-labelledby={`tab-${index}`}
      >
        {value === index && <Box p={3}>{children}</Box>}
      </div>
    );
  }

  const handleRemovePost = async (post) => {
    try {
      const response = await PostService.deleteMyContent(post._id);
      if (response.status === 200) {
        const updatedUserData = response.data.data;
        setUserData({ ...userData, posts: updatedUserData.posts });
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <React.Fragment>
      <Header />
      <div className="profile">
        <div className="container">
          <Tabs
            value={activeTab}
            onChange={handleTabChange}
            indicatorColor="primary"
            textColor="primary"
          >
            <Tab label="My Posts" />
            <Tab label="My Jobs" />
            <Tab label="My Travels" />
          </Tabs>
          <Link className="login__home home" to={"/home"}>
            {" "}
            <HomeIcon /> <span>Home</span>
          </Link>
          {/* Tab content */}
          <div className="tab">
            {/* POSTS PANEL */}
            <TabPanel value={activeTab} index={0}>
              {/* Content for "My Posts" tab */}
              {loadingPosts ? (
                <>
                  <Skeleton height={100} width={400} />
                  <Skeleton height={100} width={400} />
                  <Skeleton height={100} width={400} />
                </>
              ) : (
                userData.posts.map((post) => (
                  <div key={post._id} className="post">
                    <div className="comment">
                      <div className="comment__wrapper">
                        <AccountCircleOutlinedIcon />
                        <span className="comment__author">You</span>
                        <span className="comment__date"> Just now</span>
                      </div>
                      <div
                        style={{ border: "1px solid #f1f1f1" }}
                        className="posts__actions comment__actions"
                      >
                        <span className="posts__actionItem">
                          <MarkChatUnreadOutlinedIcon className="posts__mark" />
                          {userData?.posts[0].comments?.length} Comments
                        </span>
                        <span className="posts__actionItem">
                          <ShareOutlinedIcon className="posts__mark" />
                          Share
                        </span>
                        <span className="posts__actionItem">
                          <FavoriteBorderOutlinedIcon className="posts__mark" />
                          {userData?.posts[0].likes?.length} Likes
                        </span>
                        <span
                          onClick={handleRemovePost}
                          className="posts__actionItem"
                        >
                          <DoDisturbOutlinedIcon className="posts__mark" />
                          Remove
                        </span>
                      </div>
                      <Typography variant="h5">{post.title}</Typography>
                      <Typography className="comment__text">
                        {post.text}
                      </Typography>
                    </div>
                  </div>
                ))
              )}
            </TabPanel>
            {/* JOBS PANEL */}
            <TabPanel value={activeTab} index={1}>
              {userData.jobs.map((job) => (
                <div key={job._id} className="job">
                  <div className="job__info">
                    <Card className="job-card">
                      <CardContent>
                        <Typography
                          variant="h6"
                          component="div"
                          className="job-title"
                        >
                          {job?.jobTitle}
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          className="company-name"
                        >
                          {job?.companyName}
                        </Typography>
                        <Typography variant="body2" className="salary">
                          Salary: {job?.salary}
                        </Typography>
                        <Typography variant="body2" className="planet">
                          Planet: {job?.planet}
                        </Typography>
                      </CardContent>
                      <div className="job__cardButton">
                        <Button>More info</Button>
                      </div>
                    </Card>
                  </div>
                </div>
              ))}
            </TabPanel>
            {/* TRAVEL PANEL */}
            <TabPanel value={activeTab} index={2}>
              {/* Content for "My Travels" tab */}
              {userData.travel.map((travel) => (
                <div key={travel._id} className="travel">
                  <Typography variant="h6">{travel.destination}</Typography>
                  <Typography>{travel.description}</Typography>
                </div>
              ))}
            </TabPanel>
          </div>
          <h3 className="profile__posts">Pinned Posts</h3>
          <div className="profile__wrapper">
            <div className="profile__inner">
              <AirlineStopsOutlinedIcon style={{ fontSize: "50px" }} />
              <p className="profile__quote">Show off that karma!</p>
              <p className="profile__pin">
                Pin a post from your feed using the "..." at the bottom of each
                post
              </p>
            </div>
            <div className="profile__fetched">
              <div className="profile__user-info">
                <img
                  src={userData.img}
                  alt={userData.fullName}
                  className="profile__user-avatar"
                />
                <div className="profile__user-details">
                  <h2 className="profile__user-name">{userData.fullName}</h2>
                  <p className="profile__user-email">{userData.email}</p>
                </div>
              </div>
              <div className="profile__user-stats">
                <div className="profile__user-stat">
                  <span className="profile__stat-label">Posts</span>
                  <span className="profile__stat-count">
                    {userData.posts.length}
                  </span>
                </div>
                <div className="profile__user-stat">
                  <span className="profile__stat-label">Jobs</span>
                  <span className="profile__stat-count">
                    {userData.jobs.length}
                  </span>
                </div>
                <div className="profile__user-stat">
                  <span className="profile__stat-label">Travel</span>
                  <span className="profile__stat-count">
                    {userData.travel.length}
                  </span>
                </div>
              </div>
            </div>
            <div className="profile__edit-form">
              <h3>Edit Profile</h3>
              <form onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label htmlFor="fullName">Full Name</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    value={fullNameInput}
                    onChange={(e) => setFullNameInput(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="image">Profile Image</label>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={(e) => setImageInput(e.target.files[0])}
                  />
                </div>
                <button type="submit">Save Changes</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
