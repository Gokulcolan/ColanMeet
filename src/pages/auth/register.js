// import { FormHelperText, Grid, IconButton, InputAdornment, OutlinedInput, TextField } from "@mui/material";
// import React, {  useState } from "react";
// import { router } from "next/router";
// import { UilAngleLeft } from "@iconscout/react-unicons";
// import { useFormik } from "formik";
// import * as yup from "yup";
// import { useDispatch } from "react-redux";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import { registerApi } from "src/redux/action/authAction";

// const Register = () => {

//   const dispatch = useDispatch();
  
//   const [secureTextEntry, setSecureTextEntry] = useState(true);
//   const [TextEntry, setTextEntry] = useState(true);
//   const passRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#%&])(?=.{8,})/

//   const formik = useFormik({
//     initialValues: {
//       username: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//     },
//     validationSchema: yup.object({
//       username: yup.string().required("Name is required"),
//       email: yup.string().email().required("Email is required"),
//       password: yup
//         .string()
//         .required('Please Enter your password')
//         .matches(passRegExp, "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character")
//         .matches(passRegExp, "Enter strong password")
//         .matches(passRegExp, "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"),
//       confirmPassword: yup
//         .string()
//         .required("Confirm Password must be required")
//         .oneOf([yup.ref("password"), null], "Password not match"),
//     }),
//     onSubmit: (res) => {
//       const reqBody = {
//         username: res?.username,
//         email: res?.email,
//         password: res?.password
//       }
//       dispatch(registerApi(reqBody));
//     }
//   })

//   const toggleSecureEntry = () => {
//     setSecureTextEntry(!secureTextEntry);
//   };

//   const toggleEntry = () => {
//     setTextEntry(!TextEntry);
//   };

//   return (

//     <div style={{ margin: "0px !important", padding: "0px !important" }}>
//       <Grid container>
//         <Grid item xl={7} lg={7} md={5} sm={12} xs={12}>
//           <div className="container-login">
//             <p>
//               {" "}
//               <IconButton
//                 onClick={() => {
//                   router.push("/auth/login");
//                 }}
//                 className="bck-ico"

