import express, {json} from 'express';
import {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimonios,
    guardarTestimonios,
    paginaDetalleViajes,
    paginaFavoritos,
    addFavorito
} from "../controllers/paginaController.js";

const router = express.Router();

router.get("/", paginaInicio);
router.get("/nosotros", paginaNosotros);
router.get("/viajes", paginaViajes);
router.get("/testimonios", paginaTestimonios);
router.post("/testimonios", guardarTestimonios);
router.get("/viajes/:slug", paginaDetalleViajes);
router.get("/favoritos", paginaFavoritos);
router.post("/favoritos/:slug", addFavorito);

router.get("/viajes/:slug", async (req, res) => {
    try {
        const { slug } = req.params;
        const viaje = await Viaje.findOne({ where: { slug } });

        if (!viaje) {
            return res.redirect("/viajes");
        }

        res.render("viaje", {
            titulo: viaje.titulo,
            resultado: viaje
        });
    } catch (error) {
        console.log(error);
    }
});

export default router;