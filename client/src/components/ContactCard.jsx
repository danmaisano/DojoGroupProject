
import React from 'react';
import { Card, Button } from 'react-bootstrap';
import email from './../assets/icons/email.svg';
import phone from './../assets/icons/phone.svg';
import cellphone from './../assets/icons/cellphone.svg';
import edit from './../assets/icons/edit.svg';



const ContactCard = () => {

    // Open default email client and prefil address
    // TODO: Grab email from DB to populate function ----- <= TODO
    const sendEmail = () => {
        window.location.href = 'mailto:johndoe@companyname.com';
    };

    return (
        <div className='w-25'>
            <Card>
                {/* TODO: Populate information with DB query ----- <= TODO  */}
                <Card.Header>
                    <h2>John Doe</h2>
                </Card.Header>
                <Card.Body className='p-4'>
                    <div className='d-flex justify-content-between'>
                        <div>
                            <h3 className='mb-0'>Company Name</h3>
                            <h6 className='text-light'>Company Title</h6>
                            <p className='mb-0'><img src={cellphone} className='m-1' /> <a href='#'>(111)222-3333</a></p>
                            <p><img src={phone} className='m-1' /> <a href='#'>(111)333-4444</a></p>
                            <p><img src={email} className='m-1' /><a href='#' onClick={sendEmail}>johndoe@companyname.com</a></p>
                        </div>
                        <div className='m-auto w-50'>
                            <div className='d-flex flex-column m-auto w-75'>
                                <div className='d-flex flex-column p-2 border-bottom border-light'>
                                    <div className='justify-content-between d-flex'>
                                        {/* Loop through 3 most recent bids pending.  ----- <= TODO */}
                                        {/* "More" will lead to filtered list */}
                                        <h5>Pending:</h5>
                                        <a href='#'>More</a>
                                    </div>
                                    <a href='#'>Bid loop link.</a>
                                    <a href='#'>Bid loop link.</a>
                                    <a href='#'>Bid loop link.</a>
                                </div>
                                <div className='d-flex flex-column p-2'>
                                    <div className='d-flex justify-content-between'>
                                        {/* Loop through 3 most recent bids won.   ----- <= TODO */}
                                        {/* "More" will lead to filtered list */}
                                        <h5>Secured:</h5>
                                        <a href='#'>More</a>
                                    </div>
                                    <a href='#'>Secured loop link.</a>
                                    <a href='#'>Secured loop link.</a>
                                    <a href='#'>Secured loop link.</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        {/* TODO: Creat onClick for Edit icon that replaces <p>    ----- <= TODO*/}
                        {/* with text area followed by a PUT/PATCH */}
                        <div className='d-flex justify-content-between w-100'>
                            <h5>Notes:</h5>
                            <img src={edit} className='m-1' />
                        </div>
                        <p className='border-top border-light p-2'>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                            Impedit aliquid harum quod corporis, cum expedita veniam itaque
                            architecto facilis commodi asperiores, veritatis incidunt
                            voluptatibus dolor quam. Vero eligendi modi assumenda.
                        </p>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default ContactCard;