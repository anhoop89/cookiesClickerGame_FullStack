// import React from 'react';

// export default function Contact() {
//     return <div>
//         <form className="form mx-auto p-3 bg-transparent rounded col-md-10">

//             <div className="form-outline mb-4">
//                 <input type="text" id="name" className="form-control" placeholder="Name" />
//                 <label className="form-label" htmlFor="name" hidden>Name</label>
//             </div>

//             <div className="form-outline mb-4">
//                 <input type="email" id="email" name="email" className="form-control"
//                     placeholder="email@example.com" />
//                 <label className="form-label" htmlFor="email" hidden>Email address</label>
//             </div>

//             <div className="form-outline mb-4">
//                 <textarea className="form-control" id="message" 
//                     placeholder="Please type your message here!" style={{ height: 200 }}></textarea>
//                 <label className="form-label" htmlFor="message" hidden>Message</label>
//             </div>

//             <button type="submit" name="submit" value="Submit" className="btn btn-primary btn-block mb-4">
//                 Send
//                 <i className="fa-regular fa-message"></i>
//             </button>
//         </form>
//     </div>
// }


import { HiOutlineMail } from 'react-icons/hi';
export default function Contact() {
  return (
    <div className="container form mt-10 mx-auto"> 
    
    <h1> Contact Form OR Feedback Form</h1>

    <form className="text-left mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">

      <div className="mb-4 ">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
          Name
        </label>
        <input
          className="shadow text-white-700 appearance-none border rounded w-full py-2 px-3 
          .leading-tight focus:outline-none focus:shadow-outline-blue"
          id="name"
          type="text"
          placeholder="Enter your name"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
          Email
        </label>
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            <HiOutlineMail className="h-5 w-5 text-white-700" />
          </span>
          <input
            className="shadow text-white-700 appearance-none border rounded w-full py-2 pl-10 
            pr-3 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Enter your email"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="message">
          Message
        </label>
        <textarea
          className="shadow appearance-none border rounded w-full py-2 px-3 text-white-700 
          leading-tight focus:outline-none focus:shadow-outline"
          id="message"
          rows={6}
          placeholder="Enter your message"
        />
      </div>
      <div className="flex items-center justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded 
          focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Send Message
        </button>
      </div>
    </form>
    </div>
  );
}


