import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {
    Button, Grid, Link, FormControl,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput
} from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import * as React from 'react';
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import API from '../api.json';


export default function LoginPage() {
    const navigate = useNavigate();
    const [datas, setDatas] = React.useState({})
    const [error, setError] = React.useState({})
    const alert = useAlert()
    const fnHandleChange = (label, value) => {
        setError({
            ...error,
            [label]: false
        })
        setDatas({
            ...datas,
            [label]: value
        })
    };

    const validateEmail = (email) => {
        if (!email) {
            return false;
        } else {
            return email.match(
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        }
    };
    function fnValidate(email = null, password = null) {
        let params = {
            email: email?.value || datas.email || "",
            password: password?.value || datas.password || "",
        }
        if (validateEmail(params.email) && params.password) {
            setOpen(true);
            fnLogin(params);
        } else {
            setError({
                ...error,
                email: validateEmail(params.email) ? false : true,
                password: params.password ? false : true
            })
        }
    }
    function fnLogin(data) {
        let params = {
            email: data.email,
            password: data.password,
        }
        axios.post(API.server + "user/login", params).then(res => {
            setOpen(false);
            localStorage.setItem("TaskBigio", JSON.stringify(res?.data?.data));
            window.location.href = "/";
        }
        ).catch(err => {
            setOpen(false);
            alert.show('Error: please check again!', {
                type: 'error',
            })
        });
    }

    React.useEffect(() => {
        const keyDownHandler = event => {
            if (event.key === 'Enter') {
                event.preventDefault();
                let email = document.getElementById('email');
                let password = document.getElementById('password');
                fnValidate(email, password);
            }
        };

        document.addEventListener('keydown', keyDownHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };

    }, []);

    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };

    const handleClickShowPassword = () => {
        setDatas({
            ...datas,
            showPassword: !datas.showPassword,
        });
    };


    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <>
        <div className={'bglogin'}>
        
            <Backdrop
                sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
                onClick={handleClose}
            >
                <CircularProgress color="inherit" />
            </Backdrop>
            <Grid container className={'mobile'}>
                <Grid className="mobile" item xs={12} style={{ marginTop: '12px', marginLeft: '30px' }}>
                    <Link to={'/'}>
                        <ArrowBackRoundedIcon />
                    </Link>
                </Grid>
            </Grid>
            <Grid container style={{ padding: '0px', margin: '0px' }}>
                <Grid className="desktop" item xs={12} md={6}>
                   
                </Grid>

                <Grid item md={6} xs={12} className={"flex justify-center items-center"}>
                    <div className={"block loginGrid-block login-container"} style={{ width: '100%', marginTop:'20px'}}>
                        <h2>
                            Masuk
                        </h2>
                        
                        <div style={{ marginBottom: '20px' }}>
                            <InputLabel htmlFor="outlined-adornment-password" sx={{
                                fontFamily: 'Poppins',
                                fontstyle: 'normal',
                                fontWeight: ' 400',
                                fontSize: '12px',
                                color: '#000000',
                                marginBottom: '20px'

                            }}>Email
                            </InputLabel>
                            <FormControl sx={{ width: '100%' }} variant="outlined">
                                <OutlinedInput
                                    id={"email"}
                                    value={datas.email}
                                    params={"email"}
                                    onChange={(e) => fnHandleChange('email', e.target.value)}
                                    type={"text"}
                                    autoComplete="off"
                                />
                            </FormControl>
                            {
                                error.email &&
                                <div className={"text-red-500"}>
                                    {datas.email ? 'silakan masukan email dengan benar' : 'Email tidak boleh kosong'}
                                </div>
                            }
                        </div>


                        <div>
                            <InputLabel htmlFor="outlined-adornment-password" sx={{
                                fontFamily: 'Poppins',
                                fontstyle: 'normal',
                                fontWeight: ' 400',
                                fontSize: '12px',
                                color: '#000000',
                                marginBottom: '20px'

                            }}>Password
                            </InputLabel>
                            <FormControl sx={{ width: '100%', }} variant="outlined">
                                <OutlinedInput
                                    id="{outlined-adornment-password}"
                                    value={datas.password}
                                    params={"password"}
                                    onChange={(e) => fnHandleChange("password", e.target.value)}
                                    type={datas.showPassword ? 'text' : 'password'}
                                    endAdornment={
                                        <InputAdornment position="start">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {datas.showPassword ? <VisibilityOutlinedIcon /> : <VisibilityOffOutlinedIcon />}
                                            </IconButton>
                                        </InputAdornment>
                                    }

                                />
                            </FormControl>
                            {
                                error.password &&
                                <div className={"text-red-500"}>
                                    Password tidak boleh kosong
                                </div>
                            }
                        </div>

                        <div style={{ paddingTop: '20px' }}>
                            <Button
                                style={{ width: '93%', marginLeft: '10px' }}
                                className='custom-button'
                                onClick={() => fnValidate()}
                                variant="contained" color="primary">
                                Login
                            </Button>
                        </div>
                        <h5 className='mobile-footer-login' style={{ textAlign: 'center' }}>
                            Belum punya akun ?&nbsp;
                            <span style={{ cursor: 'pointer', color: '#7126B5' }} onClick={
                                () => navigate('/register')
                            }>
                                Daftar disini
                            </span>
                        </h5>
                    </div>
                </Grid>
            </Grid>
        </div>
        </>
    )
}