//               >
//                 <UilAngleLeft />
//               </IconButton>{" "}
//             </p>
//             <div >
//               <h1>Register With Us</h1>
//               <p style={{ marginTop: "10px", marginBottom: "32px" }}>
//                 Enter your details and start using Colan Meet Application!{" "}
//               </p>
//               <label className="label-text-2">User Name </label>
//               <TextField
//                 fullWidth
//                 type="text"
//                 name="username"
//                 placeholder="Enter your Name"
//                 value={formik.values.username}
//                 onChange={formik.handleChange}
//                 sx={{
//                   background: "white",
//                   "& legend": { display: "none" },
//                   "& fieldset": { top: 0 },
//                   borderRadius: 15,
//                   mb: 1.5,
//                 }}
//                 helperText={
//                   formik.touched.username ? formik.errors.username : null
//                 }
//                 error={
//                   formik.touched.username ? formik.errors.username : null
//                 }
//               />
//               <label className="label-text-2">Email </label>
//               <TextField
//                 id="outlined-basic"
//                 name="email"
//                 className="input-col"
//                 fullWidth
//                 variant="outlined"
//                 onBlur={formik.handleBlur}
//                 onChange={formik.handleChange}
//                 value={formik.values.email}
//                 helperText={formik.touched.email ? formik.errors.email : null}
//                 placeholder={"Enter the your email address"}
//                 type="email"
//                 sx={{ color: "white", borderColor: "white", marginBottom: "1rem" }}
//                 error={formik.touched.email ? formik.errors.email : null}
//               />
//               <label className="label-text-2">Password </label>
//               <OutlinedInput
//                 className="form-ht"
//                 id="password"
//                 fullWidth
//                 height="0.4375em"
//                 name="password"
//                 placeholder="Password"
//                 type={secureTextEntry ? "password" : "text"}
//                 value={formik.values.password}
//                 onChange={formik.handleChange}
//                 error={
//                   formik.touched.password ? formik.errors.password : null
//                 }
//                 endAdornment={
//                   <InputAdornment position="end">
//                     <IconButton
//                       aria-label="toggle password visibility"
//                       onClick={toggleSecureEntry}
//                       edge="end"
//                     >
//                       {secureTextEntry ? <VisibilityOff /> : <Visibility />}
//                     </IconButton>
//                   </InputAdornment>
//                 }
//               />
//               <FormHelperText error>
//                 {formik.touched.password ? formik.errors.password : null}
//               </FormHelperText>
//               <br />
//               <label className="label-text-2">Confirm Password </label>
//               <OutlinedInput
//                 className="form-ht"
//                 sx={{ marginBottom: "2px" }}
//                 id="password"
//                 height="0.4375em"
//                 fullWidth
//                 name="confirmPassword"
//                 placeholder="Confirm Password"
//                 type={TextEntry ? "password" : "text"}
//                 value={formik.values.confirmPassword}
//                 onChange={formik.handleChange}
//                 error={
//                   formik.touched.confirmPassword
//                     ? formik.errors.confirmPassword
//                     : null
//                 }
//                 endAdornment={
//                   <InputAdornment position="end">
//                     <IconButton
//                       aria-label="toggle password visibility"
//                       onClick={toggleEntry}
//                       edge="end"
//                     >
//                       {TextEntry ? <VisibilityOff /> : <Visibility />}
//                     </IconButton>
//                   </InputAdornment>
//                 }
//               />
//               <FormHelperText error>
//                 {formik.touched.confirmPassword
//                   ? formik.errors.confirmPassword
//                   : null}
//               </FormHelperText>
//             </div>
//             <div
//               style={{
//                 alignItems: "left",
//                 marginTop: "20px",
//                 textAlign: "left",
//               }}
//             >
//               <p>
//                 Have an account?{" "}
//                 <span
//                   style={{ fontWeight: "900", color: "#012970" }}
//                   onClick={() => {
//                     router.push("/auth/login");
//                   }}
//                   className="hoveEff"
//                 >
//                   Login!
//                 </span>
//               </p>
//             </div>
//             <div style={{ textAlign: "center", marginTop: "30px" }}>
//               <button type="submit" className="sign-in-bttn" onClick={formik.handleSubmit}>Register</button>
//             </div>
//           </div>
//         </Grid>
//         <Grid item xl={5} lg={5} md={7} sm={12} xs={12}>
//           <img src="/assets/Images/colan-login.png" className="login-bg-img" />
//         </Grid>
//       </Grid>
//     </div>
//   );
// };

// export default Register;


import { FormHelperText, Grid, IconButton, InputAdornment, OutlinedInput, TextField } from "@mui/material";
import React, { useState } from "react";
import { useRouter } from "next/router"; // Changed import from "router"
import { UilAngleLeft } from "@iconscout/react-unicons";
import { useFormik } from "formik";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { registerApi } from "src/redux/action/authAction";

