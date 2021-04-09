import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {Link as RouteLink, LinkProps as RouterLinkProps, useHistory } from 'react-router-dom'
import Link from '@material-ui/core/Link';
import logo from '../../assets/img/logo.png'
import Avatar from '@material-ui/core/Avatar';
import {useDispatch, useSelector} from 'react-redux';
import {authSelector} from "../../redux/selectors";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { Omit } from '@material-ui/types';
import {logoutUser} from "../../redux/actions/thunks";
import { deepPurple } from '@material-ui/core/colors';
import './Header.scss'

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
    },
      purple: {
          color: theme.palette.getContrastText(deepPurple[500]),
          backgroundColor: deepPurple[500],
      },
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

        if (prevOpen.current && !open) {
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
                                        <Avatar alt="Cindy Baker" src="/static/images/avatar/3.jpg" />
                                        <span>{username}</span>
                                        <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 1.5L5.5 6L10 1.5" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                        </svg>
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
                                <div className="d-flex align-items-center">
                                    <span>
                                        <svg width="28" height="30" viewBox="0 0 28 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M1 7.5C3.48368 3.59267 7.85091 1 12.8237 1C20.5557 1 26.8237 7.26801 26.8237 15C26.8237 22.732 20.5557 29 12.8237 29C7.85091 29 3.48368 26.4073 1 22.5" stroke="#3D8BE4"/>
                                            <path d="M7.82422 9L13.8242 15L7.82422 21" stroke="#3D8BE4"/>
                                        </svg>
                                    </span>
                                    <RouteLink to="/auth/login">
                                        Войти
                                    </RouteLink>
                                    <span>/</span>
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