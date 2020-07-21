import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import {setUserLogin, setUserLogout} from '../../redux/auth-reducer'
import classes from './Login.module.css';
import {Input} from '../common/FormsControls/FormsControls'
import {required, maxLength30} from '../../utils/validators/validators'
import { Redirect } from 'react-router-dom';

const LoginForm = (props) => {
    return (
            <form className={classes.loginForm} onSubmit={props.handleSubmit}>
                <div><Field className={classes.textInp +' '+ classes.mb30} placeholder={'login'} component={Input} name={'login'} validate={[required, maxLength30]}/></div>
                <div><Field type={'password'} className={classes.textInp} placeholder={'password'} component={Input} name={'password'} validate={[required, maxLength30]}/></div>
                <div><Field type={"checkbox"} component={'input'} name={'remember'}/> remember me</div>
                <div>
                    {props.captcha ? <div>
                        <img src={props.captcha} alt="cpacha"/>
                        <Field className={classes.textInp} placeholder={'captcha'} component={Input} name={'captcha'} validate={[required]} />
                    </div>  : ''}
                </div>
                    {props.error && <div className={classes.errorBox}>{props.error}</div>}
                <div><button>Login</button></div>

            </form>
    )
}

const ReduxLoginForm = reduxForm({form: 'login'})(LoginForm);

const Login = (props) => {
    const onSubmit = (formData) => {
        props.setUserLogin(formData);
    }
    return (props.isAuth) ? <Redirect to={'/profile'}/> :
    <div className={classes.wrapper}>
        <h1>Login</h1>
        <ReduxLoginForm onSubmit={onSubmit} captcha={props.captcha}/>
    </div>
}

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        captcha: state.auth.captcha
    }
}

export default connect(mapStateToProps, {setUserLogin, setUserLogout})(Login);