const Register = () => {
  const dispatch = useDispatch();
  const router = useRouter(); // Changed variable name from "router"

  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [TextEntry, setTextEntry] = useState(true);
  const passRegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$!@#%&])(?=.{8,})/;

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: yup.object({
      username: yup.string().required("Please Enter your Name").matches(/^[a-zA-Z\s]+$/, "Username can only contain alphabet characters"),
      email: yup.string().email().required("Please Enter your Email"),
      password: yup
        .string()
        .required('Please Enter your Password')
        .matches(passRegExp, "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character")
        .matches(passRegExp, "Enter strong Password"),
      confirmPassword: yup
        .string()
        .required("Please Enter your Confirm Password")
        .oneOf([yup.ref("password"), null], "ConfirmPassword not Matched"),
    }),
    onSubmit: (res) => {
      const reqBody = {
        username: res?.username,
        email: res?.email,
        password: res?.password
      }
      dispatch(registerApi(reqBody));
    }
  })


  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  const toggleEntry = () => {
    setTextEntry(!TextEntry);
  };
  const handlePaste = (event) => {
    event.preventDefault(); // Prevent password copy paste event
  };

  return (
    <div style={{ margin: "0px !important", padding: "0px !important" }}>
      <Grid container>
        <Grid item xl={7} lg={7} md={5} sm={12} xs={12}>
          <div className="container-login">
            <p>
              {" "}
              <IconButton
                onClick={() => {
                  router.push("/auth/login");
                }}
                className="bck-ico"
              >
                <UilAngleLeft />
              </IconButton>{" "}
            </p>
            {/* Rest of your code... */}
            <div >
              <h1>Register With Us</h1>
              <p style={{ marginTop: "10px", marginBottom: "32px" }}>
                Enter your details and start using Colan Meet Application!{" "}
              </p>
              <label className="label-text-2">User Name </label>
              <TextField
                fullWidth
                type="text"
                name="username"
                placeholder="Enter your Name"
                value={formik.values.username}
                onChange={formik.handleChange}
                sx={{
                  background: "white",
                  "& legend": { display: "none" },
                  "& fieldset": { top: 0 },
                  borderRadius: 15,
                  mb: 1.5,
                }}
                helperText={
                  formik.touched.username ? formik.errors.username : null
                }
                error={
                  formik.touched.username ? formik.errors.username : null
                }
              />
              <label className="label-text-2">Email </label>
              <TextField
                id="outlined-basic"
                name="email"
                className="input-col"
                fullWidth
                variant="outlined"
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
                helperText={formik.touched.email ? formik.errors.email : null}
                placeholder={"Enter your Email "}
                type="email"
                sx={{ color: "white", borderColor: "white", marginBottom: "1rem" }}
                error={formik.touched.email ? formik.errors.email : null}
              />
              <label className="label-text-2">Password </label>
              <OutlinedInput
                className="form-ht"
                id="password"
                fullWidth
                height="0.4375em"
                name="password"
                placeholder="Enter your Password"
                type={secureTextEntry ? "password" : "text"}
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password ? formik.errors.password : null
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={toggleSecureEntry}
                      edge="end"
                    >
                      {secureTextEntry ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText error>
                {formik.touched.password ? formik.errors.password : null}
              </FormHelperText>
              <br />
              <label className="label-text-2">Confirm Password </label>
              <OutlinedInput
                className="form-ht"
                sx={{ marginBottom: "2px" }}
                id="password"
                height="0.4375em"
                fullWidth
                name="confirmPassword"
                placeholder="Enter your Confirm Password"
                type={TextEntry ? "password" : "text"}
                value={formik.values.confirmPassword}
                onPaste={handlePaste}
                onChange={formik.handleChange}
                error={
                  formik.touched.confirmPassword
                    ? formik.errors.confirmPassword
                    : null
                }
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={toggleEntry}
                      edge="end"
                    >
                      {TextEntry ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
              <FormHelperText error>
                {formik.touched.confirmPassword
                  ? formik.errors.confirmPassword
                  : null}
              </FormHelperText>
            </div>
            <div
              style={{
                alignItems: "left",
                marginTop: "20px",
                textAlign: "left",
              }}
            >
              <p>
                Already have an account?{" "}
                <span
                  style={{ fontWeight: "900", color: "#012970" }}
                  onClick={() => {
                    router.push("/auth/login");
                  }}
                  className="hoveEff"
                >
                  Login!
                </span>
              </p>
            </div>
            <div style={{ textAlign: "center", marginTop: "30px" }}>
              <button type="submit" className="sign-in-bttn" onClick={formik.handleSubmit}>Register</button>
            </div>
          </div>
        </Grid>
        <Grid item xl={5} lg={5} md={7} sm={12} xs={12}>
          <img src="/assets/Images/colan-login.png" className="login-bg-img" />
        </Grid>
      </Grid>
    </div>
  );
};

export default Register;


