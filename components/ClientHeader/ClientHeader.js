import React from "react";


const ClientHeader=()=>{
    return(
      <>
        <nav className="items-center rounded-4 mb-20px sm:mt-30  flex bg-clientRed justify-between">
          <div className="text-white ml-3 font-mukta text-25 sm:text-35 font-extrabold my-13px sm:ml-9 sm:my-9">
            Foody.
          </div>
          <img
            src="/countryFlags/uk.svg"
            className="cursor-pointer sm:w-41 w-33 mr-3 sm:mr-6"
            alt=""
          />
        </nav>
      </>
     
    )
}
export default ClientHeader;