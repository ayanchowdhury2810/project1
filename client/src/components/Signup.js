import React, {useState} from 'react';
import workplace from '../images/workplace.jpg'
import {NavLink, useHistory} from 'react-router-dom'

const Signup = () =>{

    const history = useHistory();

    // to access data when entered in the field. For eg: user.name

    const [user, setUser] = useState({
        name: '', email:'', phone:'', work:'', password:'', cpassword:''
    })

    let name, value;

    const handleInputs = (e) => {
            // console.log(e)
            name = e.target.name;
            value = e.target.value;

            setUser({...user, [name]:value})
    }

    const PostData = async(e) => {
        e.preventDefault();
        
        const {name, email, phone, work, password, cpassword} = user;
        
        const res = await fetch("/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, phone, work, password, cpassword       
            })
        });

        const data = await res.json();

        if (data.status===422 || !data){
            window.alert("Invalid Registration");
            console.log("Invalid Registration");
        } else{
            window.alert('Registration Successful');
            console.log('Registration Successful');

            history.push('/login');
        }
    }

    return(
        <>
            <section className="signup">
                <div className="container">
                    <div className="signup-content">
                        <div className='signup-form'>
                            <h2 className="form-title">Signup</h2>
                            <form method='POST' className='register-form' id='register-form'>
                                <div className='form-group'>
                                    <label htmlFor='name'>
                                        <i class="zmdi zmdi-account"></i>
                                    </label>
                                    <input type='text' name='name' id='name' autoComplete='off' value={user.name} onChange={handleInputs} placeholder='Your Name'/>
                                </div>

                                <div className='form-group'>
                                    <label htmlFor='email'>
                                        <i class="zmdi zmdi-email"></i>
                                    </label>
                                    <input type='email' name='email' id='name' autoComplete='off' value={user.email} onChange={handleInputs} placeholder="Email Id"/>
                                </div>

                                <div className='form-group'>
                                    <label htmlFor='phone number'>
                                        <i class="zmdi zmdi-phone"></i>
                                    </label>
                                    <input type='text' name='phone' id='name' autoComplete='off' value={user.phone} onChange={handleInputs} placeholder='Phone Number'/>
                                </div>

                                <div className='form-group'>
                                    <label htmlFor='work'>
                                        <i class="zmdi zmdi-assignment-account"></i>
                                    </label>
                                    <input type='text' name='work' id='name' autoComplete='off' value={user.work} onChange={handleInputs} placeholder='Your Work'/>
                                </div>

                                <div className='form-group'>
                                    <label htmlFor='password'>
                                        <i class="zmdi zmdi-lock"></i>
                                    </label>
                                    <input type='password' name='password' id='name' autoComplete='off' value={user.password} onChange={handleInputs} placeholder='Password'/>
                                </div>

                                <div className='form-group'>
                                    <label htmlFor='cpassword'>
                                        <i class="zmdi zmdi-lock"></i>
                                    </label>
                                    <input type='password' name='cpassword' id='name' autoComplete='off' value={user.cpassword} onChange={handleInputs} placeholder='Confirm Password'/>
                                </div><br/>

                                <div className='form-group form-button'>
                                    <input type='submit' name='signup' id='signup' className='form-submit' value='Register' onClick={PostData}/>
                                </div>
                            </form>
                        </div>

                            <div className='signup-image'>
                                {/* <figure>
                                    <img src={workplace} alt='registration pic' className="signup_image"/>
                                </figure> */}
                                <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
                                <NavLink to='/login' className='signin-image-link'>I am already registered </NavLink>
                            </div>

                        
                    </div>
                </div>

            </section>
            
        </>
    )
}

export default Signup;


//  name, email, mobile number, work, password, confirm password

// use grid. css on your own