"use client";
import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  Divider,
  Button,
  CircularProgress,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { profileAction } from "@/redux/user/user.middleware";

const Profile = () => {
  const dispatch = useDispatch();
  const [profileDetails, setProfileDetails] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    dispatch(profileAction())
      .then((result) => {
        setProfileDetails(result.payload.data);
      })
      .catch((err) => {
        console.log("ERROR", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      //   m={2}
      height={"100%"}
      //   bgcolor="red"
    >
      {/* <Grid
        item
        size={{ xs: 11, sm: 8, md: 6, lg: 12 }}
        bgcolor={"red"}
        display="flex"
        justifyContent="center"
      > */}
      <Card sx={{ p: 3, borderRadius: 4, boxShadow: 3 }}>
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar
            alt="User Name"
            src="/static/images/avatar/1.jpg"
            sx={{ width: 100, height: 100, mb: 2 }}
          />
          <Typography variant="h5" gutterBottom>
            {profileDetails?.name}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {profileDetails.role}
          </Typography>
        </Box>

        <Divider sx={{ my: 3 }} />

        <CardContent>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Email: {profileDetails.email}
          </Typography>
          <Typography variant="body2" color="text.secondary" gutterBottom>
            Phone: {profileDetails.phone}
          </Typography>
        </CardContent>

        {/* <Box mt={3} display="flex" justifyContent="center">
                        <Button variant="contained" color="primary">
                            Edit Profile
                        </Button>
                    </Box> */}
      </Card>
      {/* </Grid> */}
    </Box>
  );
};

export default Profile;
