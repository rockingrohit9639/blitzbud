import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { Box } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import { useDataLayerValues } from '../../datalayer';
import server from '../../axios/instance';

const columns = [
    { id: 'fname', label: 'Full Name', minWidth: 170 },
    { id: 'uname', label: 'Username', minWidth: 100 },
    { id: 'email', label: 'Email', minWidth: 170 },
    { id: 'contactno', label: 'Contact No.', minWidth: 170 },
    { id: 'actions', label: 'Actions', minWidth: 170 },
];

const useStyles = makeStyles({
    outerBox: {
        width: "100%",
        height: '100vh',
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
    },
    root: {
        width: '80%',
    },
    container: {
        maxHeight: 440,
    },
});

function Dashboard()
{
    const classes = useStyles();
    const history = useHistory();
    const [rows, setRows] = useState([]);
    const [{ isAuthenticated, role }] = useDataLayerValues();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    useEffect(() =>
    {
        if (!isAuthenticated || (role !== "ADMIN"))
        {
            history.push("/");
        }
        else
        {
            getManagers();
        }
    }, [isAuthenticated, role, history]);

    const handleDelete = async (id) =>
    {
        try
        {
            const res = await server.post("/deletemanager", { id });
            
            if(res.status === 200) {
                window.alert(res.data.message);
                getManagers();
            }
        }
        catch (err)
        {
            console.log(err.response);
        }
    }

    const getManagers = async () =>
    {

        try
        {
            const res = await server.get("/getmanagers");
            setRows(res.data);
            console.log(res.data)
        }
        catch (err)
        {
            console.log(err);
        }


    }

    const handleChangePage = (event, newPage) =>
    {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) =>
    {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <Box container className={classes.outerBox}>
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) =>
                            {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                        {columns.map((column) =>
                                        {
                                            const value = row[column.id];
                                            return (
                                                <TableCell key={column.id} align={column.align}>
                                                    {column.id === "actions" ?
                                                        <Button
                                                            variant="contained"
                                                            color="secondary"
                                                            className={classes.button}
                                                            startIcon={<DeleteIcon />}
                                                            onClick={() => handleDelete(row._id)}
                                                        >
                                                            Delete
                                                        </Button> : value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}

export default Dashboard;
