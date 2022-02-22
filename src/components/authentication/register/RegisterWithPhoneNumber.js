import { useState , useRef } from 'react';
// material
import { Stack, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useNavigate } from 'react-router-dom'
import {signInWithPhoneNumber , RecaptchaVerifier, getAuth} from "firebase/auth";
import { ref, set } from "firebase/database";
import { database } from '../../../firebase'

// ----------------------------------------------------------------------

export default function RegisterWithPhoneNumber( { venueId }) {
    const navigate = useNavigate();
    const inputRef = useRef();
    const [number, setNumber] = useState('');
    const [verificationNumber, setVerificationNumber] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [verifySubmitting, setVerifySubmitting] = useState(false);
    const [allowVerifyCode, setVerifyCode] = useState(false);
    const [touch, setTouch] = useState(false);
    const validatePhoneNumber= () =>
    {
        const  phoneno = /^\d{10}$/;
        if(number.match(phoneno))
        {
            return true;
        }
        return false;
    }
    const validateVerificationCode = () =>{
        const  verificationCode = /^\d{6}$/;
        if(verificationNumber.match(verificationCode))
            return true;
 
        return false;
    }
  const phoneNumber = async () => {
    setIsSubmitting(true);
    console.log("Here");
    const auth = getAuth();
    setVerifyCode(false);
    if(!window.appVerifier) {
        window.appVerifier = new RecaptchaVerifier(
            "recaptcha-container",
            {
              size: "invisible"
             }, auth
          );
    }
      const { appVerifier } = window;
        const actualNumber = `+91${number}`
        signInWithPhoneNumber(auth, actualNumber, appVerifier)
        .then((confirmationResult)=> {
          console.log("Success");
          setVerifyCode(true);
          console.log(confirmationResult);
          setTouch(false);
          setIsSubmitting(false);
          inputRef.current.focus();
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).

          //    confirmationResult.confirm(123457);
          window.confirmationResult = confirmationResult;
        })
        .catch((error) => {
            console.log(window.appVerifier)
                setIsSubmitting(false);
                console.log(error)
        });
   
  }
  const handleChange = (e)=> {
      setNumber (e.target.value);
  }
  const handleBlur = () => {
      setTouch(true);
  }
  const handleVerificationChange = (e) => {
      setVerificationNumber(e.target.value);
  }
  const verifyCode = () => {
    setVerifySubmitting(true);
    const { confirmationResult }  = window;
    confirmationResult.confirm(verificationNumber).then((result)=>{
        console.log(result);
        const { user } = result;
        set(ref (database, `users/${user.uid}`), {
          phoneNumber : number,
      });
        setVerifySubmitting(false);
        alert("Verified af man, redirecting!")
        navigate(`/dashboard/parkingmanagement/checkin/${venueId}`, {replace : true});

    }).catch(error => {
        setVerifySubmitting(false);
        alert("Wrong verification code buddy", error)
    })
  }


  return (
      <div>
          <div id = 'recaptcha-container'/>
        <Stack spacing={3}>
          {allowVerifyCode ? null : 
            <TextField
              fullWidth
              label="Phone number"
              type = "number"
              error = {touch && !validatePhoneNumber()}
              value = {number}
              onChange = {handleChange}
              onBlur = {handleBlur}
              helperText = {touch && !validatePhoneNumber() ? "Enter a 10-digit phone number" : null}
            /> }
                {allowVerifyCode ? 
<TextField
            inputRef={inputRef}
              fullWidth
              disabled = {!allowVerifyCode}
              type = "number"
              error = {touch && !validateVerificationCode()}
              label="Verification code"
              value = {verificationNumber}
              onBlur = {handleBlur}
              helperText = {touch && !validateVerificationCode() ? "Enter the 6-digit OTP" : null}
              onChange = {handleVerificationChange}
            /> : null}
        {allowVerifyCode ? null :
          <LoadingButton
            fullWidth
            size="large"
            id = "phoneNumberSubmit"
            disabled = {!validatePhoneNumber()}
            variant="contained"
            onClick = {phoneNumber}
            loading = {isSubmitting}
          > 
            Receive OTP
          </LoadingButton>}
          {allowVerifyCode ? 
          <LoadingButton
            fullWidth
            size="large"
            disabled = { !validateVerificationCode()}
            variant="contained"
            loading = {verifySubmitting}
            onClick = {verifyCode}
          >
              Verify Code
          </LoadingButton> : null}
        </Stack>
   
    </div>
  );
}
