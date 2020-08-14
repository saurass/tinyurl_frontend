import React, { useEffect, useState } from "react";
import logo from '../../assets/images/logo/logo.svg';
import $ from "jquery";
import "bootstrap/dist/js/bootstrap.min.js";
import notify from "../../services/toast/Toast";
import {fetchUrl} from "../../services/tinyurl/tinyurl";
import { useParams } from "react-router-dom";

function RedirectComponent() {
    const { tinyhash } = useParams();

    const [link, setLink] = useState({
        loading: true,
        error: "",
        success: false,
        redirect: ""
    });

    useEffect(() => {
        fetchLink();
    }, []);

    const fetchLink = () => {
        fetchUrl(tinyhash)
            .then(data => {

                if (data.error) {
                    setLink({ ...link, error: data.error, loading: false})
                } else {
                    setLink({ ...link, success: true, loading: false, error: "", redirect: data.redirect});
                }
            
            })
            .catch(err => {
                setLink({ ...link, loading: false, error: "Please Check Your Internet Connection" })
            })
    }

    const onLoading = () => {
        return link.loading && <p className="text-center text-warning font-weight-bold">Please Wait...</p>
    }

    const hashUrl = () => {
        if(link.redirect) {
            window.location = link.redirect;
        }
    }

    const errorMessage = () => {
        return link.error && <p className="text-center text-danger font-weight-bold">{link.error}</p>
    }

    return (
    < div className="row min-height-fix-footer mx-0" > 
        <div className="col-md-4 offset-md-4">
            
            {hashUrl()}
            {onLoading()}
            {errorMessage()}
        </div>
        {/* {JSON.stringify(link)} */}
    </ div>);
}

export default RedirectComponent;