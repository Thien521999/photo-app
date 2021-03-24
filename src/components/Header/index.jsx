import { Box, IconButton, Menu, MenuItem } from "@material-ui/core";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { AccountCircle, Close } from "@material-ui/icons";
import HomeIcon from '@material-ui/icons/Home';
import Login from "features/Auth/components/Login";
import Register from "features/Auth/components/Register";
import { logout } from "features/Auth/userSlice";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    link: {
        color: "#fff",

        "&:hover": {
            color: theme.palette.secondary.main,
            textDecoration: "none",
            transition: 'all 0.45s ease 0s'
        },
    },
    closeButton: {
        position: "absolute",
        top: theme.spacing(1),
        right: theme.spacing(1),
        color: theme.palette.grey[500],
        zIndex: 1,
    },
}));

const MODE = {
    LOGIN: "login",
    REGISTER: "register",
};

export default function Header() {
    const dispatch = useDispatch();

    //Kiem tra user dang nhap hay chua dang nhap
    const loggedInUser = useSelector((state) => state.user.current);
    const isLoggedIn = !!loggedInUser.id; //neu có id tức là đã đănng nhập và nguoc lai

    const [open, setOpen] = useState(false);
    const [mode, setMode] = useState(MODE.LOGIN);
    const [anchorEL, setAnchorEL] = useState(null);

    const handleUserClick = (e) => {
        setAnchorEL(e.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEL(null);
    };

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleLogoutClick = () => {
        const action = logout();
        dispatch(action);
    };

    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <HomeIcon className={classes.menuButon} />

                    <Typography variant="h6" className={classes.title}>
                        <Link className={classes.link} to="/">
                            Photo-App
                        </Link>
                    </Typography>

                    {/* Chưa đăng nhập */}
                    {!isLoggedIn && (
                        <Button color="inherit" onClick={handleClickOpen}>
                            Login
                        </Button>
                    )}

                    {/*show Icon đã đăng nhập */}
                    {isLoggedIn && (
                        <IconButton color="inherit" onClick={handleUserClick}>
                            <AccountCircle />
                        </IconButton>
                    )}
                </Toolbar>
            </AppBar>

            {/* dialog - log out - My Account */}
            <Menu
                id="demo-positioned-menu"
                keepMounted
                anchorEl={anchorEL}
                open={Boolean(anchorEL)}
                onClose={handleCloseMenu}
                anchorOrigin={{
                    vertical: "bottom", //theo chieu doc
                    horizontal: "right", //nam ngang
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                getContentAnchorEl={null}
            >
                <MenuItem onClick={handleCloseMenu}>My account</MenuItem>
                <MenuItem onClick={handleLogoutClick}>Logout</MenuItem>
            </Menu>

            {/* dialog - Sign in - Sign up */}
            <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
            >
                {/* Icon x goc tren ben phai */}
                <IconButton className={classes.closeButton} onClick={handleClose}>
                    <Close />
                </IconButton>
                
                <DialogContent>
                    {mode === MODE.REGISTER && (
                        <>
                            <Register closeDialog={handleClose} /> {/** closeDialog: dùng de dong dialog */}
                            <Box textAlign="center">
                                <Button color="primary" onClick={() => setMode(MODE.LOGIN)}>
                                    Already have an account. Login here.
                                </Button>
                            </Box>
                        </>
                    )}

                    {mode === MODE.LOGIN && (
                        <>
                            <Login closeDialog={handleClose} />
                            <Box textAlign="center">
                                <Button color="primary" onClick={() => setMode(MODE.REGISTER)}>
                                    Don't have an account. Register here.
                                </Button>
                            </Box>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
