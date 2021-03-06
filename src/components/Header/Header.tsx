import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Popover from '@material-ui/core/Popover';
import Button from '@material-ui/core/Button';
import {Link as RouteLink, LinkProps as RouterLinkProps, useHistory } from 'react-router-dom'
import Link from '@material-ui/core/Link';
import logo from '../../assets/img/logo.png'
import Avatar from '@material-ui/core/Avatar';
import {useDispatch, useSelector} from 'react-redux';
import {authSelector} from "../../features/auth/authSlice";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { Omit } from '@material-ui/types';
import {logoutUser} from "../../features/auth/thunks";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      flexGrow: 1,
      boxShadow: '1px 0px 8px 0px gray',
      border: '1px solid #cccccc',

      '& .container': {
        padding: '20px 30px',
        alignItems: 'center',
      },
    }
  }),
);


const LinkBehavior = React.forwardRef<any, Omit<RouterLinkProps, 'to'>>((props, ref) => (
    <RouteLink ref={ref} to="/profile" {...props} />
));


export const Header:React.FC = () => {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const {isAuth, username} =  useSelector(authSelector)
    const preventDefault = (event: React.SyntheticEvent) => event.preventDefault();

    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: React.MouseEvent<EventTarget>) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }
        setOpen(false);
    };

    const handleCloseLogout = (event: React.MouseEvent<EventTarget>) => {
        if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
            return;
        }
        setOpen(false);

        dispatch(logoutUser())
        if (history.location.pathname !== '/') {
            history.push('/')
        }
    };

    function handleListKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {

        if (prevOpen.current === true && open === false) {
            anchorRef.current!.focus();
        }

        prevOpen.current = open;
    }, [open]);

    return (
        <header className={classes.header}>
            <Grid className="container" container spacing={6}>
                <Grid item xs={6} lg={8}>
                    <div>
                        <RouteLink to="/">
                            <img src={logo} alt="Logo"/>
                        </RouteLink>
                    </div>
                </Grid>
                <Grid item xs={6} lg={4}>
                    <div className="auth-wrapper">
                        {
                            isAuth ? (
                                <>
                                    <Button
                                        ref={anchorRef}
                                        aria-controls={open ? 'menu-list-grow' : undefined}
                                        aria-haspopup="true"
                                        onClick={handleToggle}
                                    >
                                        {username}
                                    </Button>
                                    <Popper open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
                                        {({ TransitionProps, placement }) => (
                                            <Grow
                                                {...TransitionProps}
                                                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                            >
                                                <Paper>
                                                    <ClickAwayListener onClickAway={handleClose}>
                                                        <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
                                                            <MenuItem onClick={handleClose}>
                                                                <Link component={LinkBehavior}>Мой профиль</Link>
                                                            </MenuItem>
                                                            <MenuItem onClick={handleClose}>My account</MenuItem>
                                                            <MenuItem onClick={handleCloseLogout}>Вийти</MenuItem>
                                                        </MenuList>
                                                    </ClickAwayListener>
                                                </Paper>
                                            </Grow>
                                        )}
                                    </Popper>
                                </>
                            ) : (
                                <div>
                                    <RouteLink to="/auth/login">
                                        Войти
                                    </RouteLink>
                                    <RouteLink to="/signup">
                                        Зарегистрироваться
                                    </RouteLink>
                                </div>
                            )
                        }

                    </div>
                </Grid>
            </Grid>
        </header>
        
    )
}