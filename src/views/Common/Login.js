import GoogleIcon from '@mui/icons-material/Google';
import { Button, TextField, Typography, RadioGroup, FormControlLabel, Radio } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import React, { useEffect, useState } from 'react';
import { GoogleLogin } from "react-google-login";
import { useHistory } from 'react-router-dom';
import '../../styles/Login.css';
import { isEmptyObject, isValidEmail } from '../../utils';
import LoadingAlert from './../../components/Loading/LoadingAlert';
import APP_CONSTANTS from './../../constants';
import useUserInfo from './../../hooks/useUserInfo';
import AuthService from './../../services/auth.service';
const CLIENT_ID = APP_CONSTANTS.CLIENT_ID;

function Login() {
    const history = useHistory();
    const user = useUserInfo();

    const [loginForm, setLoginForm] = useState({
        username: '',
        password: '',
    })
    const [signupForm, setSignupForm] = useState({
        username: '',
        email: '',
        password: '',
        conf: '',
        role: 2
    })
    const [reset, setReset] = useState({
        username: '',
        email: ''
    })
    const [rightPanelActive, setRightPanelActive] = useState("");
    const [mobileRes, setMobileRes] = useState({ login: "m-container", signup: "display-none" });
    const [openDialog, setOpenDialog] = useState(false)
    const [state, setState] = useState({
        loading: false,
        alert: false,
        title: ''
    });

    let TOKEN = localStorage.getItem(APP_CONSTANTS.USER_TOKEN);

    useEffect(() => {
        if (TOKEN) {
            let role = localStorage.getItem('roles')
            let username = JSON.parse(TOKEN).Username
            setState(s => { return { ...s, loading: false } });
            if (role === 'STUDENT') history.push(`/${username}`)
            else history.push(`/`)
        }
        if (user.message != null && user.message.status.Code === 601) {
            setState(s => { return { loading: false, alert: true, title: user.message.message } })
            user.setMessage(null)
        }
        if (history.location.pathname === '/register' && user.message && user.message.status.Code === 200) {
            setState(s => { return { loading: false, alert: true, title: "Signup Successfully" } })
            user.setMessage(null)
            openLogin()
            history.replace('/login')
        }// eslint-disable-next-line
    }, [mobileRes, TOKEN, user, state, history]);


    const handleLogin = e => {
        e.preventDefault();
        if (!isEmptyObject(loginForm)) {
            setState(s => { return { ...s, loading: true, alert: false } });
            user.setUserInfo({
                username: loginForm.username,
                password: loginForm.password,
                isLogin: true
            });
        } else {
            setState(s => { return { ...s, alert: true, title: 'Input fields are required' } });
        }

    }   

    const handleSignUp = e => {
        e.preventDefault();
        let { username, email, password, conf, role } = signupForm
        if (isEmptyObject(signupForm)) {
            setState(s => { return { ...s, alert: true, title: 'Input fields are required!' } });
        }
        else if (username.length < 5) {
            setState(s => { return { ...s, alert: true, title: 'Username must be 5 characters long!' } });
        }
        else if (!isValidEmail(email)) {
            setState(s => { return { ...s, alert: true, title: 'Email is not valid!' } });
        }
        else if (password.length < 8) {
            setState(s => { return { ...s, alert: true, title: 'Password must be 8 characters long!' } });
        }
        else if (password !== conf) {
            setState(s => { return { ...s, alert: true, title: 'Confirm password is not matched!' } });
        }
        else {
            setState(s => { return { ...s, loading: true, alert: false } });
            user.setUserInfo({
                username: username,
                password: password,
                email: email,
                role: role,
                isLogin: false
            });
        }

    }
    const handleChangeLogin = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setLoginForm(s => { return { ...s, [name]: value } })
    }

    const handleChangeSignup = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setSignupForm(s => { return { ...s, [name]: value } },)
    }

    const responseGoogleSuccess = (response, isLogin) => {
        const userInfo = {
            name: response.profileObj.name,
            email: response.profileObj.email,
            token: response.googleId,
            image: response.profileObj.imageUrl,
        };
        if (userInfo.name) {
            user.setUserInfo({
                username: userInfo.email,
                password: userInfo.token,
                isLogin: isLogin
            });
        }
    };
    function responseGoogleError(response) {
        console.info(response)
    };
    function openLogin(e) {
        if (e) e.preventDefault();
        setRightPanelActive(" ");
        if (window.innerWidth < 600) {
            setRightPanelActive("");
            setMobileRes(preState => preState = { login: "m-container", signup: "display-none" });

        }
        history.replace('/login')
    }
    function openSignUp(e) {

        e.preventDefault();
        setRightPanelActive(" right-panel-active");
        if (window.innerWidth < 600) {
            setRightPanelActive("");
            setMobileRes(preState => preState = { login: "display-none", signup: "m-container" });
        }
        history.replace('/register')
    }
    const handleReset = (e) => {
        e.preventDefault();
        setState(s => { return { ...s, loading: true } });
        let authService = AuthService.getInstance();
        authService.resetPassword({ Username: reset.username, Email: reset.email })
            .then(items => {
                if (items.status.Code === 200) {
                    setState({ alert: true, title: 'Check your mail to get new password', loading: false });

                }
                else {
                    setState({ alert: true, title: items.message, loading: false });
                }
            })
            .catch(err => {
                console.error(err)
                setState({ loading: false, alert: true, title: 'Error. Try again!' })
            })
        setOpenDialog(false)
    }
    return (
        <div className="login" style={{ boxSizing: 'border-box' }}>
            <div className={"container" + rightPanelActive} id="login">
                <LoadingAlert state={state} close={() => setState(s => { return { ...s, alert: false, title: '' } })} />
                <div className={"form-container sign-up-container  " + mobileRes.signup}>
                    <form action="#" >
                        <h1>Create Account</h1>
                        <div className="social-container">
                            <GoogleLogin
                                clientId={CLIENT_ID}
                                render={renderProps => (
                                    <a
                                        href="/#"
                                        className="social"
                                        onClick={renderProps.onClick}
                                        disabled={renderProps.disabled}>
                                        <GoogleIcon /></a>
                                )}
                                buttonText="Sign Up with Google"
                                onSuccess={(response) => responseGoogleSuccess(response, false)}
                                onFailure={responseGoogleError}
                                isSignedIn={true}
                                cookiePolicy={"single_host_origin"}
                            />
                        </div>
                        <span>or use your email for registration</span>
                        <input
                            type="text"
                            placeholder="Username"
                            id="username-su"
                            name="username"
                            onChange={handleChangeSignup}
                            required
                            autoComplete="new-password"
                            value={signupForm.username} />
                        <input
                            type="text"
                            placeholder="Email"
                            id="email-su"
                            name="email"
                            required
                            value={signupForm.email}
                            onChange={handleChangeSignup}
                            autoComplete="new-password" />
                        <input
                            type="password"
                            placeholder="Password"
                            id="password-su"
                            name="password"
                            required
                            value={signupForm.password}
                            onChange={handleChangeSignup}
                            autoComplete="new-password" />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            id="conf-su"
                            name="conf"
                            required
                            value={signupForm.conf}
                            onChange={handleChangeSignup}
                            autoComplete="new-password" />
                        <RadioGroup
                            row
                            name="role"
                            value={signupForm.role} onChange={handleChangeSignup}
                        >
                            <FormControlLabel value={3} control={<Radio />} label="I'm Student" />
                            <FormControlLabel value={2} control={<Radio />} label="I'm Teacher" />
                        </RadioGroup>
                        <button onClick={handleSignUp}>Sign Up</button>
                        <button className="ghost-m" id="signIn" onClick={openLogin} >Sign In</button>

                    </form>
                </div>
                <div className={"form-container sign-in-container " + mobileRes.login}>
                    <form action="/#" >
                        <h1>Sign in</h1>
                        <div className="social-container">
                            <GoogleLogin
                                clientId={CLIENT_ID}
                                render={renderProps => (
                                    <a
                                        href="/#"
                                        className="social"
                                        onClick={renderProps.onClick}
                                        disabled={renderProps.disabled}>
                                        <GoogleIcon /></a>
                                )}
                                buttonText="Sign In with Google"
                                onSuccess={(response) => responseGoogleSuccess(response, true)}
                                onFailure={responseGoogleError}
                                isSignedIn={true}
                                cookiePolicy={"single_host_origin"}
                            />
                        </div>
                        <span>or use your account</span>

                        <input
                            type="email"
                            placeholder="Username"
                            id="username"
                            name="username"
                            value={loginForm.username}
                            onChange={handleChangeLogin}
                            required />
                        <input
                            type="password"
                            placeholder="Password"
                            id="password"
                            name="password"
                            value={loginForm.password}
                            onChange={handleChangeLogin}
                            required />
                        <Typography
                            variant="body1"
                            color="primary"
                            onClick={() => setOpenDialog(true)}
                            sx={{ '&:hover': { cursor: "pointer" } }}
                        >Forgot your password?</Typography>
                        <button onClick={handleLogin}>Sign In</button>
                        <button className="ghost-m" id="signUp" onClick={openSignUp} >Sign Up</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-left">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button className="ghost" id="signIn" onClick={openLogin} >Sign In</button>
                        </div>
                        <div className="overlay-panel overlay-right">
                            <h1>Hello, Friend!</h1>
                            <p>Enter your personal details and start journey with us</p>
                            <button className="ghost" id="signUp" onClick={openSignUp}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
            <Dialog
                open={openDialog}
                onClose={() => setOpenDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="md"
            >
                <DialogTitle id="alert-dialog-title">
                    Enter your register email and username to reset your password:
                </DialogTitle>
                <DialogContent>
                    <TextField
                        id="name-text"
                        variant="outlined"
                        label="Username"
                        fullWidth={true}
                        margin="normal"
                        name="usernameReset"
                        value={reset.username}
                        onChange={(e) => setReset(s => { return { ...s, username: e.target.value } })}
                        autoComplete="new-password"
                        sx={{ '& .css-186xcr5': { paddingRight: '15px' } }}
                    />
                    <TextField
                        id="name-text"
                        variant="outlined"
                        label="Email"
                        fullWidth={true}
                        margin="normal"
                        name="emailReset"
                        value={reset.email}
                        onChange={(e) => setReset(s => { return { ...s, email: e.target.value } })}
                        autoComplete="new-password"
                        sx={{ '& .css-186xcr5': { paddingRight: '15px' } }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleReset} autoFocus>
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Login;
