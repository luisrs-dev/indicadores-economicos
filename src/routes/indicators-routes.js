import express from 'express'
const router = express.Router()
import Indicator from '../models/indicator.js'

router.get('/', async (req, res) => {
    const indicators = await Indicator.find();
    res.json({state: true, indicators : indicators, records : indicators.length})
})

// router.get('/:id', async (req, res) => {
//     const indicator = await Indicator.findById(req.params.id)
//     res.json(indicator)
// })

router.post('/', async (req, res) => {
    const {
        codigoIndicador,
        fechaIndicador,
        id,
        nombreIndicador,
        origenIndicador,
        tiempoIndicador,
        unidadMedidaIndicador,
        valorIndicador,
    
    } = req.body;

    // console.log(codigoIndicador);
    // console.log(fechaIndicador);
    // console.log(id);
    // console.log(nombreIndicador);
    // console.log(origenIndicador);
    // console.log(tiempoIndicador);
    // console.log(unidadMedidaIndicador);
    // console.log(valorIndicador);

    const indicator = new Indicator({
        id,
        codigoIndicador,
        fechaIndicador,
        nombreIndicador,
        origenIndicador,
        tiempoIndicador,
        unidadMedidaIndicador,
        valorIndicador,});
    await indicator.save();

    const indicators = await Indicator.find();

    res.json({
        status : true,
        records : indicators.length,
        msg : 'Indicator saved'});
})

// router.put('/:id', async (req, res) => {
//     const {title, description} = req.body;
//     const newTask = {title, description};
//     await  Task.findByIdAndUpdate(req.params.id, newTask);
//     res.json({status : 'Task Updated'});
// })

// router.delete('/:id', async (req, res) => {
//     await  Task.findByIdAndRemove(req.params.id);
//     res.json({status : 'Task Deleted'});
// })

export default router