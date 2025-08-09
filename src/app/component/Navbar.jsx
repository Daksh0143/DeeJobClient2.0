import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { useRouter } from 'next/navigation';
import { Drawer, List, ListItem, ListItemText, Stack } from '@mui/material';
import { useDispatch } from 'react-redux';
import { logout } from '@/redux/user/user.slice';
import { clearStorage } from '@/Utills/localStorage';


const pages = [
    { name: 'Login', path: '/authentication/login' },
    { name: 'Jobs', path: '/jobs' },
    { name: 'My Jobs', path: '/ownJobs' },
    { name: "Company", path: "/company" }
];
// const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const settings = [
    {
        name: "Profile", path: "/profile",
    },
    { name: "Logout", path: "/authentication/login", action: "logout" }
]

function Navbar() {
    const router = useRouter()
    const dispatch = useDispatch()
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const [drawerOpen, setDrawerOpen] = React.useState(false)

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
        setDrawerOpen(true)
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <AppBar position='sticky' style={{ overflow: "hidden" }} >
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        sx={{
                            mr: 2,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MenuIcon />
                        </IconButton>
                        <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
                            <Box
                                sx={{ width: 250 }}
                                role="presentation"
                            >
                                <Stack
                                    justifyContent="center"
                                    alignItems="center"
                                    flexDirection="column"
                                    // p={3}
                                    bgcolor="primary.main"
                                >
                                    <IconButton sx={{ color: "white", gap: 1 }} >
                                        <AdbIcon />
                                        <Typography variant="h6" textAlign="center" mt={1} color="white">
                                            LOGO
                                        </Typography>
                                    </IconButton>

                                </Stack>
                                <List>
                                    {pages.map((page, index) => (
                                        <ListItem key={index} onClick={() => router.push(page.path)}>
                                            <ListItemText primary={page.name} onClick={() => setDrawerOpen(false)} />
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                        </Drawer>
                    </Box>
                    <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="#app-bar-with-responsive-menu"
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.3rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        LOGO
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page, index) => (
                            <Button
                                key={index}
                                onClick={() => {
                                    handleCloseNavMenu();
                                    router.push(page.path);
                                }}
                                sx={{ my: 2, color: 'white', display: 'block' }}
                            >
                                {page.name}
                            </Button>
                        ))}
                    </Box>
                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            {settings.map((setting) => (
                                <MenuItem key={setting.name} onClick={() => {
                                    handleCloseUserMenu()
                                    if (setting.action === "logout") {
                                        dispatch(logout())
                                        clearStorage()
                                        router.push(setting.path)
                                    } else {
                                        router.push(setting.path)
                                    }
                                }}>
                                    <Typography sx={{ textAlign: 'center' }}>{setting.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                </Toolbar>
            </Container >
        </AppBar >
    );
}
export default Navbar;
