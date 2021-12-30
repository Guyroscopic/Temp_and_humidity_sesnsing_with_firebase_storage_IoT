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
database.ref('Humidity').once('value',(snapshot)=>{
    document.getElementById("allGraphs").style.display = "block";
    document.getElementById("loader").style.display = "none";
    fetchedData = Object.values(snapshot.val());
    console.log(fetchedData);
    lineChart(fetchedData, 'humidityChart', "Humidity");
    barChart(fetchedData, 'humidityBarChart', "Humidity");
})
database.ref('Temperature').once('value',(snapshot)=>{
    fetchedData = Object.values(snapshot.val());
    console.log(fetchedData);
    lineChart(fetchedData, 'temperatureChart', 'Temperature');
    barChart(fetchedData, 'temperatureBarChart', 'Temperature');
})
function lineChart(fetchedData, id,label) {
        const ctx = document.getElementById(id).getContext('2d');
        const myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: Array.from(Array(Object.keys(fetchedData).length).keys()),
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

function barChart(fetchedData, id,label) {
    const ctx = document.getElementById(id).getContext('2d');
    const myChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            labels: Array.from(Array(Object.keys(fetchedData).length).keys()),
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




