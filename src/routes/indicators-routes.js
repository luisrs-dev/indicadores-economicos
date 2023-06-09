import express from 'express'
const router = express.Router()
import Indicator from '../models/indicator.js'

router.get('/', async (req, res) => {
    const indicators = await Indicator.find();
    res.json({state: true, indicators : indicators, records : indicators.length})
})

router.get('/:id', async (req, res) => {
    const indicator = await Indicator.findById(req.params.id)
    res.json(indicator)
})

router.post('/add', async (req, res) => {
    const {
        codigoIndicador,
        fechaIndicador,
        nombreIndicador,
        origenIndicador,
        tiempoIndicador,
        unidadMedidaIndicador,
        valorIndicador,
    
    } = req.body;

    const indicators = await Indicator.find();

    const indicator = new Indicator({
        id : indicators.length + 1,
        codigoIndicador,
        fechaIndicador,
        nombreIndicador,
        origenIndicador,
        tiempoIndicador,
        unidadMedidaIndicador,
        valorIndicador});
    await indicator.save();
    res.json({
        status : true,
        msg : 'Indicator saved'});

})   





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

router.put('/:id', async (req, res) => {

    const {
        codigoIndicador,
        fechaIndicador,
        nombreIndicador,
        origenIndicador,
        tiempoIndicador,
        unidadMedidaIndicador,
        valorIndicador,
    
    } = req.body;

    const newIndicator = {
        codigoIndicador,
        fechaIndicador,
        nombreIndicador,
        origenIndicador,
        tiempoIndicador,
        unidadMedidaIndicador,
        valorIndicador,
    };
    await Indicator.findByIdAndUpdate(req.params.id, newIndicator);
    res.json({status : 'Indicator Updated'});
})

router.delete('/:id', async (req, res) => {
    await  Indicator.findByIdAndRemove(req.params.id);
    res.json({status : 'Indicator Deleted'});
})

export default router