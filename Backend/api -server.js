var express = require('express');
var app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//Handling CORS Issue
app.use(function(req, res, next) {   
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'DELETE, POST, GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Cache-Control, Pragma, If-Modified-Since');  
  res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
  res.header('Content-Type', 'application/json');
  if (req.method === "OPTIONS") {
      return res.status(200).end();
  }   
  next();
});

const flightData=[{'id':'1','name':'flightOne','from_place':'chennai','to_place':'mumbai','start_Time':'22:10:10'},
                  {'id':'2','name':'flighttwo','from_place':'chennai','to_place':'bangalore','start_Time':'17:10:10'}
                 ];

const passengers = [
                  {'id':'1','name':'sekar','address':'dharmapuri','dob':'29','seat_no': 'Row C,3','seat_details':{'id': '15', 'number': 3, isReserved: true,'tooltip':'Reserver by Sekar','seat_array_index':'2,2'},'seat_checkIn_details':{'id': '15', 'number': 3, isReserved: false,'tooltip':'Reserver by Sekar and not checkedIn','seat_array_index':'2,2'},'seat_status':true,'passport_no':'','checkIn_status':false,isRequiredWheel:false,'flight_id':'1'},
                  {'id':'2','name':'sekar','address':'dharmapuri','dob':'29','seat_no': null,'seat_details':'','seat_status':false,'passport_no':'','checkIn_status':false,isRequiredWheel:false,'flight_id':'2'}
                ]
const ancillaries_services = [                  
                    {'id':'1','name':'meal_service','flight_id':'1'},
                    {'id':'2','name':'drink_service','flight_id':'1'},
                    {'id':'3','name':'meal_service','flight_id':'2'},
                    {'id':'4','name':'drink_service','flight_id':'2'}
]

app.get('/getancillariesbyflight/:flightId', function(req, res, next){
  let services = ancillaries_services.filter((service) =>{
    if(service.flight_id == req.params.flightId) {return service}
  })
  res.json(services);
});


app.post('/addancillary', function(req, res, next) {
  let id = Math.round(+new Date()/1000);
  let ancillary = req.body;
  ancillary.id = id;
  ancillaries_services.push(ancillary);
  res.header('Content-Type', 'application/json');
  res.json({ancillary});
});

app.post('/updateancillary/:id', function(req, res, next) {
  ancillaries_services.map(function (ancillary, index, array) {
    if(ancillary.id == req.params.id){
      let ancillary = req.body;
      ancillary.id = req.params.id;
      ancillaries_services[index] = ancillary;
      res.header('Content-Type', 'application/json');
      res.json({ancillary});
      res.end();
  }
});
});

app.delete('/deleteancillary/:id', function(req, res, next) {
  ancillaries_services.map(function (ancillary, index, array) {
    if(ancillary.id == req.params.id && index > -1){
      let ancillary = ancillaries_services[index];
      ancillaries_services.splice(index,1);
      res.header('Content-Type', 'application/json');
      res.json({ancillary});  
    }
});
});


app.post('/login', function(req, res, next) {
  console.log(JSON.stringify(req.body));
  let adminuser = {username:'admin',password:'admin@123'};
  let staffuser = {username:'staff',password:'staff@123'};
  if(req.body.usertype == 'admin'){
    if(req.body.username === adminuser.username && req.body.password === adminuser.password){
      res.json({'status':'sucess'})
    }else{
      res.json({'status':'err'})
    }
  }else{
    if(req.body.username === staffuser.username && req.body.password === staffuser.password){
      res.json({'status':'sucess'})
    }else{
      res.json({'status':'err'})
    }
  }
});

app.get('/flight_details', function(req, res, next) {
  res.json(flightData);
});

app.get('/passengersByFlight/:flightId', function(req, res, next) {
  //req.params.flightId
  let passengers1= passengers.filter((passenger) =>{
    if(passenger.flight_id == req.params.flightId) {return passenger}
  })
  let seatMapdata = getFlightSeatMapData(req.params.flightId)
  res.json({passenger:passengers1,seatMapdata:seatMapdata});
});

app.get('/passengers/:flightId/:passengerId', function(req, res, next) {
  //req.params.flightId
  let passengers1= passengers.filter((passenger) =>{
    if(passenger.id == req.params.passengerId) {return passenger}
  })
  let seatMapdata = getFlightSeatMapData(req.params.flightId)
  res.json({passenger:passengers1,seatMapdata:seatMapdata});
});

app.post('/addpassenger', function(req, res, next) {
  let id = Math.round(+new Date()/1000);
  let passenger = req.body;
  passenger.id = id;
  passengers.push(passenger);
  res.header('Content-Type', 'application/json');
  res.json({passenger});
});

app.post('/updatepassenger/:id', function(req, res, next) {
  passengers.map(function (passenger, index, array) {
    if(passenger.id == req.params.id){
      let passenger = req.body;
      passenger.id = req.params.id;
      passengers[index] = passenger;
      res.header('Content-Type', 'application/json');
      res.json({passenger});
      res.end();
  }
});
});

app.delete('/deletepassenger/:id', function(req, res, next) {
  passengers.map(function (passenger, index, array) {
    if(passenger.id == req.params.id && index > -1){
      let passenger = passengers[index];
      passengers.splice(index,1);
      res.header('Content-Type', 'application/json');
      res.json({passenger});  
    }
});
});






app.get('/ancilaries_details', function(req, res, next) {
  res.json(ancillaries_services);
});

app.get('/seats_details', function(req, res, next) {
  let data = passengers.filter(function(passenger){
    if(passenger.id === req.params.id) return data;
  });  
  res.json(data);
});

app.get('/flights_overall_data',function(req, res, next) { 
  let data =[];
  for(let i=0;i<flightData.length;i++){
    let passenger  = passengers.filter(function(passenger){if(passenger.flight_id == flightData[i].id) return passenger});
    let service_data = ancillaries_services.filter(function(service){if(service.flight_id == flightData[i].id) return service});
    flightData[i]['passengers'] = passenger;
    flightData[i]['service_datas'] = service_data; 
    data.push(flightData[i])
  }
  res.json(data);
});

function getFlightSeatMapData(flightID){ 
  let flightSeatArray=[];
  let passengersByFlight  = passengers.filter(function(passenger){if(passenger.flight_id == flightID) return passenger});
  let incrementData=1;
  for(let i=0;i<5;i++){
      let rowData=[]; 
      for(let j=0;j<=6;j++){
        if(j <=2 ){
          rowData.push({ 'id':incrementData++, 'number': j+1, isReserved: false })
        }else if(j == 3){
          rowData.push(null)
        }else if(j > 3) {
          rowData.push({ 'id':incrementData++, 'number': j, isReserved: false });
        }
      if(j == 6) flightSeatArray.push(rowData);   
    }
  }
  passengersByFlight.map((value,index,array) =>{
    if(value.seat_status){
      let splitSeat = value.seat_details.seat_array_index.split(',');
      flightSeatArray[splitSeat[0]][splitSeat[1]] = value.seat_details;
    }
  });
  return flightSeatArray;
}

app.listen(8080);
console.log('server is listen ---> localhost:8080 ' );
