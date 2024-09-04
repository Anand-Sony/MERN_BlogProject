const changePasswordValidator = ({oldPassword , newPassword})=>{
    const errors = {
        oldPassword: "",
        newPassword: ""
    };

    if(!oldPassword){
        errors.oldPassword = "Old Password is Required";
    };
    if(!newPassword){
        errors.newPassword = "New Password is Required";
    }
    else if(newPassword.length < 6){
        errors.newPassword = "Password must be at least 6 characters long";
    }

    if (oldPassword && oldPassword===newPassword) {
        errors.newPassword = "You are providing same Old Password";
    }

    return errors;
};
export default changePasswordValidator;