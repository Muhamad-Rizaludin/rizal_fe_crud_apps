import {
  Box, CardMedia, FormControl, Grid, InputLabel, MenuItem, TextField
} from '@mui/material';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Button,IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import * as React from 'react';
import { useAlert } from 'react-alert';
import { useLocation, useNavigate } from 'react-router-dom';
import UserAddHeader from '../../layout/UserAddHeader';
import API from '../api.json';
import './EditUser.css';
import arrow from '../../images/fi_arrow-left.png';
const jwtToken = JSON.parse(localStorage.getItem('TaskBigio'))?.Token;
const profile = JSON.parse(localStorage.getItem('TaskBigio'));
const Input = styled('input')({
  display: 'none',
});

const AddUser = () => {
  

return (
  <div style={{
      maxHeight: "100vh",
      overflowY: "auto",
      overflowX: "hidden",
  }}>
      <UserAddHeader />
      <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
          <CircularProgress color="inherit" />
      </Backdrop>
      <Grid container spacing={0} style={{ marginTop: '10px', paddingBottom: '3px', width: '100%' }}>
          <Grid item xs={12} className={'relative justify-center items-center'} >
              <Grid container spacing={0}>
                  <Grid item xs={2} className={'flex justify-center items-center desktop'}>
                      <div className='desktop cursor-pointer absolute' style={{ marginLeft: '8.3rem', top: '5rem' }} >
                          <CardMedia
                              component="img"
                              image={arrow}
                              alt="cek"
                          />
                      </div>
                  </Grid>
                  <Grid item xs={7.7} className={"flex justify-center items-center"}>
                      <div className='block cekWidth'>
                          <div style={{marginTop:'50px', marginBottom: '10px' }}>
                              <InputLabel htmlFor="outlined-adornment-password" sx={{
                                  fontFamily: 'Poppins',
                                  fontstyle: 'normal',
                                  fontWeight: ' 400',
                                  fontSize: '12px',
                                  color: '#000000',
                                  marginBottom: '20px'

                              }}>Username
                              </InputLabel>
                              <FormControl className='cekWidthForm' variant="outlined">
                                  <OutlinedInput 
                                      type={"text"}
                                      autoComplete="off"
                                  />
                              </FormControl>
                              
                          </div>
                          
                          <div style={{ marginBottom: '10px' }}>
                              <InputLabel htmlFor="outlined-adornment-password" sx={{
                                  fontFamily: 'Poppins',
                                  fontstyle: 'normal',
                                  fontWeight: ' 400',
                                  fontSize: '12px',
                                  color: '#000000',
                                  marginBottom: '20px'

                              }}>Email
                              </InputLabel>
                              <FormControl className='cekWidthForm' variant="outlined">
                                  <OutlinedInput
                                      id={"email"}
                                      type={"text"}
                                      autoComplete="off"
                                  />
                              </FormControl>
                              
                          </div>

                          <div style={{ marginBottom: '10px' }}>
                              <InputLabel htmlFor="outlined-adornment-password" sx={{
                                  fontFamily: 'Poppins',
                                  fontstyle: 'normal',
                                  fontWeight: ' 400',
                                  fontSize: '12px',
                                  color: '#000000',
                                  marginBottom: '20px'

                              }}>Role
                              </InputLabel>
                              <FormControl className='cekWidthForm' variant="outlined">
                                  <OutlinedInput
                                      id={"email"}
                                      type={"text"}
                                      autoComplete="off"
                                  />
                              </FormControl>
                              
                          </div>

                          <div style={{marginBottom: '10px' }}>
                              <InputLabel htmlFor="outlined-adornment-password" sx={{
                                  fontFamily: 'Poppins',
                                  fontstyle: 'normal',
                                  fontWeight: ' 400',
                                  fontSize: '12px',
                                  color: '#000000',
                                  marginBottom: '20px'

                              }}>Password
                              </InputLabel>
                              <FormControl className='cekWidthForm' variant="outlined">
                                  <OutlinedInput
                                      id="{outlined-adornment-password}"
                                      params={"password"}
                                      autoComplete="off"
                                      endAdornment={
                                          <InputAdornment position="start">
                                              <IconButton
                                                  aria-label="toggle password visibility"
                                                  edge="end"
                                              >
                                                  <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />
                                              </IconButton>
                                          </InputAdornment>
                                      }

                                  />
                              </FormControl>
                          </div>

                          <div style={{ paddingTop: '10px', marginBottom: '50px' }}>
                              <Button
                                  style={{}}
                                  className='cekWidthForm custom-button'
                                  variant="contained" color="primary">
                                  Simpan
                              </Button>
                          </div>
                      </div>
                  </Grid>
              </Grid>

          </Grid>
      </Grid>

  </div >
)
}

export default AddUser;
