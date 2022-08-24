import Button from '@mui/material/Button';
import React, { useCallback } from 'react';
import {useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import Carousel from './Carusel';
export default function HomePage() {
    const navigate = useNavigate();


    const user = JSON.parse(localStorage.getItem('TaskBigio'));

    return (
        <>
            <Grid container spacing={2} style={{ padding: '30px' }}>
                <Carousel />
            </Grid>
            {
                user &&
                <div className='fixed jual-button'>
                    <Button
                        style={{
                            width: '100%',
                            marginRight: '30px',
                            borderRadius: '16px'
                        }}
                        variant="contained"
                        color={'primary'}
                        startIcon={<span style={{ fontWeight: 'bold' }}>+</span>}
                        onClick={() => navigate('/product/add')}
                    >
                        Jual
                    </Button>
                </div>
            }

            


        </>
    )
}