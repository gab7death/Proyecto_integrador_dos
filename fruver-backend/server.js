const oracledb = require('oracledb');
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

async function fun() {
    let con;

    try {
        // Conexión a la base de datos con las credenciales y connectString adecuadas
        con = await oracledb.getConnection({
            user: "proyectobddos", 
            password: "proyectobddos", 
            connectString: "localhost:1521/XE" // Asegúrate de usar el puerto correcto y el nombre de servicio
        });

        // Consulta en la tabla PRODUCTO
        const data = await con.execute(
            `SELECT ID_PRODUCTO, NOMBRE, FECHA_CADUCIDAD, PESO, FECHA_ENTRADA 
             FROM PRODUCTO`
        );
        console.log("Resultados de la tabla PRODUCTO:", data.rows);

    } catch (err) {
        console.error("Error al conectar o consultar la base de datos:", err);
    } finally {
        if (con) {
            try {
                await con.close(); // Asegúrate de cerrar la conexión
            } catch (err) {
                console.error("Error al cerrar la conexión:", err);
            }
        }
    }
}

fun();
