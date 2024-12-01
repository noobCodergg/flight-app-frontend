

import RegistrationImage from "../Components/RegistrationImage";
import RegistrationForm from "../Components/RegistrationForm";

function Registration() {
  
  return (
    <div className="w-full h-screen flex items-center justify-center ">
      <div className="w-3/4 h-3/4 flex h-auto hover:shadow-2xl hover:shadow-teal-950 transition-all duration-1000">
         <RegistrationImage/>
         <RegistrationForm/>
      </div>
    </div>
  );
}

export default Registration;


