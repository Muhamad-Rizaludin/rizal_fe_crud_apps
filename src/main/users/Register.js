import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import { Button, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import * as React from 'react';
import { useAlert } from 'react-alert';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api.json';

const Register = () => {

    const navigate = useNavigate();
    const [datas, setDatas] = React.useState({
        username: '',
        email: '',
        password: '',
        showPassword: false,
    })
    const [error, setError] = React.useState({})
    const alert = useAlert()
    const handleChange = (label, value) => {
        setError({
            ...error,
            [label]: false
        })
        setDatas({
            ...datas,
            [label]: value
        })
    };
    const fnHandleChange = (prop) => (event) => {
        setDatas({ ...datas, [prop]: event.target.value });
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

    const validateEmail = (email) => {
        if (!email) {
            return false;
        } else {
            return email.match(
                /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
        }
    };
    function fnValidate(username = null, email = null, password = null) {
        let params = {
            username: username?.value || datas.username || "",
            email: email?.value || datas.email || "",
            password: password?.value || datas.password || "",
        }
        if (validateEmail(params.email) && params.username && params.password) {
            setOpen(true);
            fnRegister(params);
        } else {
            setError({
                ...error,
                username: params.username ? false : true,
                email: validateEmail(params.email) ? false : true,
                password: params.password ? false : true
            })
        }
    }
    function fnRegister(data) {
        let params = {
            username: data.username,
            email: data.email,
            password: data.password,
        }
        axios.post(API.server + "user/register", params).then(res => {
            setButtonDisabled(true)
            setOpen(false);
            alert.show('Success: login!', {
                type: 'success',
            })
            setTimeout(() => {
                setButtonDisabled(false)
                navigate('/login')
            }, 2000);
        }
        ).catch(err => {
            setButtonDisabled(false)
            setOpen(false);
            alert.show(err?.response?.data?.message ? 'Error: ' + err?.response?.data?.message : 'Error: please check again!', {
                type: 'error',
            })
        });
    }

    React.useEffect(() => {
        const keyDownHandler = event => {
            if (event.key === 'Enter') {
                event.preventDefault();
                let username = document.getElementById('username');
                let email = document.getElementById('email');
                let password = document.getElementById('password');
                fnValidate(username, email, password);
            }
        };

        document.addEventListener('keydown', keyDownHandler);

        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };

    }, []);

    const [open, setOpen] = React.useState(false);
    const [buttonDisabled, setButtonDisabled] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    return (
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
                <Grid className="desktop" item md={6}>
                    
                </Grid>
                <Grid item md={6} xs={12} className={"flex justify-center items-center"}>
                    <div className={'block loginGrid-block register-container'} style={{ width: '100%' }}>
                        <h2>
                            Daftar
                        </h2>

                        <div style={{ marginBottom: '20px' }}>
                            <InputLabel htmlFor="outlined-adornment-password" sx={{
                                fontFamily: 'Poppins',
                                fontstyle: 'normal',
                                fontWeight: ' 400',
                                fontSize: '12px',
                                color: '#000000',
                                marginBottom: '20px'

                            }}>Username
                            </InputLabel>
                            <FormControl sx={{ width: '100%' }} variant="outlined">
                                <OutlinedInput
                                    id={"username"}
                                    value={datas.username}
                                    params={"username"}
                                    onChange={(e) => handleChange('username', e?.target?.value)}
                                    type={"text"}
                                    autoComplete="off"
                                />
                            </FormControl>
                            {
                                error.username &&
                                <div className={"text-red-500"}>
                                    {datas.name ? 'silakan masukan Nama dengan benar' : 'Nama tidak boleh kosong'}
                                </div>
                            }
                        </div>
                        
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
                                    onChange={(e) => handleChange('email', e?.target?.value)}
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
                                    onChange={fnHandleChange('password')}
                                    type={datas.showPassword ? 'text' : 'password'}
                                    autoComplete="off"
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
                                style={{ width: '100%'}}
                                className='custom-button'
                                onClick={() => fnValidate()}
                                disabled={buttonDisabled}
                                variant="contained" color="primary">
                                Daftar
                            </Button>
                        </div>
                        <h5 className='mobile-footer-login' style={{ textAlign: 'center' }}>
                            Sudah punya akun?&nbsp;
                            <span style={{ cursor: 'pointer', color: '#7126B5' }} onClick={
                                () => navigate('/login')
                            }>
                                Masuk disini
                            </span>
                        </h5>
                    </div>
                </Grid>
            </Grid>

        </div>
    )
}

export default Register