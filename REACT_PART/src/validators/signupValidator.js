const isEmail = (email) =>
    String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/  
            
            // [^<>()[\]\\.,;:\s@"]+ matches one or more characters that are not special characters
            // (\.[^<>()[\]\\.,;:\s@"]+)* matches zero or more occurrences of a dot followed by one or more characters that are not special characters
            // |(".+") matches a quoted string (for email addresses with quotes) 
        );

const signupValidator = ({name , email , password , confirmPassword})=>{
    const errors = {
        name :"",
        email : "",
        password : "",
        confirmPassword : ""
    };

    if (!name) {
        errors.name = "Name is required"
    };

    if (!email) {
        errors.email = "Email is required"
        // to check email is valid or not , i have written code on top of the file
    }
    else if (!isEmail(email)) {
        errors.email = "Invalid Email"
    }

    if (!password) {
        errors.password = "Password is required"
    }
    else if (password.length < 6) {
        errors.password = "Password must be at least 6 characters long"
    }

    if(!confirmPassword){
        errors.confirmPassword = "Confirm Password is required"
    }
    else if(password !== confirmPassword) {
        errors.confirmPassword = "Passwords do not match"
    }

    return errors;
};
export default  signupValidator;