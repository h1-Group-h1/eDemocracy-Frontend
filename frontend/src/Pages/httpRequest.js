export function Requests() {
    this.postRequest = (path, data, callback, failCallback = null, username = null, password = null) => {
        const request = new XMLHttpRequest();
        request.open("POST", `http://localhost:8000/${path}`);
        request.setRequestHeader(
            'Content-Type',
            'application/json;charset=UTF-8'
        );
        if(username){
            request.setRequestHeader(
                'Authorization',
                'Basic ' + btoa(`${username}:${password}`)
            );
        }
        request.onload = () => {
            console.log('recieved: ', request.status);
            var responseData = JSON.parse(request.response);
            if (request.status == 200){
                // success, callback
                callback(responseData);
            }else{
                console.log('ERROR: ', request.status, '\n', JSON.parse(request.response))
                if(failCallback != null){
                    failCallback(responseData);
                }
            }
        }
        request.send(JSON.stringify(data))
    }

    this.getRequest = (path, callback, failCallback = null, username = null, password = null) => {
        const request = new XMLHttpRequest();
        request.open("GET", `http://localhost:8000/${path}`);
        request.setRequestHeader(
            'Content-Type',
            'application/json;charset=UTF-8'
        );
        if(username){
            request.setRequestHeader(
                'Authorization',
                'Basic ' + btoa(`${username}:${password}`)
            );
        }
        request.onload = () => {
            console.log('recieved: ', request.status);
            var responseData = JSON.parse(request.response);
            if (request.status == 200){
                // success
                callback(responseData);
            }else{
                console.log('ERROR: ', request.status, '\n', JSON.parse(request.response))
                if(failCallback != null){
                    failCallback(responseData);
                }
            }
        }
        request.send()
    }
}