import React from 'react'
import Doughnut from "./Doughnut";
import Emptycell from "./Emptycell";
import Statisticaltable from "./Statisticaltable";
import Emptycelltwo from "./Emptycelltwo";

const Dashboard = () => {
    return (
        <>
            <div className="flex flex-col w-full mr-6 mb-6">
                <div className="flex justify-between w-full mb-5 ml-4">
                    <Doughnut />
                    <Statisticaltable />
                </div>
                <div className="flex ml-4">
                    <Emptycell />
                    <Emptycelltwo />
                </div>
            </div>
         </>
    )
}

export default Dashboard