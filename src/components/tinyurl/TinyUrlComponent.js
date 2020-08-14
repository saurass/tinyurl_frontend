import React, { useEffect, useState } from "react";
import {tinyUrl} from "../../services/tinyurl/tinyurl";
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
        public: 1
    });

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

    const onSubmit = event => {
        event.preventDefault();
        link.loading = true;
        setLink({ ...link, error: "" })
        tinyUrl(link)
            .then(data => {
                if (data.error) {
                    setLink({ ...link, loading: false, error: data.error.errors[0].msg })
                } else {
                    setLink({ ...link, loading: false, error: "", success: true, hash: data.tinyurl })
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
            <h1 className="text-center mt-4">Shorten your link here</h1>
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
        </div>
        {/* {JSON.stringify(link)} */}
    </ div>);
}

export default TinyUrlComponent;