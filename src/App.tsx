import React, {lazy, Suspense} from 'react';
import {
  Switch,
  Route,
  withRouter,
} from "react-router-dom";
import {Header} from './components/Header/Header'
import { Home } from './pages/Home';
import Backdrop from '@material-ui/core/Backdrop';
import { useSelector } from 'react-redux'
import { authSelector } from './redux/selectors';
import { ToastContainer } from 'react-toastify';
import CircularProgress from '@material-ui/core/CircularProgress';
import "react-toastify/scss/main.scss"
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import { Spinner } from './components/Spinner/Spinner';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import './App.scss';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        backdrop: {
            zIndex: theme.zIndex.drawer + 1,
            color: '#fff',
        },
    }),
);

const SignUp = lazy(() => import('./pages/SignUp/SignUp').then(({ SignUp }) => ({ default: SignUp })))
const LogIn = lazy(() => import('./pages/LogIn/L    ogIn').then(({ LogIn }) => ({ default: LogIn })))
const Profile = lazy(() => import('./pages/Profile/Profile').then(({ Profile }) => ({ default: Profile })))

function App(props: any) {
    // const shouldShowHeader = props.location.pathname !== '/signup';
    const {loading} = useSelector(authSelector)
    const classes = useStyles();


    return (
      <Suspense fallback={<Spinner/>}>
        <Backdrop className={classes.backdrop} open={!!loading}>
            <CircularProgress color="inherit" />
        </Backdrop>
        <div className="App">
            <Header/>
            <ToastContainer/>
            <Switch>
                <Container>
                    <Route exact path="/" component={Home} />
                    <Route path='/auth/login' component={LogIn}/>
                    <Route path='/signup' component={SignUp}/>
                    <PrivateRoute path='/profile' component={Profile}/>
                </Container>
            </Switch>
        </div>
      </Suspense>
      
  );
}

export default withRouter(App);
