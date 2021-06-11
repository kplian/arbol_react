import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import './loading.css';

const Loading = () => {
    return (
        <div className="loading-shading-mui">
            <CircularProgress className="loading-icon-mui" />
        </div>
    );
};
export default Loading;