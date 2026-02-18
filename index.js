// npm install express

var express = require('express');
var app = express(); //Contenedor de Endpoints o WS Restful

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async function (request, response) {

    r ={
      'message':'Principal Page'
    };

    response.json(r);
});




/*1. mascaracteres: recibe dos cadenas y regresa la que tenga más caracteres.
Si son iguales, regresa la del primer parámetro*/

// Call this service sending payload in body: raw - json
/*
{
    "cd1": "pt00132",
    "cd2": "pt002"
}
*/
app.post("/mascaracteres", async function (req, res) {

  let r = {
    cadena1: req.body.cd1,
    cadena2: req.body.cd2,
    mascaracteres: null
  };

  try {
    const { cd1, cd2 } = req.body; 

   
    if (cd1 === undefined || cd2 === undefined) {
      throw new Error("No se pueden enviar cadenas vacías: se esperan 'cd1' y 'cd2'");
    }

    if (typeof cd1 !== 'string' || typeof cd2 !== 'string') {
      throw new Error("Ambos parámetros deben ser cadenas de texto");
    }

    if (cd1.length >= cd2.length) {
      r.mascaracteres = cd1;
    } else {
      r.mascaracteres = cd2;
    }

    res.json(r);

  } catch (error) {
    
    console.error("Error en /mascaracteres:", error.message);
    
    res.status(400).json({
      error: "Solicitud inválida",
      mensaje: error.message,
      recibido: r
    });
  }
});

/*2. menoscaracteres: recibe dos cadenas y regresa la que tenga menos
caracteres. Si son iguales, regresa la del primer parámetro*/

// Call this service sending payload in body: raw - json
/*
{
    "cd1": "pt001",
    "cd2": "pt00"
}
*/
app.post("/menoscaracteres", async function (req, res) {

  let r = {
    cadena1: req.body.cd1,
    cadena2: req.body.cd2,
    menoscaracteres: null
  };

  try {
    const { cd1, cd2 } = req.body; 

   
    if (cd1 === undefined || cd2 === undefined) {
      throw new Error("No se pueden enviar cadenas vacías: se esperan 'cd1' y 'cd2'");
    }

    if (typeof cd1 !== 'string' || typeof cd2 !== 'string') {
      throw new Error("Ambos parámetros deben ser cadenas de texto");
    }

    if (cd1.length <= cd2.length) {
      r.menoscaracteres = cd1;
    } else {
      r.menoscaracteres = cd2;
    }

    res.json(r);

  } catch (error) {
    
    console.error("Error en /menoscaracteres:", error.message);
    
    res.status(400).json({
      error: "Solicitud inválida",
      mensaje: error.message,
      recibido: r
    });
  }
});
/*3. numcaracteres: recibe una cadena y regresa el número de caracteres que
la cadena Tiene*/

// Call this service sending payload in body: raw - json
/*
{
    "cd": "Servicio de conteo de caracteres en el puerto 2000",
    
}
*/

app.post("/numcaracteres", async function (req, res) {

  let r = {
    cadena: req.body.cd,
    numcaracteres: null
  };

  try {
    const { cd } = req.body; 

   
    if (cd === undefined) {
      throw new Error("No se puede enviar una cadena vacía: se espera 'cd'");
    }

    if (typeof cd !== 'string') {
      throw new Error("El parámetro debe ser una cadena de texto");
    }

    r.numcaracteres = cd.length;

    res.json(r);

  } catch (error) {
    
    console.error("Error en /numcaracteres:", error.message);
    
    res.status(400).json({
      error: "Solicitud inválida",
      mensaje: error.message,
      recibido: r
    });
  }
});
 /*4.palindroma: recibe una cadena y regresa true si la cadena es una
palindroma, y false en caso contrario*/

// Call this service sending payload in body: raw - json
/*
{
    "cd": "Anita lava la tina"
}
*/

