var UserCreds = (function() {
    const stor = window.localStorage;
    // var loggedIn = false;
    // var name = "";
    // var email = "";
    // var password = "";
    // var organisations = [];
    
    var getEmail = () => {
        return stor.getItem('email');
    }
    var getPassword = () => {
        return stor.getItem('password');
    }

    var setEmail = (data) => {
        stor.setItem('email', data);
    }
    var setPassword = (data) => {
        stor.setItem('password', data);
    }

    return {
        getEmail: getEmail,
        setEmail: setEmail,
        getPassword: getPassword,
        setPassword: setPassword,
        }
})();

export default UserCreds;