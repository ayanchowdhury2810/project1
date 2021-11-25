import React, {useState} from 'react';
import workplace2 from '../images/workplace2.jpg'
import {NavLink, useHistory} from 'react-router-dom'

const Login = () =>{

    const history = useHistory();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async(e) => {
        e.preventDefault();

        const res = await fetch('/signin', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body:JSON.stringify({
                email, password
            })
        })

        const data = res.json();

        if(res.status===400 || !data){
            window.alert('Invalid Credentials');
        }else{
            window.alert('Login successful');
            history.push('/')
        }
    }
    
    return(
        <>
            <section className="login">
                <div className="container">
                    <div className="signin-content">

                        <div className='signin-image'>
                                {/* <figure>
                                    <img src={workplace2} alt='login pic'/>
                                </figure> */}
                                <br/><br/><br/>
                                <NavLink to='/signup' className='signin-image-link'>I am already registered </NavLink>
                        </div>

                        <div className='signin-form'>
                            <h2 className="form-title">Signin</h2>
                            <form method='POST' className='register-form' id='register-form'>

                                <div className='form-group'>
                                    <label htmlFor='email'>
                                        <i class="zmdi zmdi-email"></i>
                                    </label>
                                    <input type='email' name='email' id='email' autoComplete='off' value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='Email'/>
                                </div>

                                
                                <div className='form-group'>
                                    <label htmlFor='password'>
                                        <i class="zmdi zmdi-lock"></i>
                                    </label>
                                    <input type='password' name='password' id='password' autoComplete='off' value={password} onChange={(e)=> setPassword(e.target.value)} placeholder='Password'/>
                                </div>

                                <div className='from-group form-button'>
                                    <input type='submit' name='signin' id='signin' className='form-submit' value='Login' onClick={loginUser}/>
                                </div>
                            </form>
                        </div>

                            

                        
                    </div>
                </div>

            </section>
        </>

    )
}

export default Login;

// name, password