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

import JobService from "../../API/Jobs";
import "./Jobs.scss";
import { Input, Modal, Space } from "antd";

const Jobs = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loadingPosts, setLoadingPosts] = useState(true);

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
        const response = await JobService.getAllJobs();
        setJobs(response?.data);
        setLoadingPosts(false);
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    }

    fetchJobs();
  }, []);

  const handleJobClick = (job) => {
    // Handle click on a job card, set the selected job
    setSelectedJob(job);
  };

  return (
    <React.Fragment>
      <Header />
      <div className="container">
        {loadingPosts ? (
          <>
            <Skeleton height={340} width={340} />
          </>
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={8}>
              <div className="job__up">
                <Typography variant="h4" gutterBottom>
                  Job Board
                </Typography>
                <div className="home__side-input">
                  <TextField
                    className="home__side__innerInput input"
                    required
                    id="outlined-required"
                    placeholder="Create Jobs"
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
                    <Card
                      onClick={() => handleJobClick(job)}
                      className="job-card"
                    >
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
              {selectedJob && (
                <Paper
                  style={{ padding: "20px" }}
                  elevation={3}
                  className="company-info"
                >
                  <Typography variant="h5" gutterBottom>
                    {selectedJob?.companyName}
                  </Typography>
                  <Typography variant="body2" className="company-about">
                    About the Company:
                    <br />
                    {selectedJob?.companyAbout}
                  </Typography>
                  <Typography variant="body2" className="company-location">
                    Location: {selectedJob?.planet}
                  </Typography>
                  <Typography variant="body2" className="company-location">
                    Salary: {selectedJob?.salary}
                  </Typography>
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
    </React.Fragment>
  );
};

export default Jobs;
