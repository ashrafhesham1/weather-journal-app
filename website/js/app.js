/* Global Variables */
const weatherApiKey = '&appid=523d25437ed71720f75bd4c607a28e38&units=imperial';
const weatherApiBaseLnk='https://api.openweathermap.org/data/2.5/weather?';

//getting weather data
let getweather=async(url='',key='',zip=0)=>{
    const res = await fetch(url+zip+key);
    try{
        const data = await res.json();
        return data;
    }
    catch(err){
        console.log(err)
    }
}

//send user data to the server
const postData = async(url= '', newData={})=>{
    const res = await fetch(url,{
        method : 'POST',
        credentials : 'same-origin',
        headers : {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(newData)
    })
    try{
        const resData = await res.json() ;
        return resData;
    }
    catch(err){
        console.log(err);
    }
}

//printing the data to the page
const updateUi = async(url='')=>{
    const res = await fetch(url);
    try{
        const data = await res.json() ;
        document.querySelector('#date').textContent=`date: ${data['date']}`;
        document.querySelector('#temp').textContent=`temprature: ${data['temp']}`;
        document.querySelector('#content').textContent=`feeling: ${data['userRes']}`;
        document.querySelector('#holder-entry').style.visibility='visible';
        return data;
    }
    catch(err){
        console.log(err);
    }
}



document.querySelector('#generate').addEventListener('click',()=>{
    zipCode=document.querySelector('#zip').value;
    if (typeof zipCode !== "number"){
        alert("Please enter a valid Zip code");
        return null;
    }
    getweather(weatherApiBaseLnk,weatherApiKey,`zip=${zipCode},us`)
    .then((data)=>{
        const userfeeling = document.querySelector('#feelings').value;
        const dateObj = new Date();
        const curdate = dateObj.getFullYear()+'-'+(dateObj.getMonth()+1)+'-'+dateObj.getDate();

        postData('/update',{temp:data.main.temp,date:curdate,userRes:userfeeling});
    })
    .then((data)=>{
        const lastEntery = updateUi('/retrieve');
    })
})