import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

// edit server logic so that name, email, cart and saveForLater fields are added
// grab current items in cart and saveForLater from localStorage if there are any and use those to set values in case the user started shopping before sign up

// connect() gives the component access to props and we can destructure setAlert from these props instead of using props.setAlert to dispatch the action
const Register = ({ setAlert, register, isAuthenticated }) => {
    // reach into localStorage and grab cart/saveForLater items
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    // destructure data from formData
    const { name, email, password, password2 } = formData;

    // connect each input field to the state through value={input}
    // add a reusable onChange that only targets the specific state value for the input field 
    // ie [e.target.name] which grabs the name attribute of the input field ie email or password1 etc

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async e => {
        // check to see if passwords match onSubmit
        // if match then proceed to construct the registration post request to the server
        e.preventDefault();
        if (password !== password2) {
            setAlert('Passwords do not match', 'danger');
        } else {
            register({ name, email, password });
        }
    }

    if (isAuthenticated) {
        return <Redirect to="/" />
    }

    return (
        <>
            <h1 className="large text-primary">Sign Up</h1>
            <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>

            <form className="form" onSubmit={e => onSubmit(e)}>

                <div className="form-group">
                    <input type="text" placeholder="Name" name="name" value={name} onChange={e => onChange(e)} required />
                </div>

                <div className="form-group">
                    <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)} />
                    <small className="form-text"
                    >This site uses Gravatar so if you want a profile image, use a
            Gravatar email</small
                    >
                </div>

                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={password} onChange={e => onChange(e)}
                        minLength="6"
                    />
                </div>

                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        value={password2} onChange={e => onChange(e)}
                        minLength="6"
                    />
                </div>

                <input type="submit" className="btn btn-primary" value="Register" />

            </form>

            <p className="my-1">
                Already have an account? <Link to='/login'>Log In</Link>
            </p>
        </>
    )
};


Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
