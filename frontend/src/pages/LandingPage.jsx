import React from 'react';
import withStyles from '@mui/styles/withStyles';
import { Grid, Typography, Button, Box } from '@mui/material';
import logo from '../assets/logo.png';

const styles = (theme) => ({
  toolBar: {
    height: '10vh',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '20px',
    backgroundColor: 'white',
  },
  logo: {
    color: 'blue',
    cursor: 'pointer',
  },
  link: {
    color: "#000"
  },
  menuIcon: {
    color: '#000',
  },
  form: {
    marginTop: '30px',
  },
  formHeading: {
    textAlign: 'center',
  },
  heroBox: {
    width: '100%',
    display: 'flex',
    minHeight: '600px',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridContainer: {
    display: 'flex',
    alignItems: 'center',
    maxWidth: '1300px',
    padding: '50px',
  },
  title: {
    paddingBottom: '15px',
    color: theme.palette.text.secondary,
  },
  subtitle: {
    opacity: '0.8',
    paddingBottom: '30px',
    color: theme.palette.text.secondary,
  },
  largeImage: {
    width: '100%',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  root: {
    background: theme.palette.text.primary,
    width: '200px',
    fontSize: '16px' 
  },
});

const LandingPage = (props) => {
  const { classes } = props;

  return (
    <Box className={classes.heroBox}>
      <Grid container spacing={6} className={classes.gridContainer}>
        <Grid item xs={12} md={7}>
          <Typography variant="h3" fontWeight={700} className={classes.title}>
            Introducing, InsurAI
          </Typography>
          <Typography variant="h6" className={classes.subtitle}>
            Empower your decision-Making with instant exxpert answers to all of your Evidence of Coverage questions from our EOC Large Language Model. Maximize your coverage and make informed choices for a prosperous future!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            className={classes.root}
            onClick={() => window.location.href = '/chat'}
          >
            Start Chat
          </Button>
        </Grid>
        <Grid item xs={12} md={5}>
          <img src={logo} alt="Logo" className={classes.largeImage} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default withStyles(styles)(LandingPage);
