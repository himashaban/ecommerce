import axios from 'axios';
import { useFormik } from 'formik';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'

export default function Register() {

let validationSchema=Yup.object().shape({
  name:Yup.string().min(3,' name minlenght is 3').max(10,' name maxlenght is 10').required('name is required'),
  email:Yup.string().email('email is in valid').required('email is required'),
  password:Yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d{0,6})[A-Za-z\d]{7,}$/,'password is invalid').required('password is required'),
  rePassword:Yup.string().oneOf([Yup.ref('password')]).required('password and repassowrd is not matched'),
  phone:Yup.string().matches(/^01[0125][0-9]{8}$/,'phone number must be egyption number').required('phone is required'),
})


  let navigate = useNavigate();

  // function myValidation(values) {
  //   let errors = {};

  //   if (!values.name) {
  //     errors.name = "Name is required";
  //   } else if (!/^[A-Z][a-z]{3,5}$/.test(values.name)) {
  //     errors.name = 'Name must start with uppercase';
  //   }

  //   if (!values.email) {
  //     errors.email = "Email is required";
  //   } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(values.email)) {
  //     errors.email = "Invalid email";
  //   }

  //   if (!values.password) {
  //     errors.password = "Password is required";
  //   } else if (values.password.length < 8) {
  //     errors.password = "Password must be at least 8 characters long";
  //   }

  //   if (!values.rePassword) {
  //     errors.rePassword = "Confirm Password is required";
  //   } else if (values.password !== values.rePassword) {
  //     errors.rePassword = "Passwords do not match";
  //   }

  //   if (!values.phone) {
  //     errors.phone = "Phone number is required";
  //   } else if (values.phone.length !== 11) {
  //     errors.phone = "Invalid phone number";
  //   }

  //   return errors;
  // }

  async function HandelRegister(values) {
    console.log('Form values:', values);
    let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values);
    console.log(data);

    if (data.message === 'success') {
      navigate('/');
    }
  }

  let formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
     validationSchema,
    onSubmit: HandelRegister,
  });

  return (
    <>
      <div className="py-6 max-w-xl mx-auto">
        <h2 className="text-4xl flex text-green-700 font-mono font-bold mb-6">Register Now</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="relative z-0 w-full mb-5 group">
            <input
              value={formik.values.name}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              id="name"
              type="text"
              name="name"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
            />
            <label
              htmlFor="name"
              className="absolute text-sm text-gray-500 text-black duration-300 transform -translate-y-6 scale-75 top-3 left-0 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-600 peer-focus:dark:text-blue-500"
            >
              Enter your Name:
            </label>
          </div>
          {formik.errors.name && formik.touched.name && (
            <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span className="font-medium">{formik.errors.name}</span>
            </div>
          )}

          <div className="relative z-0 w-full mb-5 group">
            <input
              value={formik.values.email}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              id="email"
              type="text"
              name="email"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
            />
            <label
              htmlFor="email"
              className="absolute text-sm text-gray-500 text-black duration-300 transform -translate-y-6 scale-75 top-3 left-0 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-600 peer-focus:dark:text-blue-500"
            >
              Enter your email:
            </label>
          </div>
          {formik.errors.email && formik.touched.email && (
            <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span className="font-medium">{formik.errors.email}</span>
            </div>
          )}

          <div className="relative z-0 w-full mb-5 group">
            <input
              value={formik.values.password}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              id="password"
              type="password"
              name="password"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
            />
            <label
              htmlFor="password"
              className="absolute text-sm text-gray-500 text-black duration-300 transform -translate-y-6 scale-75 top-3 left-0 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-600 peer-focus:dark:text-blue-500"
            >
              Enter your password:
            </label>
          </div>
          {formik.errors.password && formik.touched.password && (
            <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span className="font-medium">{formik.errors.password}</span>
            </div>
          )}

          <div className="relative z-0 w-full mb-5 group">
            <input
              value={formik.values.rePassword}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              id="rePassword"
              type="password"
              name="rePassword"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
            />
            <label
              htmlFor="rePassword"
              className="absolute text-sm text-gray-500 text-black duration-300 transform -translate-y-6 scale-75 top-3 left-0 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-600 peer-focus:dark:text-blue-500"
            >
              Confirm your password:
            </label>
          </div>
          {formik.errors.rePassword && formik.touched.rePassword && (
            <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span className="font-medium">{formik.errors.rePassword}</span>
            </div>
          )}

          <div className="relative z-0 w-full mb-5 group">
            <input
              value={formik.values.phone}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              id="phone"
              type="phone"
              name="phone"
              className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none text-black dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              placeholder=""
            />
            <label
              htmlFor="phone"
              className="absolute text-sm text-gray-500 text-black duration-300 transform -translate-y-6 scale-75 top-3 left-0 origin-[0] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 peer-focus:text-blue-600 peer-focus:dark:text-blue-500"
            >
              Enter your phone:
            </label>
          </div>
          {formik.errors.phone && formik.touched.phone && (
            <div className="p-2 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <span className="font-medium">{formik.errors.phone}</span>
            </div>
          )}

          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
