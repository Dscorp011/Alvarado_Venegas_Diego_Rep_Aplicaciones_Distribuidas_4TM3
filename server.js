const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
function iterateFunc(doc) {
   console.log(JSON.stringify(doc, null, 4));
}

async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

async function findAllData(client) {
  const cursor = await client.db("sample_mflix").collection("movies").find({}).limit(2);
  // Convertir cursor a array de documentos
  const results = await cursor.toArray();
  console.log("Title: ",results[0]['title']);

  // Mostrar resultados
  console.log("Películas encontradas:");
  console.log(JSON.stringify(results, null, 2));
  //-------------------------------------------------------
  const cursor2 = await client.db("sample_mflix").collection("embedded_movies").find({}).limit(2);
  // Convertir cursor a array de documentos
  const results2 = await cursor2.toArray();
  console.log("Title: ",results2[0]['title']);

  // Mostrar resultados
  console.log("Películas (Embedded) encontradas:");
  console.log(JSON.stringify(results2, null, 2));
//-------------------------------------------------------
  const cursor3 = await client.db("sample_mflix").collection("comments").find({}).limit(2);
  // Convertir cursor a array de documentos
  const results3 = await cursor3.toArray();
  console.log("movie_id: ",results3[0]['text']);
  // Mostrar resultados
  console.log("Comentarios encontrados:");
  console.log(JSON.stringify(results3, null, 2));
}

async function main() {
const uri = "mongodb+srv://daevid0507_db_user:zD9lIM38L9FrDkRh@cluster0.p6qnoju.mongodb.net/?appName=Cluster0";


  const client = new MongoClient(uri, { 
    family: 4, 
    connectTimeoutMS: 10000 
  });

  try {
    // Connect to the MongoDB cluster
    await client.connect();

    // Make the appropriate DB calls
    await listDatabases(client);
    await findAllData(client);

  } catch (e) {
    console.error(e);
  } finally {
    await client.close();
  }
}

main().catch(console.error);
