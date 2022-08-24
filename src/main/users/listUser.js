import { Grid, Button, Stack } from '@mui/material';
import axios from 'axios';
import React, { useState, useEffect, useCallback } from "react";
import { useAlert } from 'react-alert';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../api.json';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';


const ListUser = (props) => {
    
    const navigate = useNavigate();
    const [loading, setLoading] = React.useState("load");
    const [datas, setDatas] = useState([]);
    const [total, setTotal] = useState(0);
    const alert = useAlert()
    const jwtToken = JSON.parse(localStorage.getItem('TaskBigio'))?.Token;

    function fnGetDataUser() {
        axios.get(API.server + "user", {
            headers: { Authorization: `Bearer ${jwtToken}` }
        }).then(res => {
            setDatas(res.data.data);
            setLoading("false")
            setTotal(res.data.data?.length)
        }).catch(err => {
            setLoading("error")
            alert.show('Error: please check again!', {
                type: 'error',
            })
        });
    }
    
    function deleteUser(id) {
        axios.delete(API.server + `user/${id}`, {
            headers: { Authorization: `Bearer ${jwtToken}` }
        }).then(res => {
            fnGetDataUser();
        }).catch(err => {
            setLoading("error")
            alert.show('Error: please check again!', {
                type: 'error',
            })
        });
    }

    React.useEffect(() => {
        // hit API to filter 
        fnGetDataUser()
    }, [])

    return (
        <Grid container direction="row" justifyContent="left" alignItems="flex-start" spacing={1}>
            <Button
                size='small'
                variant="contained"
                onClick={() => navigate('/user/add')}>
                Add User
            </Button>
            <div style={{ marginTop:'10px', height: 400, width: '100%' }}>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="right">No</TableCell>
                                <TableCell align="right">Username</TableCell>
                                <TableCell align="right">Email&nbsp;</TableCell>
                                <TableCell align="right">Role&nbsp;</TableCell>
                                <TableCell align="right">Action&nbsp;</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {datas.map((o, i) => (
                                <TableRow
                                key={o.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell align="right">{i+1}</TableCell>
                                <TableCell component="th" scope="row">
                                    {o.username}
                                </TableCell>
                                <TableCell align="right">{o.email}</TableCell>
                                <TableCell align="right">{o.role}</TableCell>
                                <TableCell align="right">
                                    <Stack direction="row" spacing={2}>
                                        <Button href={`user/${o.id}`} size="small" variant="contained" color="success">
                                            Edit
                                        </Button>
                                        <Button onClick={() => deleteUser(o.id)} size="small" variant="outlined" endIcon={<DeleteIcon />} color="error">
                                            Delete
                                        </Button>
                                    </Stack>
                                </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </Grid>
    );
}

export default ListUser