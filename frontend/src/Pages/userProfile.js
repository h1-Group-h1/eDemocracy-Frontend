var UserProfile = (function() {
    var loggedIn = false;
    var name = "";
    var email = "";
    var password = "";
    var organisations = [];
    
    var getLoggedIn = () => {
        return loggedIn;
    }
    var getName = () => {
        return name;
    }
    var getEmail = () => {
        return email;
    }
    var getPassword = () => {
        return password;
    }
    var getOrganisations = () => {
        return organisations;
    }

    var setLoggedIn = function(data){
        loggedIn = data;
    }
    var setName = (data) => {
        name = data;
    }
    var setEmail = (data) => {
        email = data;
    }
    var setPassword = (data) => {
        password = data;
    }
    var setOrganisations = (data) => {
        organisations = data;
    }

    return {
        getLoggedIn: getLoggedIn,
        setLoggedIn: setLoggedIn,
        getName: getName,
        setName: setName,
        getEmail: getEmail,
        setEmail: setEmail,
        getPassword: getPassword,
        setPassword: setPassword,
        getOrganisations: getOrganisations,
        setOrganisations: setOrganisations
        }
})();

export default UserProfile;