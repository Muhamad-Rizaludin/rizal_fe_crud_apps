import React from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from './Carusel';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FeaturedVideoIcon from '@mui/icons-material/FeaturedVideo';
import { Button, Card, CardContent, Grid } from '@mui/material';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useState } from 'react';
import ListUser from '../users/listUser';

export default function HomePage() {
    const navigate = useNavigate();
    const [filter, setFilter] = useState('Semua User');
    function fnHandleChangeFilter(value) {
        setFilter(value)
    }

    const user = JSON.parse(localStorage.getItem('TaskBigio'));

    return ( 
        <>
            { 
                user.role==="superadmin" || user.role==="admin" ?
                <>
                    <Grid container spacing={2} style={{ padding: '30px' }}>
                        <Grid className='container-daftar-jual' container direction="row" justifyContent="left" alignItems="flex-start" spacing={15}>
                            <Grid item md={3} className='pl-0 desktop' style={{
                                paddingRight: '60px'
                            }}>
                                <Card className='pl-0' style={{
                                    paddingBotom:'50px'
                                }}>
                                    <CardContent>
                                        <h4 style={{
                                            marginBlockEnd: 0
                                        }}>Admin Dashboard</h4>
                                        <nav aria-label="main mailbox folders">
                                            <List>
                                                <ListItem disablePadding className="inherit border-bottom" style={{ color: 'blue' }}>
                                                    <ListItemButton selected={filter === "Semua User"} onClick={() => fnHandleChangeFilter("Semua User")} className="inherit">
                                                        <ListItemIcon className="inherit">
                                                            <FeaturedVideoIcon />
                                                        </ListItemIcon>
                                                        <ListItemText primary="List User" className="inherit" />
                                                    </ListItemButton>
                                                </ListItem>
                                            </List>
                                        </nav>
                                        <nav aria-label="main mailbox folders">
                                            <List>
                                                <ListItem disablePadding className="inherit border-bottom" style={{ color: 'blue' }}>
                                                    <ListItemButton selected={filter === "Semua Produk"} onClick={() => fnHandleChangeFilter("Semua Produk")} className="inherit">
                                                        <ListItemIcon className="inherit">
                                                            <FeaturedVideoIcon />
                                                        </ListItemIcon>
                                                        <ListItemText primary="Produk" className="inherit" />
                                                    </ListItemButton>
                                                </ListItem>
                                            </List>
                                        </nav>
                                        <Divider />
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item md={12} className="w-full mobile">
                                <div className='flex justify-center items-center'>
                                    <Button
                                        style={{ marginRight: '10px' }}
                                        startIcon={<FeaturedVideoIcon />}
                                        onClick={() => fnHandleChangeFilter("Semua User")}
                                        variant={filter === "Semua User" ? 'contained' : 'outlined'}>
                                        List User
                                    </Button>
                                    <Button
                                        style={{ marginRight: '10px' }}
                                        startIcon={<FeaturedVideoIcon />}
                                        onClick={() => fnHandleChangeFilter("Semua Produk")}
                                        variant={filter === "Semua Produk" ? 'contained' : 'outlined'}>
                                        List Produk
                                    </Button>
                                </div>
                            </Grid>
                            <Grid item md={9} xs={12}>
                                {
                                    {
                                        "Semua User": <ListUser />,
                                    }[filter]
                                }
                            </Grid>
                        </Grid>
                    </Grid>
                </>
                :
                <>
                    <Grid container spacing={2} style={{ padding: '30px' }}>
                        <Carousel />
                     </Grid> 
                </>
                
                
            }

        </>
    )
}