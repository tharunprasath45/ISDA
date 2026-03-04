import React from 'react'
 import { ToastContainer, toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';
function Reccomendations() {
    const notify = () => toast("Wow so easy!");
    const notification = () =>{
      toast.info('🦄 Wow so easy!', {
position: "top-center",
autoClose: 5000,
hideProgressBar: false,
closeOnClick: false,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "dark",

});
    }
  return (
    <div>
        <button onClick={notification}>Notify!</button>
        <ToastContainer />
      </div>
  )
}

export default Reccomendations
