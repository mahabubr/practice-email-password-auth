import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from 'firebase/auth';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import app from '../firebase/firebase.init';


const auth = getAuth(app)

const RegisterReactBootstrap = () => {

    const [passwordError, setPasswordError] = useState('')
    const [success, setSuccess] = useState(false)

    const handleRegister = (event) => {
        event.preventDefault()

        setSuccess(false)

        const form = event.target

        const name = form.name.value
        const email = form.email.value;
        const password = form.password.value;

        console.log(name, email, password);

        if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
            setPasswordError('please input at least two uppercase')
            return
        }
        if (password.length < 6) {
            setPasswordError('password should be six characters')
            return
        }
        if (!/(?=.*[!@#$%^&*])/.test(password)) {
            setPasswordError('please add at least one special character')
            return
        }
        setPasswordError('')

        createUserWithEmailAndPassword(auth, email, password)
            .then((result) => {
                const user = result.user
                console.log(user)
                setSuccess(true)
                form.reset()
                verifyEmail()
                updateUserName(name)
            })
            .catch((error) => {
                setPasswordError(error.code)
                setPasswordError(error.message)
            })
    }

    const updateUserName = (name) => {
        updateProfile(auth.currentUser, {
            displayName: name
        })
            .then(() => {
                console.log('display name successful');
            })
            .catch(e => {
                console.error('name not found', e);
            })
    }


    const verifyEmail = () => {
        sendEmailVerification(auth.currentUser)
            .then(() => {
                alert('please check your email and verify')
            })
    }

    return (
        <div className='w-50 mx-auto mt-5'>
            <h3 className='text-primary text-center'>Please Register</h3>
            <Form onSubmit={handleRegister}>

                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Your Name</Form.Label>
                    <Form.Control type="text" name='name' placeholder="Enter name" required />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" name='email' placeholder="Enter email" required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" name='password' placeholder="Password" required />
                </Form.Group>
                <p className='text-danger'>{passwordError}</p>
                {success && <p className='text-success'>User Create Successfully</p>}
                <Button variant="warning" type="submit">
                    Register
                </Button>
            </Form>
            <p>Have a Account? Please <Link to='/login'>Login</Link></p>
        </div>
    );
};

export default RegisterReactBootstrap;


// ^(?=.*[A-Z].*[A-Z])(?=.*[!@#$&*])(?=.*[0-9].*[0-9])(?=.*[a-z].*[a-z].*[a-z]).{8}$
// ^                         Start anchor
// (?=.*[A-Z].*[A-Z])        Ensure string has two uppercase letters.
// (?=.*[!@#$&*])            Ensure string has one special case letter.
// (?=.*[0-9].*[0-9])        Ensure string has two digits.
// (?=.*[a-z].*[a-z].*[a-z]) Ensure string has three lowercase letters.
// .{8}                      Ensure string is of length 8.
// $                         End anchor.