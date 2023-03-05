import React from 'react'
import {
    Box,
    Grid,
    Typography,
    Button,
    TextField,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
    formControl: {
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}))

const Details = () => {

    const [purpose, setPurpose] = React.useState('Developing');
    const handleChange = (event) => {
        setPurpose(event.target.value);
    };

    const classes = useStyles();

    return (
        <Box
            component='section'
            sx={{
                py: 10,
                px: 2,
                bgcolor: '#f4f6f8',
            }}>
            <Grid container>
                <Grid item lg={6}>
                    <h4>Supabase - The open source Firebase alternative</h4>
                    <p>
                        Supabase offers developers a full Postgres database, authentication,
                        instant APIs, edge functions, realtime subscriptions, and storage to help
                        build their projects quickly and with a focus on their products.
                    </p>
                    <Typography variant='subtitle1' fontWeight='500'>
                        What is your purpose for using supabase?
                    </Typography>
                    <FormControl
                        variant="outlined"
                        fullWidth
                        className={classes.formControl}
                        margin='dense'>
                        <InputLabel id="purpose">I’m using it for</InputLabel>
                        <Select
                            labelId="purpose"
                            id="purpose-select"
                            value={purpose}
                            onChange={handleChange}
                            label="I’m using it for"
                        >
                            <MenuItem value='Developing'>Developing</MenuItem>
                            <MenuItem value='Testing'>Testing</MenuItem>
                            <MenuItem value='Production'>Production</MenuItem>
                            <MenuItem value='Monitoring'>Monitoring</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item lg={6}>
                    <Box
                        component='form'
                        sx={{
                            width: '80%',
                            margin: '2rem auto'
                        }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="name"
                            label="Your name"
                            type="text"
                            id="name"
                            autoComplete="name"
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email"
                            name="email"
                            autoComplete="email"
                        />
                        <Button
                            variant='contained'
                            fullWidth
                            sx={{
                                mt: 3,
                                mb: 2,
                                borderRadius: 0,
                                fontSize: '0.9rem',
                                textTransform: 'capitalize',
                                py: 2,
                                backgroundColor: '#20cce5',
                                "&:hover": {
                                    backgroundColor: '#1a8c9a',
                                }
                            }}>
                            sign up for updates
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Details;
