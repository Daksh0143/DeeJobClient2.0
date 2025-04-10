import React from 'react';
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Grid,
    Typography,
    Divider,
    Button,
} from '@mui/material';

const Profile = () => {
    return (
        <Grid
            container
            xs={12}
            display="flex"
            justifyContent="center"
            alignItems="center"
            m={2}
            // minHeight="100vh"
            // bgcolor="#f5f5f5"
            bgcolor="red"
        >
            <Grid
                xs={11}
                sm={8}
                md={6}
                lg={4}
                display="flex"
                justifyContent="center"
            >
                <Card sx={{ p: 3, borderRadius: 4, boxShadow: 3, width: '100%' }}>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Avatar
                            alt="User Name"
                            src="/static/images/avatar/1.jpg"
                            sx={{ width: 100, height: 100, mb: 2 }}
                        />
                        <Typography variant="h5" gutterBottom>
                            John Doe
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                            Frontend Developer
                        </Typography>
                    </Box>

                    <Divider sx={{ my: 3 }} />

                    <CardContent>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            Email: johndoe@example.com
                        </Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            Phone: +1 234 567 890
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Location: New York, USA
                        </Typography>
                    </CardContent>

                    <Box mt={3} display="flex" justifyContent="center">
                        <Button variant="contained" color="primary">
                            Edit Profile
                        </Button>
                    </Box>
                </Card>
            </Grid>
        </Grid>
    );
};

export default Profile;
