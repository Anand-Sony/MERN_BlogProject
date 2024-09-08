const recoverPasswordValidator = ({code , password}) => {
    const errors = {
        code: '',
        password: ''
    };
    if (!code) {
        errors.code = "Code is required"
    };
    if (!password) {
        errors.password = "Password is required"
    }
    else if(password.length <6){
        errors.password = "Password must be at least 6 characters long"
    }

    return errors;
};
export default recoverPasswordValidator;