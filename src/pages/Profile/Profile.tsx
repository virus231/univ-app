import React from 'react';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { Avatar } from '../../components/Avatar';
import {createStyles, makeStyles, Theme} from "@material-ui/core/styles";
import {useSelector} from "react-redux";
import {authSelector} from "../../redux/selectors";
import { ProfileSettings } from './ProfileSettings/ProfileSettings';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        tabs: {
            textTransform: 'capitalize',
            textAlign: 'left',
            span: {
                textAlign: 'left'
            }
        },
        avatar: {
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
        },
    }),
);

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}


function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}


function a11yProps(index: any) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

export const Profile = () => {
    const classes = useStyles();
    const {username} =  useSelector(authSelector)
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };
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
                <Grid  item xs={12} sm={3} md={3}>
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
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        onChange={handleChange}
                        aria-label="Vertical tabs example"

                    >
                        <Tab className={classes.tabs} label="Обучение" {...a11yProps(0)} />
                        <Tab className={classes.tabs} label="Мои материалы" {...a11yProps(1)} />
                        <Tab className={classes.tabs} label="Настройки" {...a11yProps(2)} />
                        <Tab className={classes.tabs} label="Выйти" {...a11yProps(3)} />
                    </Tabs>
                </Grid>
                <Grid item xs={12} sm={8} md={8}>
                    <TabPanel value={value} index={0}>
                        Обучение
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        Мои материалы
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <ProfileSettings/>
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        Выйти
                    </TabPanel>
                </Grid>
            </Grid>

        </>
    )
}