import React, { useEffect, useState } from "react";
import { Header } from "../../widgets/header/Header";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Paper,
  Divider,
  Button,
  TextField,
} from "@mui/material";
import CollectionsOutlinedIcon from "@mui/icons-material/CollectionsOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import Skeleton from "@mui/material/Skeleton";

import TravelService from "../../API/Travels";
import "./Traveling.scss";
import { Input, Modal, Space } from "antd";

const Jobs = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [jobs, setJobs] = useState([]);
    const [selectedTravel, setSelectedTravel] = useState(null);
  const [loadingJobs, setLoadingJobs] = useState(true);
  const [travels, setTravels] = useState([]);
  const [loadingTravels, setLoadingTravels] = useState(true);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    // Fetch job data from your API when the component mounts
    async function fetchJobs() {
      try {
        const response = await TravelService.getTravels();
        setJobs(response.data);
        setLoadingJobs(false);
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    }

    // Fetch travel data from your API when the component mounts
    async function fetchTravels() {
      try {
        const response = await TravelService.getTravels();
        setTravels(response.data);
        setLoadingTravels(false);
      } catch (error) {
        console.error("Error fetching travel data:", error);
      }
    }

    fetchJobs();
    fetchTravels();
  }, []);

  // Define the handleTravelClick function
  const handleTravelClick = (travel) => {
    setSelectedTravel(travel);
  };

  return (
    <React.Fragment>
      <Header />
      <div className="container">
        {loadingJobs ? (
          <Skeleton height={340} width={340} />
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={8}>
              <div className="job__up">
                <Typography variant="h4" gutterBottom>
                  Traveling Worldwide
                </Typography>
                <div className="home__side-input">
                  <TextField
                    className="home__side__innerInput input"
                    required
                    id="outlined-required"
                    placeholder="Create Travels"
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
              </div>
              <Divider />
              <Grid container spacing={2}>
                {jobs?.map((job) => (
                  <Grid
                    style={{ marginTop: "20px" }}
                    item
                    xs={12}
                    sm={6}
                    md={4}
                    className="job-wrapper"
                    key={job?._id}
                  >
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
                  </Grid>
                ))}
              </Grid>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              {selectedTravel && (
                <Paper
                  style={{ padding: "20px" }}
                  elevation={3}
                  className="company-info"
                >
                  <Typography variant="h5" gutterBottom>
                    From {selectedTravel?.from} To {selectedTravel?.to}
                  </Typography>
                  <Typography variant="body2" className="company-about">
                    Where: {selectedTravel?.from}
                    <br />
                    To: {selectedTravel?.to}
                  </Typography>
                  <Typography variant="body2" className="company-location">
                    Start date: {selectedTravel?.startDate}
                  </Typography>
                  <Typography variant="body2" className="company-location">
                    Arrive date: {selectedTravel?.arriveDate}
                  </Typography>
                  {/* Add more company details as needed */}
                </Paper>
              )}
            </Grid>
          </Grid>
        )}
      </div>
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
        <Input placeholder="Title" style={{ marginBottom: "16px" }} />
        <Input.TextArea
          placeholder="Post Content"
          style={{ marginBottom: "16px" }}
        />
        <Space>
          <Button>Upload Image</Button>
          <Button>Add Tags</Button>
        </Space>
      </Modal>

      <div className="container">
        {loadingTravels ? (
          <Skeleton height={340} width={340} />
        ) : (
          <Grid container spacing={2}>
            {travels?.map((travel) => (
              <Grid
                style={{ marginTop: "20px" }}
                item
                xs={12}
                sm={6}
                md={4}
                className="job-wrapper"
                key={travel?._id}
              >
                <Card
                  onClick={() => handleTravelClick(travel)}
                  className="job-card"
                  style={{ pointerEvents: "auto" }}
                >
                  <CardContent>
                    <Typography
                      variant="h6"
                      component="div"
                      className="job-title"
                    >
                      {travel?.from} to {travel?.to}
                    </Typography>
                    <Typography variant="subtitle1" className="company-name">
                      Price: {travel?.price}
                    </Typography>
                    <Typography variant="body2" className="salary">
                      Start Date: {travel?.startDate}
                    </Typography>
                    <Typography variant="body2" className="planet">
                      Arrive Date: {travel?.arriveDate}
                    </Typography>
                    <div className="job__cardButton">
                      <Button>More info</Button>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    </React.Fragment>
  );
};

export default Jobs;
