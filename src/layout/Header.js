import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import ListIcon from '@mui/icons-material/List';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { Grid,TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Popover from '@mui/material/Popover';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useAlert } from 'react-alert';
import { Link, useLocation, useNavigate } from 'react-router-dom';
const profile = JSON.parse(localStorage.getItem('TaskBigio'));


export default function HeaderPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);



    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;


    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleClickUser = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUser = () => {
        setAnchorElUser(null);
    };

    const openUser = Boolean(anchorElUser);

    function fnLogout() {
        localStorage.removeItem('TaskBigio');
        window.location.href = '/login';
    }


    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };
    const list = (anchor) => (
        <Box
            sx={{ width: 250, padding: '20px', borderRadius: '0px' }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <Typography variant={'h6'}>
                <b>
                    <Link to={"/"} style={{ color: "#000" }}>
                        Second Hand
                    </Link>
                </b>
            </Typography>
            <List>
                {profile ?
                    <>
                        <ListItem disablePadding>
                            <ListItemButton onClick={() => {
                                navigate('/user/account')
                            }}>
                                <ListItemText style={{ color: 'black' }} primary={'Akun Saya'} />
                            </ListItemButton>
                        </ListItem>
                    </>
                    :
                    <ListItem disablePadding>
                        <ListItemButton>
                            <Link to={"/login"}>
                                <ListItemText style={{ color: 'black' }} primary={'Login'} />
                            </Link>
                        </ListItemButton>
                    </ListItem>
                }

            </List>
        </Box>
    );
    return (
        <Grid container spacing={2} style={{ margin: '5px', paddingBottom: '15px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.15)' }}>
            <Grid item md={2} xs={1} className={'mobile'}>
                <div className='flex justify-center items-center '>
                    <IconButton onClick={toggleDrawer('left', true)}>
                        <ListIcon style={{ fontSize: "30px", marginTop: '5px' }} />
                    </IconButton>
                </div>
                <div>
                    <SwipeableDrawer
                        style={{ borderRadius: '0px' }}
                        anchor={'left'}
                        open={state['left']}
                        onClose={toggleDrawer('left', false)}
                        onOpen={toggleDrawer('left', true)}
                    >
                        {list('left')}
                    </SwipeableDrawer>
                </div>
            </Grid>
            <Grid item xs={2} className={'flex justify-center items-center desktop'}>
                <Link to={"/"}>
                    <div style={{
                        backgroundColor: '#4B1979',
                        width: '100px',
                        height: '34px',
                        left: '136px',
                        top: '27px',
                        margin: '10px'
                    }}>
                    </div>
                </Link>
            </Grid>
            <Grid item md={8} xs={10} className={'flex items-center'}>
                <div className='relative w-full'>
                    <TextField
                        className='search-input'
                        size="small"
                        variant="outlined"
                        placeholder='Cari di sini...'
                        style={{
                            borderRadius: '16px'
                        }}
                    />
                </div>
            </Grid>
            <Grid item xs={2} className={'desktop'}>
                <div className='flex items-center'>
                    {profile?.token ?
                        <>
                            <div className='icon-header'>
                                <IconButton onClick={handleClickUser}>
                                    <PersonOutlineIcon />
                                </IconButton>

                                <Popover
                                    open={openUser}
                                    anchorEl={anchorElUser}
                                    onClose={handleCloseUser}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                >
                                    <List>
                                        <ListItem disablePadding style={{ width: '150px' }}>
                                            <ListItemButton onClick={() => {
                                                navigate('/users/profile/', { state: { profile: profile } })
                                            }}>
                                                <ListItemIcon style={{ minWidth: '40px' }}>
                                                    <AssignmentIndIcon />
                                                </ListItemIcon>
                                                Profile
                                            </ListItemButton>
                                        </ListItem>
                                        <ListItem disablePadding style={{ width: '150px' }}>
                                            <ListItemButton
                                                onClick={() => {
                                                    fnLogout();
                                                }}>
                                                <ListItemIcon style={{ minWidth: '40px' }}>
                                                    <LogoutIcon />
                                                </ListItemIcon>
                                                Logout
                                            </ListItemButton>
                                        </ListItem>
                                    </List>
                                </Popover>
                            </div>
                        </>
                        :
                        <div className='icon-header desktop'>
                            <Link to={"/login"}>
                                <Button variant="contained" startIcon={<LoginIcon />}>Masuk</Button>
                            </Link>
                        </div>
                    }
                </div>
            </Grid>
            
        </Grid>
        
    )
};