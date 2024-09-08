const isEmail = (email) =>
    String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/  
            
            // [^<>()[\]\\.,;:\s@"]+ matches one or more characters that are not special characters
            // (\.[^<>()[\]\\.,;:\s@"]+)* matches zero or more occurrences of a dot followed by one or more characters that are not special characters
            // |(".+") matches a quoted string (for email addresses with quotes) 
        );

const profileValidator = ({name , email })=>{
    const errors = {
        name :"",
        email : ""
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

    return errors;
};
export default  profileValidator;