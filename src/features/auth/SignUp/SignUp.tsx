import React from 'react';
import Grid from "@material-ui/core/Grid";
import {Link, useHistory} from "react-router-dom";
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { useForm, Controller } from "react-hook-form";
import CircularProgress from '@material-ui/core/CircularProgress';
import {AuthResponse, RegisterBody} from '../../../utils/interfaces';
import Button from '@material-ui/core/Button';
import { useSelector, useDispatch } from 'react-redux';
import logo from "../../../assets/img/logo.png";
import { registerUser } from '../thunks';
import {authSelector} from "../authSlice";
import './SignUp.scss'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import {toast} from "react-toastify";

export const SignUp = () => {
    const { register, handleSubmit,control, errors } = useForm<RegisterBody>();
    const dispatch = useDispatch();
    const history = useHistory();
    const {isAuth} = useSelector(authSelector)

    const onSubmit = (data: RegisterBody) => {
        dispatch(registerUser(data))
    }

    if(isAuth) {
        history.push('/')
    }


    return (
        <>
            <header className="header-wrapper">
                <Grid className="container" container spacing={6}>
                    <Grid item xs={12} lg={12}>
                        <div>
                            <Link to="/">
                                <img src={logo} alt="Logo"/>
                            </Link>
                        </div>
                    </Grid>
                </Grid>
            </header>
            <section className="signup-wrapper">
                <Grid className="container" container>
                    <Grid item lg={3}>
                        <Card>
                            <CardActions>
                                <Link className="go-home" to="/">
                                    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7 1L1 7L7 13" stroke="#3D8BE4"/>
                                    </svg>
                                    Назад
                                </Link>
                            </CardActions>
                            <CardContent>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <Controller
                                        name='name'
                                        ref={register}
                                        control={control}
                                        rules={{
                                            required: "Name required",
                                            pattern: {
                                                value: /^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/,
                                                message: 'Invalid name'
                                            }
                                        }}
                                        as={
                                            <TextField
                                                error={!!errors.name}
                                                id="outlined"
                                                label="Full Name"
                                                placeholder="Full Name"
                                                variant="outlined"
                                                fullWidth
                                                helperText={errors.name ? errors.name.message : null}
                                                color={errors.name ? 'secondary' : 'primary'}
                                            />
                                        }
                                    />
                                    <Controller
                                        name="email"
                                        ref={register}
                                        control={control}
                                        rules={{
                                            required: 'Email required',
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                                message: 'Invalid email address',
                                            }
                                        }}
                                        as={
                                            <TextField
                                                error={!!errors.email}
                                                id="outlined"
                                                label="E-mail"
                                                placeholder="E-mail"
                                                variant="outlined"
                                                fullWidth
                                                helperText={errors.email ? errors.email.message : null}
                                                color={errors.email ? 'secondary' : 'primary'}
                                            />
                                        }
                                    />

                                    <Controller
                                        name="password"
                                        ref={register}
                                        control={control}
                                        rules={{
                                            required: "You must specify a password",
                                            minLength: {
                                                value: 8,
                                                message: "Password must have at least 8 characters"
                                            }
                                        }}
                                        as={
                                            <TextField
                                                error={!!errors.password}
                                                name="password"
                                                fullWidth
                                                id="outlined-password-input"
                                                label="Password"
                                                type="password"
                                                autoComplete="current-password"
                                                variant="outlined"
                                                helperText={errors.password ? errors.password.message : null}
                                                color={errors.password ? 'secondary' : 'primary'}
                                            />
                                        }
                                    />

                                    <Button type="submit"  fullWidth size="medium" variant="contained" color="primary">
                                        Далее
                                    </Button>
                                </form>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </section>
        </>

    )
}