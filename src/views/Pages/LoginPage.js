import React, { useState } from 'react';
import { Route, Redirect } from "react-router-dom"
import axios from 'axios';

// @material-ui/core components
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import Icon from '@material-ui/core/Icon';

// @material-ui/icons
import Face from '@material-ui/icons/Face';
import Email from '@material-ui/icons/Email';
// import LockOutline from "@material-ui/icons/LockOutline";

// core components
import GridContainer from 'components/Grid/GridContainer.js';
import GridItem from 'components/Grid/GridItem.js';
import CustomInput from 'components/CustomInput/CustomInput.js';
import Button from 'components/CustomButtons/Button.js';
import Card from 'components/Card/Card.js';
import CardBody from 'components/Card/CardBody.js';
import CardHeader from 'components/Card/CardHeader.js';
import CardFooter from 'components/Card/CardFooter.js';
import SnackbarContent from "components/Snackbar/SnackbarContent.js";

import PulseLoader from "react-spinners/PulseLoader";

import styles from 'assets/jss/material-dashboard-pro-react/views/loginPageStyle.js';

const useStyles = makeStyles(styles);

const override = `
  display: block;
  margin: 0 auto;
  border-color: red;
`;

export default function LoginPage() {
  const [cardAnimaton, setCardAnimation] = React.useState('cardHidden');

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginToken, setLoginToken] = useState('');
  const [userRole, setUserRole] = useState('');
  const [hideWarning, setHideWarning] = useState(false);
  const [loading, setLoading] = useState(false);

  React.useEffect(() => {
    let id = setTimeout(function () {
      setCardAnimation('');
    }, 700);
    // Specify how to clean up after this effect:
    return function cleanup() {
      window.clearTimeout(id);
    };
  });
  const classes = useStyles();

  const handleLogin = () => {
    // localStorage.setItem("user", loginEmail)
    // const savedEmail = localStorage.getItem("user");

    setLoading(true);

    axios
      .post('/api/logins/', {
        email: loginEmail,
        password: loginPassword,
      })
      .then((res) => {
        localStorage.setItem("LoginToken", res.data.token);
        localStorage.setItem("UserRole", res.data.user.role);
        setLoginToken(res.data.token);

        if (res.data.token === 'failed') {
          setHideWarning(true);
          setTimeout(function () {
            setHideWarning(false)
          }, 2000);
        }
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });
  };
  return (
    <div className={classes.container} style={{ backgroudColor: '#FFFF00' }}>
      <GridContainer justify="center">
        <GridItem xs={12} sm={6} md={4}>
          <form>
            {(loginToken === 'admin_token' || loginToken === 'doctor_token') && (
              <Redirect to='../admin/param-admin'></Redirect>
            )}
            <Card login className={classes[cardAnimaton]} style={{ width: '100%', display: 'flex' }}>
              <CardHeader
                className={`${classes.cardHeader} ${classes.textCenter}`}
                color="warning"
              >
                <h4 className={classes.cardTitle}>Log in</h4>
                {/* <div className={classes.socialLine}>
                  {[
                    'fab fa-facebook-square',
                    'fab fa-twitter',
                    'fab fa-google-plus',
                  ].map((prop, key) => {
                    return (
                      <Button
                        color="transparent"
                        justIcon
                        key={key}
                        className={classes.customButtonClass}
                      >
                        <i className={prop} />
                      </Button>
                    );
                  })}
                </div> */}
              </CardHeader>
              <CardBody>
                {/* <CustomInput
                  labelText="First Name"
                  id="firstname"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Face className={classes.inputAdornmentIcon} />
                      </InputAdornment>
                    ),
                  }}
                /> */}
                <CustomInput
                  labelText="Email"
                  id="email"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Email className={classes.inputAdornmentIcon} />
                      </InputAdornment>
                    ),
                    onChange: (e) => setLoginEmail(e.target.value),
                  }}
                />
                <CustomInput
                  labelText="Password"
                  id="password"
                  formControlProps={{
                    fullWidth: true,
                  }}
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Icon className={classes.inputAdornmentIcon}>
                          lock_outline
                        </Icon>
                      </InputAdornment>
                    ),
                    type: 'password',
                    autoComplete: 'off',
                    onChange: (e) => setLoginPassword(e.target.value),
                  }}
                />
              </CardBody>
              <PulseLoader
                css={override}
                size={12}
                color={"#041F5D"}
                loading={loading}
              />

              {(loginToken === 'failed' && hideWarning === true) && (
                <CardHeader
                  className={`${classes.cardHeader} ${classes.textCenter}`}
                  color="warning"
                >
                  <h4 className={classes.cardTitle}>Incorrect Email or Password!</h4>
                </CardHeader>
              )}

              <CardFooter className={classes.justifyContentCenter}>
                <Button color="warning" simple size="lg" block onClick={() => handleLogin()} >
                  Let{"'"}s Go
                </Button>
              </CardFooter>
            </Card>
          </form>
        </GridItem>
      </GridContainer>
    </div>
  );
}
