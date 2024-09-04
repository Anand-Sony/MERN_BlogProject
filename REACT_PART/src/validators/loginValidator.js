const isEmail = (email) =>
    String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/  
            
            // [^<>()[\]\\.,;:\s@"]+ matches one or more characters that are not special characters
            // (\.[^<>()[\]\\.,;:\s@"]+)* matches zero or more occurrences of a dot followed by one or more characters that are not special characters
            // |(".+") matches a quoted string (for email addresses with quotes) 
        );

const loginValidator = ({email , password}) =>{
    const errors = {
        email: "",
        password: "",
    }

    if(!email){
        errors.email = "Email is required";
    }
    else if(!isEmail(email)){
        errors.email = "Invalid email";
    }

    if(!password){
        errors.password = "Password is required";
    }
    return errors;
};
export default loginValidator;