const firebaseConfig = {
    apiKey: "AIzaSyDp7FUCnZU3vsMiKXluqjaNRFZN5_HbB1A",
    authDomain: "iot-project-183.firebaseapp.com",
    databaseURL: "https://iot-project-183-default-rtdb.firebaseio.com",
    projectId: "iot-project-183",
    storageBucket: "iot-project-183.appspot.com",
    messagingSenderId: "19596243819",
    appId: "1:19596243819:web:47d20ab0f5e05d359dd22e"
  };
const app = firebase.initializeApp(firebaseConfig);
var database = firebase.database();
database.ref().once('value',(snapshot)=>{
    document.getElementById("allGraphs").style.display = "block";
    document.getElementById("loader").style.display = "none";
    
    timeArray = new Array();
    Object.values(snapshot.val().data).forEach((value)=>{
        timeArray.push(new Date(value.timestamp).toLocaleString("en-US"));
        }
    );
    var fetchedDataHumidityArr = new Array();
    Object.values(snapshot.val().data).forEach((value)=>{
        fetchedDataHumidityArr.push(value.humidity)
        }
    );

    lineChart(fetchedDataHumidityArr, timeArray, 'humidityChart', "Humidity");
    barChart(fetchedDataHumidityArr,timeArray, 'humidityBarChart', "Humidity");
})
database.ref().once('value',(snapshot)=>{
    timeArray = new Array();
    Object.values(snapshot.val().data).forEach((value)=>{
        timeArray.push(new Date(value.timestamp).toLocaleString("en-US"));
        }
    );

    var fetchedDataTempArr = new Array();
    Object.values(snapshot.val().data).forEach((value)=>{
        fetchedDataTempArr.push(value.temp)
        }
    );
    lineChart(fetchedDataTempArr,timeArray, 'temperatureChart', 'Temperature');
    barChart(fetchedDataTempArr,timeArray, 'temperatureBarChart', 'Temperature');
})
function lineChart(fetchedData, timeArray, id,label) {
        const ctx = document.getElementById(id).getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: timeArray,
                datasets: [{
                    label: label,
                    data: fetchedData,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }]
            }
        });
}

function barChart(fetchedData, timeArray, id,label) {
    console.log(timeArray);
    const ctx = document.getElementById(id).getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: timeArray,
            datasets: [{
                label: label,
                data: fetchedData,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        }
    });
}




