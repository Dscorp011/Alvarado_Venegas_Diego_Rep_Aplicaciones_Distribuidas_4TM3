// npm install express

var express = require('express');
var app = express(); //Contenedor de Endpoints o WS Restful

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async function (request, response) {

    r ={
      'message':'Nothing to send'
    };

    response.json(r);
});


// Call this service sending payload in body: raw - json
/*
{
    "id": "pt001",
    "lat": "99.1234567898765",
    "long": "-19.4567654566543"
}
*/
app.post("/echo", async function (req, res) {
  const cid = req.body.id;
  const clat = req.body.lat;
  const clong = req.body.long;

    r ={
      'id_e': cid,
      'lat_e': clat,
      'long_e': clong
    };

    res.json(r);
});

app.post("/fragmenta", async function (req, res) {
  const cid = req.body.id;
  const clat = req.body.lat;
  const clong = req.body.long;

    r ={
      'id_e': cid,
      'lat_e': clat,
      'long_e': clong
    };

    const [id_entero,id_decimal] = cid.toString().split('.');
    const [lat_entero,lat_decimal]= clat.toString().split('.');
    const [long_entero,long_decimal]= clong.toString().split('.');

    r_spt={
      '---------': 'Fragmentación de datos',
      'id_entero': id_entero,
      'id_decimal': id_decimal,
      'lat_entero': lat_entero,
      'lat_decimal': lat_decimal,
      'long_entero': long_entero,
      'long_decimal': long_decimal
    };
    
    res.json({...r,...r_spt});
});
app.listen(3000, function() {
    console.log('Servicios activos en el puerto 3000!');
});
