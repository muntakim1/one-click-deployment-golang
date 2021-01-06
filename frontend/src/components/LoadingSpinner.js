import React from 'react';
import { usePromiseTracker } from "react-promise-tracker";
import Loader from "react-loader-spinner";

const LoadingSpinnerComponent = (props) => {
    const { promiseInProgress } = usePromiseTracker();

    return promiseInProgress && <div className="spinner">
            <Loader type="Watch" color="#2BAD60" height="300" width="300" />
        </div>
};

export default LoadingSpinnerComponent