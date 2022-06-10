import React from 'react';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Icon from '@material-ui/core/Icon';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

import Layout from '@src/components/Layout';

const useStyles = makeStyles((theme) => ({
  formRoot: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch'
    }
  },
  gridRoot: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
}));

export default function Projects() {
  const [user, setUser] = React.useState('freeCodeCamp');
  const [projects, setProjects] = React.useState([]);
  const classes = useStyles();

  const handleChangeUser = (event) => {
    setUser(event.target.value);
  };

  const handleViewProjects = () => {
    axios
      .get(`https://api.github.com/search/repositories?q=${user}`)
      .then((res) => {
        setProjects(res.data.items);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <Layout>
      <form className={classes.formRoot} noValidate autoComplete="off">
        <div>
          <TextField
            required
            id="standard-required"
            label="Username"
            value={user}
            onChange={handleChangeUser}
          />
          <Button
            variant="contained"
            size="large"
            color="primary"
            disabled={user.trim() === ''}
            onClick={handleViewProjects}
          >
            View Projects
          </Button>
        </div>
        {projects.length > 0 ? (
          <div className={classes.gridRoot}>
            <Grid container spacing={3}>
              {projects.map((project) => (
                <Grid item xs={12} sm={6} lg={3} key={project.id}>
                  <Paper className={classes.paper}>
                    <Typography variant="subtitle1" gutterBottom>
                      {project.full_name}
                    </Typography>
                    <Typography variant="subtitle1">
                      <Icon>star</Icon>
                      {project.stargazers_count}
                      <br />
                      <Icon>fork_left</Icon>
                      {project.forks}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </div>
        ) : null}
      </form>
    </Layout>
  );
}