app.post("/palindroma", async function (req, res) {

  let r = {
    cadena: req.body.cd,
    palindroma: null
  };

  try {
    const { cd } = req.body; 

   
    if (cd === undefined) {
      throw new Error("No se puede enviar una cadena vacía: se espera 'cd'");
    }

    if (typeof cd !== 'string') {
      throw new Error("El parámetro debe ser una cadena de texto");
    }

    const cleanedString = cd.replace(/[^A-Za-z0-9]/g, '').toLowerCase();
    const reversedString = cleanedString.split('').reverse().join('');
    r.palindroma = cleanedString === reversedString;

    res.json(r);

  } catch (error) {
    
    console.error("Error en /palindroma:", error.message);
    
    res.status(400).json({
      error: "Solicitud inválida",
      mensaje: error.message,
      recibido: r
    });
  }
});
/*5.concat: recibe dos cadenas y regresa la concatenación iniciando con el
primer parámetro*/
// Call this service sending payload in body: raw - json
/*
{
    "cd1": "Hola",
    "cd2": "Mundo"
}
*/

app.post("/concat",async function (req, res) {
  let r={
  cadena1:req.body.cd1,
  cadena2:req.body.cd2,
  concat_v:null
  };
  try {
    const { cd1, cd2 } = req.body; 
    if (cd1 === undefined || cd2 === undefined) {
      throw new Error("No se pueden enviar cadenas vacías: se esperan 'cd1' y 'cd2'");
    }

    if (typeof cd1 !== 'string' || typeof cd2 !== 'string') {
      throw new Error("Ambos parámetros deben ser cadenas de texto");
    }
    r.concat_v=cd1.concat(" ",cd2);

    res.json(r);
  } catch (error) {
    console.error("Error en /Concat:",error.message)
    
    res.status(400).json({
      error: "Solicitud inválida",
      mensaje: error.message,
      recibido: r
  });
}
});
/*6. applysha256: recibe una cadena, le aplica una encriptación SHA256 y
regresa como resultado la cadena original y la encriptada */ 
// Call this service sending payload in body: raw - json
/*
{
    "cd": "Texto a encriptar con SHA256"
}
*/
app.post("/applysha256",async function (req, res) {
  let r={
  cadena:req.body.cd,
  sha256_v:null
  };
  try {
    const { cd } = req.body;
    if (cd === undefined) {
      throw new Error("No se puede enviar una cadena vacía: se espera 'cd'");
    }

    if (typeof cd !== 'string') {
      throw new Error("El parámetro debe ser una cadena de texto");
    }
    const crypto = require('crypto');
    r.sha256_v=crypto.createHash('sha256').update(cd).digest('hex');

    res.json(r);
  } catch (error) {
    console.error("Error en /applysha256:",error.message)
    
    res.status(400).json({
      error: "Solicitud inválida",
      mensaje: error.message,
      recibido: r
    });
  }
});
/*7.verifysha256: recibe una cadena encriptada, una cadena normal, a la
cadena normal le aplica SHA256, la compara con la cadena encriptada y
regresa true si coinciden, y false en otro caso*/
// Call this service sending payload in body: raw - json
/*
{
    "cdNormal": "Texto a verificar",
    "cdEncriptada": "Cadena encriptada con SHA256 del texto a verificar"
}
*/
app.post("/verifysha256",async function (req, res) {
  let r={
  cadenaNormal:req.body.cdNormal,
  cadenaEncriptada:req.body.cdEncriptada,
  verify_v:null
  };
  try {
    const { cdNormal, cdEncriptada } = req.body;
    if (cdNormal === undefined || cdEncriptada === undefined) {
      throw new Error("No se pueden enviar cadenas vacías: se esperan 'cdNormal' y 'cdEncriptada'");
    }

    if (typeof cdNormal !== 'string' || typeof cdEncriptada !== 'string') {
      throw new Error("Ambos parámetros deben ser cadenas de texto");
    }
    const crypto = require('crypto');
    const hashNormal = crypto.createHash('sha256').update(cdNormal).digest('hex');
    r.verify_v = hashNormal === cdEncriptada;

    res.json(r);
  } catch (error) {
    console.error("Error en /verifysha256:", error.message);
    res.status(400).json({
      error: "Solicitud inválida",
      mensaje: error.message,
      recibido: r
    });
  }
});

app.listen(3000, function() {
    console.log('Servicios activos en el puerto 3000!');
});
