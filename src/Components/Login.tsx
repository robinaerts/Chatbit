import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import GoogleButton from "react-google-button";
import { auth } from "../config/firebaseConfig";
import { useNavigate } from "react-router-dom";

export default function Login() {
    let navigate = useNavigate();
    const SignInWithGoogle = async() => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
        .then(() => {
            navigate("/app");
        })
    }

    return (
        <div>
            <GoogleButton onClick={SignInWithGoogle}/>
        </div>
    )
}