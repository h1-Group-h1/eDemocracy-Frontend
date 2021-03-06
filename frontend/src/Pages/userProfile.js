var UserProfile = (function() {
    const stor = window.sessionStorage;
    // var loggedIn = false;
    // var name = "";
    // var email = "";
    // var password = "";
    // var organisations = [];
    
    var getLoggedIn = () => {
        return stor.getItem('loggedIn') === 'true';
    }
    var getName = () => {
        return stor.getItem('name');
    }
    var getEmail = () => {
        return stor.getItem('email');
    }
    var getPassword = () => {
        return stor.getItem('password');
    }
    var getOrganisations = () => {
        return JSON.parse(stor.getItem('organisations'));
        // return stor.getItem('organisations');
    }

    var setLoggedIn = function(data){
        stor.setItem('loggedIn', data);
    }
    var setName = (data) => {
        stor.setItem('name', data);
    }
    var setEmail = (data) => {
        stor.setItem('email', data);
    }
    var setPassword = (data) => {
        stor.setItem('password', data);
    }
    var setOrganisations = (data) => {
        stor.setItem('organisations', JSON.stringify(data));
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