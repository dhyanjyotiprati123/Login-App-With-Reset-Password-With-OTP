
export const RegisterData = [
    {
        id: 1,
        type: "text",
        name: "name",
        placeholder: "Full Name",
        errorMsg: "Name should be between 3-16 characters long",
        required: true,
        pattern: "^[a-zA-Z ]{3,16}$"
    },
    {
        id: 2,
        type: "email",
        name: "email",
        placeholder: "Email Address",
        errorMsg: "Email Should be valid",
        required: true
    },
    {
        id: 3,
        type: "password",
        name: "password",
        placeholder: "Password",
        errorMsg: "password should contain 1 uppercase letter 1 number 1 special character and between 8-16 characters long",
        required: true,
        pattern: "^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$"
    },
    {
        id: 4,
        type: "password",
        name: "cpassword",
        placeholder: "Confirm Password",
        errorMsg: "passwords didn't match",
        required: true
    }
]