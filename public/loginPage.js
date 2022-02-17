"use strict";

let userForm = new UserForm();

userForm.loginFormCallback = (data) => {
    ApiConnector.login(data, (response) => {
        if (response.success) {
            location.reload();
        } else {
            userForm.setLoginErrorMessage(`Ошибка: ${response.error}`);
        }
    });
}
userForm.registerFormCallback = (data) => {
    ApiConnector.register(data, (response) => {
        if(response.success) {
            location.reload();
        }
        else {
            userForm.setRegisterErrorMessage(`Ошибка регистрации пользователя ${data.login}: ${response.error}`);
        }
    }
    );
}