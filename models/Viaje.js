import * as Sequalize from "sequelize";
import db from '../config/db.js';

export const Viaje = db.define('viaje', {
    titulo: {
        type: Sequalize.STRING,
    },
    precio: {
        type: Sequalize.STRING,
    },
    fecha_ida: {
        type: Sequalize.DATE,
    },
    fecha_vuelta: {
        type: Sequalize.DATE,
    },
    imagen: {
        type: Sequalize.STRING,
    },
    descripcion: {
        type: Sequalize.STRING,
    },
    disponibles: {
        type: Sequalize.STRING,
    },
    slug: {
        type: Sequalize.STRING,
    },
    favorito: {
        type: Sequalize.INTEGER,
    },
})