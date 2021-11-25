import React, {useEffect, useState} from 'react';

const Contact = () =>{

    // const history = useHistory();
    const [userData, setUserData] = useState({name:"", email:"", phone:"", message:""});

    const  userContact = async() =>{
        try{
            const res = await fetch("/getdata",{
                method : "GET",
                headers : {
                    "Content-Type" : "application/json"
                },
            });

            const data = await res.json();
            console.log(data)
            setUserData({...userData, name:data.name, email:data.email, phone:data.phone});

            if(!res.status===200){
                const error = new Error(res.error);
                throw error;
            }

        }catch(err){
            console.log(err)
        }
    }

    useEffect(()=>{
        userContact();
    }, [])

    // storing data in states

    const handleInputs = (e) =>{
        const name = e.target.name;
        const value = e.target.value;

        setUserData({...userData, [name]:value});
    }

    // send data to backend

    const sendMessage = async (e) =>{
        e.preventDefault();

        const {name, email, phone, message} = userData;
        const res = await fetch('/contact', {
            method : 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name, email, phone, message
            })
        });

        const data = await res.json( );

        if(!data){
            alert("Message not sent");
        }else{
            alert("Message sent");
            setUserData({...userData, message:""});         //after message is sent, text written will be removed
        }
    }

    return(
        <>
        <div className='container contact_container'>
            <div className='contact_info'>
                <div className="container-fluid">
                    <div className='row'>
                        <div className='col-lg-10 offset-lg-1 d-flex justify-content-between'>
                            {/* phone number */}
                            <div className='contact_info_item d-flex justify-content-start align-items-center'>
                                <label htmlFor='name'>
                                        <i class="zmdi zmdi-phone"></i>
                                </label>
                                <div className='contact_info_content'>
                                    <div className='contact_info_title'>
                                        Phone
                                    </div>

                                    <div className='contact_info_text'>
                                        +91 11111 22222
                                    </div>

                                </div>
                            </div>

                            {/* Email Address */}
                            <div className='contact_info_item d-flex justify-content-start align-items-center'>
                                <label htmlFor='name'>
                                        <i class="zmdi zmdi-email"></i>
                                </label>
                                <div className='contact_info_content'>
                                    <div className='contact_info_title'>
                                        Email
                                    </div>

                                    <div className='contact_info_text'>
                                        abc@gmail.com
                                    </div>

                                </div>
                            </div>

                            {/* Address */}
                            <div className='contact_info_item d-flex justify-content-start align-items-center'>
                                <label htmlFor='name'>
                                        <i class="zmdi zmdi-gps-dot"></i>

                                </label>
                                <div className='contact_info_content'>
                                    <div className='contact_info_title'>
                                        Address
                                    </div>

                                    <div className='contact_info_text'>
                                        New Delhi
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact us form */}

            <div className='contact-form'>
                <div className="container">
                    <div className="row">
                        <div className="col=lg-10 ">        {/* offset-lg-1 */}
                            <div className='contact_form_container py-5'>
                                <div className="contact_form_title">
                                    Get In Touch
                                </div>

                                <form method="POST" id='contact_form'>
                                    <div className="contact_form_name d-flex justify-content-between align-items-between">
                                        <input type='text' id='contact_form_name' 
                                        className='contact_form_name input_field' 
                                        name="name" 
                                        value={userData.name} 
                                        onChange={handleInputs} 
                                        placeholder='Your Name' required='true' />

                                        <input type='email' id='contact_form_email' 
                                        className='contact_form_email input_field' 
                                        name="email" 
                                        value={userData.email} 
                                        onChange={handleInputs} 
                                        placeholder='Your Email' required='true' />

                                        <input type='number' id='contact_form_number' 
                                        className='contact_form_number input_field' 
                                        name="phone" 
                                        value={userData.phone} 
                                        onChange={handleInputs} 
                                        placeholder='Your Number' required='true' />
                                    </div>

                                    <div className="contact_form_text mt-4">
                                        <textarea className="text_field contact_form_message" 
                                        name="message" 
                                        value={userData.message} 
                                        onChange={handleInputs} 
                                        placeholder="Message" cols='144' rows='5'></textarea>
                                    </div>

                                    <div className="contact_form_button">
                                        <button type='submit' className='button contact_submit_button' 
                                        onClick={sendMessage}>Submit Message </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}

export default Contact;