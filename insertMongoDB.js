// npm install express

var express = require("express");
var app = express(); //Contenedor de Endpoints o WS Restful
app.use(express.json());
const { MongoClient } = require("mongodb");
var client = 0;

var dbName = "";
var collectionName = "";

// Create references to the database and collection in order to run
// operations on them.
var database = 0;
var collection = 0;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

function prepareDB() {
  dbName = "myDatabase";
  collectionName = "recipes";

  // Create references to the database and collection in order to run
  // operations on them.
  database = client.db(dbName);
  collection = database.collection(collectionName);
}

async function connectDB() {
  const uri =
    "mongodb+srv://daevid0507_db_user:zD9lIM38L9FrDkRh@cluster0.p6qnoju.mongodb.net/?appName=Cluster0";

  client = new MongoClient(uri);

  // The connect() method does not attempt a connection; instead it instructs
  // the driver to connect using the settings provided when a connection
  // is required.
  await client.connect();
}

app.get("/", async function (request, response) {
  r = {
    message: "Nothing to send",
  };

  response.json(r);
});

/*
Calling this service sending payload as parameters in URL: 
https://typesofwebservices.noesierra.repl.co/serv001?id=Nope&token=2345678dhuj43567fgh&geo=123456789,1234567890
*/
app.get("/serv001", async function (req, res) {
  const user_id = req.query.id;
  const token = req.query.token;
  const geo = req.query.geo;

  r = {
    user_id: user_id,
    token: token,
    geo: geo,
  };

  res.json(r);
});

/*
Calling this service sending payload as parameters in URL: 
https://typesofwebservices.noesierra.repl.co/serv001?id=Nope&token=2345678dhuj43567fgh&geo=123456789,1234567890
*/
app.get("/serv0010", async function (req, res) {
  const user_id1 = req.query.id;
  const token1 = req.query.token;
  const geo1 = req.query.geo;

  r1 = {
    user_id: user_id1,
    token: token1,
    geo: geo1,
  };

  res.json(r1);
});

// Call this service sending payload in body: raw - json
/*
{
    "id": "nope",
    "token": "ertydfg456Dfgwerty",
    "geo": "12345678,34567890"
}
*/
app.post("/serv002", async function (req, res) {
  const user_id = req.body.id;
  const token = req.body.token;
  const geo = req.body.geo;

  r = {
    user_id: user_id,
    token: token,
    geo: geo,
  };

  res.json(r);
});

/*
Call this service sending parameter as a part of the URL
https://typesofwebservices.noesierra.repl.co/serv003/1234567
*/
app.post("/serv003/:info", async function (req, res) {
  const info = req.params.info;
  let r = { info: info };
  res.json(r);
});

app.post("/receipt/insert", async function (req, res) {
  const recipes = [
    {
      name: "elotes cocidos",
      ingredients: [
        "corn",
        "mayonnaise",
        "cotija cheese",
        "sour cream",
        "lime",
      ],
      prepTimeInMinutes: 35,
    },
  ];

  let result = "";

  try {
    const insertManyResult = await collection.insertMany(recipes);
    console.log(
      `${insertManyResult.insertedCount} documents successfully inserted.\n`,
    );
    result = `${insertManyResult.insertedCount} documents successfully inserted.`;
  } catch (err) {
    console.error(
      `Something went wrong trying to insert the new documents: ${err}\n`,
    );
    result = `Something went wrong trying to insert the new documents: ${err}`;
  }
  let r = { result: result };
  res.json(r);
});

//Servicio de inserción de nuevas recetas a la colección de recetas en MongoDB Atlas
/* Call this service sending payload in body: raw - json
{
    "name": "Chilaquiles Verdes",
    "ingredientes": [
        "tortilla ",
        "salsa verde",
        "Pollo ",
        "crema",
        "queso"
    ],
    "prepTimeInMinutes": 25
}
*/
app.post("/receipt/insertv2", async function (req, res) {
  // 1.Datos tomados directamente del cuerpo de la petición
  const recipes = req.body;

  let result = "";

  // 2.Validamos que el cuerpo no esté vacío 
  if (!recipes || (Array.isArray(recipes) && recipes.length === 0)) {
    return res.status(400).json({ result: "No se proporcionaron datos de receta." });
  }
  // 3. Intento de inserción de los datos en la colección de MongoDB
  try {
   
    const dataToInsert = Array.isArray(recipes) ? recipes : [recipes];
    
    const insertManyResult = await collection.insertMany(dataToInsert);
    
    console.log(`${insertManyResult.insertedCount} documentos insertados.\n`);
    result = `${insertManyResult.insertedCount} documentos insertados con éxito.`;
  } catch (err) {
    console.error(`Error al insertar: ${err}\n`);
    result = `Error al insertar: ${err.message}`;
  }

  res.json({ result: result });
});
//servicio para visualizar las recetas almacenadas en la colección de MongoDB Atlas

app.get("/recipes/view", async function (req, res) {
  try {
    // 1. Creamos el cursor (buscando todos los documentos 
    
    const cursor = await client.db("myDatabase").collection("recipes").find({}).limit(20);

    // 2. Convertimos el cursor a un array de documentos
    const results = await cursor.toArray();

    // 3. Mostramos en consola para depuración 
    console.log("Recetas encontradas en la base de datos:");
    console.log(JSON.stringify(results, null, 2));

    // 4. Enviamos la respuesta al cliente (Postman)
    res.json({
      status: "success",
      count: results.length,
      data: results
    });

  } catch (err) {
    console.error(`Error al consultar las recetas: ${err}\n`);
    res.status(500).json({
      status: "error",
      message: `No se pudieron obtener las recetas: ${err.message}`
    });
  }
});

app.listen(3000, function () {
  console.log("Aplicación ejemplo, escuchando el puerto 3000!");
  connectDB();
  prepareDB();
});
