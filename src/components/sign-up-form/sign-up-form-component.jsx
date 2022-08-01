import { useState } from "react";

import { 
    createAuthUserWithEmailAndPassword, 
    createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const SignUpForm = () => {

    const [formFields, setFormFields] = useState(defaultFormFields);
    const { displayName, email, password, confirmPassword } = formFields;

    // console.log(formFields)

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        if(password!==confirmPassword){
            alert('password not equal ')
            return;
        }

        try{
            const { user } = await createAuthUserWithEmailAndPassword(
                email,
                password
            );

            await createUserDocumentFromAuth(user, { displayName });
            resetFormFields();
            
        }catch(error){

            if(error.code === 'auth/email-already-in-use'){
                alert('email already in use');
            }else{
                console.log('error ', error);
            }
            
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        setFormFields({...formFields, [name]:value});
    };

    return(
        <div>
            <h1>Sign up with your email and password</h1>
            <form onSubmit={handleSubmit}>
                
                <label htmlFor="">Display Name</label>
                <input 
                    type="text" 
                    onChange={handleChange} 
                    name="displayName" 
                    required
                    value={displayName}
                />

                <label htmlFor="">Email</label>
                <input 
                    type="email" 
                    onChange={handleChange} 
                    name="email" 
                    required
                    value={email}
                />

                <label htmlFor="">Password</label>
                <input 
                    type="password" 
                    onChange={handleChange} 
                    name="password" 
                    required
                    value={password}
                />

                <label htmlFor="">Confirm Password</label>
                <input 
                    type="password" 
                    onChange={handleChange} 
                    name="confirmPassword" 
                    required
                    value={confirmPassword}
                />

                <button type="submit">Sign Up</button>

            </form>
        </div>
    );
};

export default SignUpForm