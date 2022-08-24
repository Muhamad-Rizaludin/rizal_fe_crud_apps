import React from 'react'
import { Grid, CardMedia } from '@mui/material';
import arrow from '../images/fi_arrow-left.png';
import { Link, useNavigate } from 'react-router-dom';

const ProfileHeader = () => {
    const navigate = useNavigate();
    return (
        <div>
            <Grid container spacing={2} style={{ margin: '5px', paddingBottom: '15px', boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.15)' }}>
                <Grid item xs={2} className={'flex justify-center items-center desktop'}>
                    <Link className="desktop" to={"/"}>
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
                <Grid item xs={8} className={'flex justify-center items-center'}>
                    <div className='desktop'>

                        <span className={'spanMargin'}>
                            Edit User
                        </span>
                    </div>
                    <div className='mobile'>
                        <Grid container spacing={0}>
                          
                            <Grid item xs={12} className={'flex justify-center items-center'}>
                                <div onClick={() => {navigate(-1)}} className='cursor-pointer mobile'>
                                    <CardMedia
                                        component="img"
                                        image={arrow}
                                        alt="cek"
                                    />
                                </div>
                                <span className={'spanMargin'}>
                                    Edit User
                                </span>
                            </Grid>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
        </div>
    )
}

export default ProfileHeader