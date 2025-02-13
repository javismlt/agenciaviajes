import {Viaje} from "../models/Viaje.js";
import {Testimonial} from "../models/testimoniales.js";
import moment from 'moment';


const paginaInicio = async (req, res) => {

    const promiseDB=[];

    promiseDB.push(Viaje.findAll({limit: 3}))
    promiseDB.push(Testimonial.findAll({
        limit: 3,
        order: [["Id", "DESC"]],
    }))

    try {
        const resultado = await Promise.all(promiseDB);

        res.render('inicio', {
            titulo: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimonios: resultado[1],
        });
    }catch (err) {
        console.log(err);
    }
}

const paginaNosotros = (req, res) => {
    const titulo = 'Nosotros';
    res.render('nosotros', {
        titulo,
    });
};

const paginaViajes = async (req, res) => {
    const titulo = 'Viajes';
    const viajes = await Viaje.findAll();

    res.render('viajes', {
        pagina: 'Viajes Disponibles',
        viajes: viajes,
    });
};

const paginaTestimonios = async (req, res) => {
    try{
        const testimonios = await Testimonial.findAll({
            limit: 6,
            order: [["Id", "DESC"]],
        });
        res.render('testimonios', {
            pagina: 'Testimonios',
            testimonios: testimonios,
            moment: moment,
        });
    }catch(err){
        console.log(err);
    }
};

const guardarTestimonios = async (req, res) => {
    console.log(req.body);
    const{nombre, correo, mensaje}=req.body;

    const errores= [];

    if(nombre.trim()===''){
        errores.push({mensaje: 'Nombre vacio'});
    }

    if(correo.trim()===''){
        errores.push({mensaje: 'Correo vacio'});
    }

    if(mensaje.trim()===''){
        errores.push({mensaje: 'Mensaje vacio'});
    }

    if(errores.length>0){
        res.render('testimonios', {
            titulo: 'Testimonios',
            errores: errores,
            nombre: nombre,
            correo: correo,
            mensaje: mensaje,
        })
    } else{
        try{
            await Testimonial.create({nombre: nombre, correoelectronico: correo,mensaje: mensaje,});
            res.redirect('/testimonios');
        }catch(error){
            console.log(error);
        }
    }
};

const paginaDetalleViajes = async (req, res) => {
    const{slug} = req.params;

    try{
        const resultado = await Viaje.findOne({where:{slug:slug}});

        res.render('viaje', {
            titulo: "Informacion del Viaje",
            resultado,
            moment:moment,
        });

    }catch(err){
        console.log(err);
    }
};

const paginaFavoritos = async (req, res) => {

    const titulo = 'Favoritos';
    const viajesfav = await Viaje.findAll({where: { favorito: 1 }});

    res.render('favoritos', {
        pagina: titulo,
        viajes: viajesfav,
    });
};

const addFavorito = async (req, res) => {
    const { slug } = req.params;

    try {
        const viaje = await Viaje.findOne({ where: { slug } });

        if (viaje) {
            const nuevoFavorito = viaje.favorito === 1 ? 0 : 1;
            await Viaje.update({ favorito: nuevoFavorito }, { where: { slug } });
        }

        res.redirect(`/favoritos`);
    } catch (err) {
        console.log(err);
    }
};

export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimonios,
    guardarTestimonios,
    paginaDetalleViajes,
    paginaFavoritos,
    addFavorito,
}