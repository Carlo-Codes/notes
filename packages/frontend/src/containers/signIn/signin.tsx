import { Auth } from "aws-amplify"
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {CognitoUser} from '@aws-amplify/auth'
import { useNavigate } from "react-router-dom";

/* "carlo.scrocca+notes@mezze.io", "Passw0rd!" */

interface props {
    authStateFn: Dispatch<SetStateAction<CognitoUser | undefined>>
    authState: CognitoUser | undefined
}

export default function SignInPage(props: props){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signInError, setSignInError] = useState('')
    const navigate = useNavigate()

    useEffect(()=>{
        if(props.authState){
            return navigate('./')
        }
    },[props.authState])

    const signIn = async () => {
        try {
            const signedIn = await Auth.signIn(email, password)
            console.log(signedIn)
            props.authStateFn(await Auth.currentAuthenticatedUser());
            return navigate('/')
        } catch (error) {
            if(error instanceof Error){
                setSignInError(error.message)
                console.error(error);
            }
            props.authStateFn(undefined)

        }
    }
    
    return(
        <>
        <form>
            <label>Email: 
                <input 
                id="Email" 
                type="text"
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
                />
            </label>
            <label>Password: 
                <input 
                id="Email" 
                type='password'
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
                />
            </label>
        </form>
        <button onClick={signIn}>sign in</button>
        <div className="errorMsg">{signInError}</div>
        </>
    )

}