import React, { useEffect, useState } from "react";
import "./HomeComponent.css";
import logo from '../../assets/images/logo/logo.svg';
import $ from "jquery";
import "bootstrap/dist/js/bootstrap.min.js";

function HomeComponent() {

    return (

        <div>
            <div className="jumbotron jumbotron-fluid bg-dark text-light">
                <div className="container">
                    <h1 className="display-4">Tiny URL</h1>
                    <p className="lead">Love short and crispy URLs? We have got it for you !!!</p>

                    <div className="align-items-center text-center my-5">
                        <h2 className="py-3">Like What We do ?</h2>
                        <button className="btn btn-lg btn-warning text-light" data-toggle="modal" data-target="#paymentModal">Buy Me A Coffee ?</button>

                        <h4 className="text-center mt-5">Want more Creativity? <a className="text-decoration-none" href="http://saurass.in" target="_blank"><span className="contact-me">Contact me !</span></a></h4>

                    </div>
                </div>
            </div>

            <div className="container justify-content-center text-center py-5">
                <h1>Keep Short & Simple</h1>
            </div>

            <div className="container">
                <div className="row">
                    <div className="col-md-6 col-sm-12 justify-content-center">
                        <h2>We mainly focus on</h2>

                        <ul className="hideBulletInli">
                            
                            <li className="d-flex align-items-center my-4">
                                
                                <span>Highly scalable system</span>
                            </li>

                            <li className="d-flex align-items-center my-4">
                                
                                <span>small, easy to handle url shortner</span>
                            </li>
                            
                        </ul>

                    </div>
                    <div className="col-md-6 col-sm-12 d-flex justify-content-center align-items-center">
                        <div className="container align-items-center">
                            <img alt="Hope never dies" className="right-logo" src={logo}></img>
                            <h2 className="text-center mt-3">Big Steps Begin with Small Steps</h2>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomeComponent