const express = require('express');
const app = express();
app.use(express.json());


// Ejercicio 1: Saludo
app.post('/saludo', (req, res) => {
    try {
        const { nombre } = req.body;
        if (!nombre) throw new Error("El nombre es requerido");
        
        res.json({ estado: 200, mensaje: `Hola, ${nombre}` });
    } catch (error) {
        res.status(400).json({ estado: 400, error: error.message });
    }
});

// Ejercicio 2: Calculadora (con validación de tipos)
app.post('/calcular', (req, res) => {
    try {
        const { a, b, operacion } = req.body;
        
        if (typeof a !== 'number' || typeof b !== 'number') {
            throw new Error("Los valores 'a' y 'b' deben ser números");
        }

        let resultado;
        switch (operacion) {
            case 'suma': resultado = a + b; break;
            case 'resta': resultado = a - b; break;
            case 'multiplicacion': resultado = a * b; break;
            case 'division': 
                if (b === 0) throw new Error("División por cero no permitida");
                resultado = a / b; 
                break;
            default: throw new Error("Operación no válida");
        }

        res.json({ estado: 200, resultado });
    } catch (error) {
        res.status(400).json({ estado: 400, error: error.message });
    }
});

// Ejercicio 3: CRUD de Tareas 
// Array en memoria para almacenar las tareas
let tareas = [];

// 1. CREAR (POST) - /tareas
app.post('/tareas', (req, res) => {
    try {
        const { id, titulo, completada } = req.body;

        // Validación
        if (!id || !titulo) {
            throw new Error("El id y el título son obligatorios");
        }

        const nuevaTarea = { id, titulo, completada: completada || false };
        tareas.push(nuevaTarea);

        res.status(201).json({ 
            estado: 201, 
            mensaje: "Tarea creada con éxito", 
            tarea: nuevaTarea 
        });
    } catch (error) {
        res.status(400).json({ estado: 400, error: error.message });
    }
});

// 2. LEER TODAS (GET) - /leer_tareas
app.get('/leer_tareas', (req, res) => {
    try {
        res.json({ 
            estado: 200, 
            total: tareas.length, 
            tareas: tareas 
        });
    } catch (error) {
        res.status(500).json({ estado: 500, error: "Error al obtener las tareas" });
    }
});

// 3. ACTUALIZAR (PUT) - /actualizar/:id
app.put('/actualizar/:id', (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, completada } = req.body;

        // Buscar el índice de la tarea
        const indice = tareas.findIndex(t => t.id == id);

        if (indice === -1) {
            return res.status(404).json({ estado: 404, error: "Tarea no encontrada" });
        }

        // Actualizar solo los campos enviados
        tareas[indice] = { 
            ...tareas[indice], 
            titulo: titulo !== undefined ? titulo : tareas[indice].titulo,
            completada: completada !== undefined ? completada : tareas[indice].completada
        };

        res.json({ 
            estado: 200, 
            mensaje: "Tarea actualizada", 
            tarea: tareas[indice] 
        });
    } catch (error) {
        res.status(400).json({ estado: 400, error: error.message });
    }
});

// 4. ELIMINAR (DELETE) - /eliminar/:id
app.delete('/eliminar/:id', (req, res) => {
    try {
        const { id } = req.params;
        const longitudInicial = tareas.length;

        // Filtrar el array para quitar la tarea con ese ID
        tareas = tareas.filter(t => t.id != id);

        if (tareas.length === longitudInicial) {
            return res.status(404).json({ estado: 404, error: "No se encontró la tarea para eliminar" });
        }

        res.json({ 
            estado: 200, 
            mensaje: `Tarea con ID ${id} eliminada correctamente` 
        });
    } catch (error) {
        res.status(500).json({ estado: 500, error: error.message });
    }
});
// Ejercicio 4: Validación de Contraseñas
app.post('/validar-password', (req, res) => {
    try {
        const { password } = req.body;

        if (typeof password !== 'string') {
            throw new Error("La contraseña debe ser un texto (string)");
        }

        const errores = [];
        if (password.length < 8) errores.push("Mínimo 8 caracteres");
        if (!/[A-Z]/.test(password)) errores.push("Al menos una mayúscula");
        if (!/[a-z]/.test(password)) errores.push("Al menos una minúscula");
        if (!/[0-9]/.test(password)) errores.push("Al menos un número");

        res.json({
            estado: 200,
            esValida: errores.length === 0,
            errores: errores
        });
    } catch (error) {
        res.status(400).json({ estado: 400, error: error.message });
    }
});
//Ejercicio 5: Conversor de Temperatura
app.post('/convertir-temperatura', (req, res) => {
    try {
        const { valor, desde, hacia } = req.body;
        const escalasValidas = ['C', 'F', 'K'];

        // Validaciones
        if (typeof valor !== 'number') throw new Error("El valor debe ser un número");
        if (!escalasValidas.includes(desde) || !escalasValidas.includes(hacia)) {
            throw new Error("Escalas permitidas: C, F o K");
        }

        // 1. Convertir 'desde' a Celsius ( Temperatura Base)
        let celsius;
        if (desde === 'C') celsius = valor;
        else if (desde === 'F') celsius = (valor - 32) * 5/9;
        else if (desde === 'K') celsius = valor - 273.15;

        // 2. Convertir de Celsius  a (Temperatura destino)
        let resultado;
        if (hacia === 'C') resultado = celsius;
        else if (hacia === 'F') resultado = (celsius * 9/5) + 32;
        else if (hacia === 'K') resultado = celsius + 273.15;

        res.json({
            estado: 200,
            valorOriginal: valor,
            valorConvertido: Number(resultado.toFixed(2)),
            escalaOriginal: desde,
            escalaConvertida: hacia
        });
    } catch (error) {
        res.status(400).json({ estado: 400, error: error.message });
    }
});
//Ejercicio 6: Buscador en Array
app.post('/buscar', (req, res) => {
    try {
        const { array, elemento } = req.body;

        if (!Array.isArray(array)) {
            throw new Error("El campo 'array' debe ser un arreglo");
        }

        const indice = array.indexOf(elemento);
        
        res.json({
            estado: 200,
            encontrado: indice !== -1,
            indice: indice,
            tipoElemento: typeof elemento
        });
    } catch (error) {
        res.status(400).json({ estado: 400, error: error.message });
    }
});
// Ejercicio 7: Contador de Palabras (Error si no es string)
app.post('/contar-palabras', (req, res) => {
    try {
        const { texto } = req.body;
        if (typeof texto !== 'string') throw new Error("El campo 'texto' debe ser una cadena");

        const palabras = texto.trim().split(/\s+/);
        res.json({
            estado: 200,
            totalPalabras: texto.trim() === "" ? 0 : palabras.length,
            totalCaracteres: texto.length
        });
    } catch (error) {
        res.status(400).json({ estado: 400, error: error.message });
    }
});

app.listen(3000, () => console.log('Servicios ejecutándose en puerto 3000'));