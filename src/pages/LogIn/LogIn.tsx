import React from 'react';
import Grid from "@material-ui/core/Grid";
import {Link, useHistory} from "react-router-dom";
import Box from '@material-ui/core/Box';

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import {Controller, useForm} from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {RegisterBody} from "../../utils/interfaces";
import {loginUser} from "../../redux/actions/thunks";
import {useDispatch, useSelector} from "react-redux";
import {authSelector} from "../../redux/selectors";
import '../SignUp/SignUp.scss'


export const LogIn = () => {
    const dispatch = useDispatch();
    const { register, handleSubmit,control, errors } = useForm<RegisterBody>();
    const history = useHistory();
    const { isAuth } = useSelector(authSelector)

    const onSubmit = (data: RegisterBody) => {
        dispatch(loginUser(data))
    }

    if(isAuth) {
        history.push('/profile')
    }

    return (
        <>
            <section className="login-wrapper">
                <Grid className="container" container>
                    <Grid item lg={4}>
                        <Card>
                            <CardActions>
                                <Link className="go-home" to="/">
                                    <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M7 1L1 7L7 13" stroke="#3D8BE4"/>
                                    </svg>
                                    Назад
                                </Link>
                            </CardActions>
                            <Box fontSize={22} textAlign="center" lineHeight={3}>
                                <h3>Вхід</h3>
                            </Box>

                            <CardContent>
                                <form onSubmit={handleSubmit(onSubmit)}>
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

                                    <Button className="btn-blue" type="submit" fullWidth size="medium" variant="contained">
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