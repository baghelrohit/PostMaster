console.log("postmaster");

//Utility Function
//1. Function to get DOM Element Form String
function getElementFromString(string) {
    let div = document.createElement('div');
    div.innerHTML = string;
    return div.firstElementChild;
}

//initailizing No. of parameters:
let addedParamCount = 0;

//hiding the parametersBox initially
let parametersBox = document.getElementById('parametersBox');
requestparametersBox.style.display = 'none';

//If the user click on parameterBox , hide the json Box
let parameterradio = document.getElementById('parameterradio')
parameterradio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'none';//to hide jsonbox
    document.getElementById('requestparametersBox').style.display = 'block';//showing parameter box when json box is hidden
})

//If the user click on JsonBox , hide the parameterBox
let jsonradio = document.getElementById('jsonradio')
jsonradio.addEventListener('click', () => {
    document.getElementById('requestparametersBox').style.display = 'none';//to hide parameter box
    document.getElementById('requestJsonBox').style.display = 'block';//showing json box when parameter box is hidden
})

//If user clicks on  + Button ,Add more parameters
let addParam = document.getElementById('addParam');
addParam.addEventListener('click', () => {
    let params = document.getElementById('params');
    let string = `<div class="row my-2">
                        <label for="url" class="col-md-2 col-label">Parameter ${addedParamCount + 2}</label>
                        <div class=" col-md-4 ">
                            <input type="text" class="form-control" id="parameterKey${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} Key">
                        </div>
                        <div class="col-md-4">
                            <input type="text" class="form-control" id="parameterValue${addedParamCount + 2}" placeholder="Enter Parameter${addedParamCount + 2} Value">
                        </div>
                        <button class="col-md-1 deleteParam"  class="btn btn-primary"> - </button>
                    </div>`
    let paramElement = getElementFromString(string);
    // console.log(paramElement);
    params.appendChild(paramElement);//will append the String in DOM
    //Add an event listener to remove the parameter on clicking - button
    let deleteParam = document.getElementsByClassName('deleteParam');
    for (item of deleteParam) {
        item.addEventListener('click', (e) => {
            e.target.parentElement.remove();//this will remove the parameter behind - Button

        })
    }
    addedParamCount++;
})

//If the user Clicks On Submit button
let submit = document.getElementById('submit');
submit.addEventListener('click', () => {
    document.getElementById('responsePrism').innerHTML = "Please wait.. Fetching response...";
    //fetch all the values user has entered
    let url = document.getElementById('url').value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='contentType']:checked").value;


    //If a user has used parameters option insted of json, then collects all the parameters in an object
    if (contentType == 'params') {
        data = {};//blank object
        for (i = 0; i < addedParamCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value;
            }
        }
        data = JSON.stringify(data)//data ek JSON string hai
    }
    else {
        data = document.getElementById('requestJsonText').value;
    }
    console.log(url)
    console.log(requestType)
    console.log(data)

    // If the request type is GET ,invoke fetch api to create a GET request
    if(requestType=='GET'){
        fetch(url,{
            method: 'GET',
        })
        .then(response=>response.text())
        .then((text)=>{
            document.getElementById('responsePrism').innerHTML=text;//example: randomuser.me api
            Prism.highlightAll();//it will highlight the json in response
        })
    }
    else{
        fetch(url, {
            method: 'POST', 
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
              }  
        })
        .then(response=> response.text())
        .then((text) =>{
            // document.getElementById('responseJsonText').value = text;
            document.getElementById('responsePrism').innerHTML = text;
            Prism.highlightAll();//it will highlight the json
        });
    }
});