import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {tinyUrl, aLinks} from "../../services/tinyurl/tinyurl";
import "./TinyUrlComponent.css";
import logo from '../../assets/images/logo/logo.svg';
import $ from "jquery";
import "bootstrap/dist/js/bootstrap.min.js";
import notify from "../../services/toast/Toast"

function TinyUrlComponent() {
    const appurl = process.env.REACT_APP_LINK
    const [link, setLink] = useState({
        url: "",
        loading: false,
        error: "",
        success: false,
        hash: "",
        public: 1,
        alink: null
    });

    const [allurl, setallurl] = useState({
        alink: null,
        loading: false,
    });

    useEffect(() => {
    	fetchALinks();
    }, [])

    const fetchALinks = () => {
    	aLinks().then(data => {
    		if (data.error) {
                setallurl({ ...allurl, loading: false});
            } else {
                setallurl({ ...allurl, alink: data.links, loading: false});
            }
    	})
    	.catch(err => {
           	setallurl({ ...allurl, loading: false, error: "Please Check Your Internet Connectivity"});
        })
    }

    const handlechange = name => event => {
        setLink({ ...link, [name]: event.target.value });
    }

    const onLoading = () => {
        return link.loading && <p className="text-center text-warning font-weight-bold">Please Wait...</p>
    }

    const hashUrl = () => {
        return link.hash && <p className="text-center text-info font-weight-bold">{appurl}/{link.hash}</p>
    }

    const errorMessage = () => {
        return link.error && <p className="text-center text-danger font-weight-bold">{link.error}</p>
    }

    const contestCard = (contest) => {
        let linktocontest = process.env.REACT_APP_LINK + "/" + contest.hash;
        return (
            <div className="card mb-4" key={contest._id}>
                <div className="card-body">
                    <div className="row">
                        <div className="col-md-10"><span className="contest-name"><a href={linktocontest} target="_blank">{linktocontest}</a></span></div>
                        <div className="col-md-2"><span className="contest-name float-right">{contest.count}</span></div>
                        
                    </div>


                </div>
            </div>
        )
    }

    const allLinks = () => {
    	return allurl.alink != null && allurl.alink.map(contestCard);
    }

    const onSubmit = (event) => {
        event.preventDefault();
        setLink({ ...link, error: "", loading: true })
        tinyUrl(link)
            .then(data => {
                if (data.error) {
                    setLink({ ...link, loading: false, error: data.error.errors[0].msg })
                } else {
                    setLink({ ...link, loading: false, error: "", success: true, hash: data.tinyurl })
                    fetchALinks()
                    notify("success", "Link Created");
                }
            })
            .catch(err => {
                setLink({ ...link, loading: false, error: "Please Check Your Internet Connection" })
                console.log(err);
            })
    }

    return (
    < div className="row min-height-fix-footer mx-0" > 
        <div className="col-md-4 offset-md-4">
            <h1 className="text-center mt-4">Shorten link here</h1>
            <div className="form-group">
                <input type="text" className="form-control" onChange={handlechange("url")} name="url" placeholder="Enter Your Link Here"></input>
            </div>
            <div className="form-group">
                <select className="form-control" onChange={handlechange("public")} name="public">
                    <option value="1">Public</option>
                    <option value="0">Private</option>
                </select>
            </div>
            <div className="form-group">
                <button type="button" onClick={onSubmit} className="form-control btn btn-success">Go</button>
            </div>
            {hashUrl()}
            {onLoading()}
            {errorMessage()}
            <h1 className="text-center mt-5">Your active links</h1>
            {allLinks()}
        </div>
    </ div>);
}

export default TinyUrlComponent;