import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import PriorityHighIcon from '@material-ui/icons/PriorityHigh';
import { Avatar } from '../../components/Avatar';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {useSelector} from "react-redux";
import {authSelector} from "../../redux/auth/selectors";


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        avatar: {
            textAlign: 'center',
            cursor: 'pointer',
            color: 'blue',
        },
        link: {
            cursor: 'pointer',
        },
        userName: {
            fontStyle: 'normal',
            fontWeight: 'bold',
            fontSize: '22px',
            color: '#000000',
            textAlign: 'center'
        },

    }),
);


export const Profile = () => {
    const classes = useStyles();
    const {username} =  useSelector(authSelector)
    const [avatarUrl, setAvatarUrl] = React.useState<string>(
        'https://sun2-3.userapi.com/s/v1/if1/CAR1Aao3yIica7xq77xIIMMTn29CME-cE5JSJBc8OTNVt29JQjnhR0ZsX_9IO-AzgwVbfgB6.jpg?size=200x0&quality=96&crop=138,44,1048,1048&ava=1',
    );
    const inputFileRef = React.useRef<HTMLInputElement>(null);

    const handleChangeImage = (event: Event): void => {
        const file = (event.target as HTMLInputElement).files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setAvatarUrl(imageUrl);
        }
    };

    React.useEffect(() => {
        if (inputFileRef.current) {
            inputFileRef.current.addEventListener('change', handleChangeImage);
        }
    }, []);

    return (
        <>
            <Box my={10}>
                <Grid item xs={12} spacing={2}>
                    <h1>Мой профиль</h1>
                </Grid>
            </Box>
            <Grid container alignItems="flex-start" spacing={3}>
                <Grid item xs={12} sm={3} md={3}>
                    <div className={classes.avatar}>
                        <div>
                            <Avatar width="120px" height="120px" src={avatarUrl} />
                        </div>
                        <div>
                            <label htmlFor="image" className={classes.link}>
                                Змінити фото
                            </label>
                        </div>
                        <input  id="image" ref={inputFileRef} type="file" hidden />
                    </div>
                    <Box my={3}>
                        <div className={classes.userName}>{username}</div>
                    </Box>
                    <Paper>
                        <MenuList>
                            <MenuItem>
                                <ListItemIcon>
                                    <SendIcon fontSize="small" />
                                </ListItemIcon>
                                <Typography variant="inherit" noWrap>Мои материалы</Typography>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <PriorityHighIcon fontSize="small" />
                                </ListItemIcon>
                                <Typography variant="inherit" noWrap>Обучение</Typography>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <DraftsIcon fontSize="small" />
                                </ListItemIcon>
                                <Typography variant="inherit" noWrap>
                                    Настройки
                                </Typography>
                            </MenuItem>
                        </MenuList>
                    </Paper>

                </Grid>
                <Grid item xs={12} sm={8} md={8}>
                    right
                </Grid>
            </Grid>

        </>
    )
}