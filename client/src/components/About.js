import React, {useEffect, useState} from 'react';
import pp1 from '../images/image1.jpg';
import pp2 from '../images/image2.jfif';
import {useHistory} from 'react-router-dom';

const About = () =>{

    const history = useHistory();
    const [userData, setUserData] = useState({});

    const  callAboutPage = async() =>{
        try{
            const res = await fetch("/about",{
                method : "GET",
                headers : {
                    Accept : "application/json",            //for saving cookie
                    "Content-Type" : "application/json"
                },
                credentials: "include"                      //for sending token
            });

            const data = await res.json();
            console.log(data)
            setUserData(data);

            if(!res.status===200){
                const error = new Error(res.error);
                throw error;
            }

        }catch(err){
            console.log(err)
            history.push('/login');
        }
    }

    useEffect(()=>{
        callAboutPage();
    }, [])

    return(
        <>
            <div className="container emp-profile about_container">
                <form method='GET'>
                    <div className='row'>
                        <div className='col-md-4'>
                            <div className='profile-img'>
                                <img className="ppimg" src={userData.name==='t' ? pp1 : pp2} alt='profile picture'/>
                            </div>
                        </div>
                        <div className='col-md-6'>
                            <div className='profile-head'>
                                <h5> { userData.name} </h5>
                                <h6>{ userData.work}</h6>
                                <p className='profile-rating mt-3 mb-6'>RANKING: <span>--/10</span></p>
                                <ul className="nav nav-tabs">
                                    <li className="nav-item">
                                        <a className='nav-link active' id='home-tab' data-toggle='tab' href="#home" role='tab'>About</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className='nav-link active' id='profile-tab' data-toggle='tab' href="#profile" role='tab'>Timeline</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className='col-md-2'>
                            <input type='submit' className='profile-edit-btn' name='btnAddMore' value='Edit Profile'/>
                        </div>
                        <div className='row'>
                            {/* left side url */}
                            <div className='col-md-4'>
                                <div className='profile-work'>
                                    <p>WORK LINK</p>
                                    <a href='' target=''>Github</a><br/>
                                </div>
                            </div>
                            {/* right side data toggle */}
                            <div className='col-md-8 pl-5 about-info'>
                                <div className='tab-content profile-tab' id='myTabContent'>
                                    <div className='tab-pane fade show active' id='home' role='tabpanel' aria-labelledby='home-tab'> <br/>
                                        <div className='row mt-3'>
                                            <div className='col-md-6'>
                                                <label>User ID</label>
                                            </div>
                                            <div className='col-md-6'>
                                                <p>{ userData._id}</p>
                                            </div>
                                        </div>
                                        <div className='row mt-3'>
                                            <div className='col-md-6'>
                                                <label>Name</label>
                                            </div>
                                            <div className='col-md-6'>
                                                <p>{ userData.name}</p>
                                            </div>
                                        </div>
                                         <div className='row mt-3'>
                                            <div className='col-md-6'>
                                                <label>Email</label>
                                            </div>
                                            <div className='col-md-6'>
                                                <p>{ userData.email}</p>
                                            </div>
                                        </div>
                                         <div className='row mt-2'>
                                            <div className='col-md-6'>
                                                <label>Phone</label>
                                            </div>
                                            <div className='col-md-6'>
                                                <p>{ userData.phone}</p>
                                            </div>
                                        </div>
                                         <div className='row mt-3'>
                                            <div className='col-md-6'>
                                                <label>Profession</label>
                                            </div>
                                            <div className='col-md-6'>
                                                <p>{ userData.work}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}

export default About;