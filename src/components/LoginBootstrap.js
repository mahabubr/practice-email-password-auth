import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import app from '../firebase/firebase.init';


const auth = getAuth(app)

const LoginBootstrap = () => {

    const [success, setSuccess] = useState(false)
    const [userEmail, setUserEmail] = useState('')

    const handleSubmit = (event) => {
        event.preventDefault()

        setSuccess(false)

        const form = event.target

        const email = form.email.value
        const password = form.password.value

        signInWithEmailAndPassword(auth, email, password)
            .then((result) => {
                const user = result.user
                console.log(user);
                setSuccess(true)
            })
            .catch((error) => {
                console.error(error);
            })
    }

    const handleEmailBlur = (event) => {
        const email = event.target.value
        setUserEmail(email)
        console.log(email);
    }

    const handleForgetPassword = () => {

        if (!userEmail) {
            alert('please type your email')
            return
        }

        sendPasswordResetEmail(auth, userEmail)
            .then(() => {
                alert('reset password send your email')
            })
            .catch(e => {
                console.error(e)
            })
    }

    return (
        <div className='w-50 mx-auto'>
            <h3 className='text-primary text-center mt-5'>Please Login</h3>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput" className="form-label">Email</label>
                    <input onBlur={handleEmailBlur} type="email" name='email' className="form-control" id="formGroupExampleInput" placeholder="email" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="formGroupExampleInput2" className="form-label">Password</label>
                    <input type="password" name='password' className="form-control" id="formGroupExampleInput2" placeholder="password" required />
                </div>
                <button className="btn btn-primary" type="submit">Login</button>
            </form>
            {success && <p className='text-success'>Login SuccessFully</p>}
            <p>New to This Website? Please <Link to='/register'>Register</Link></p>
            <p className='text-center text-warning'>Forget Password ? <button type="button" onClick={handleForgetPassword} className="btn btn-link">Please Reset</button></p>
        </div>
    );
};

export default LoginBootstrap;