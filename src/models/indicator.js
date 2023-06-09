import mongoose, { SchemaType, SchemaTypes } from 'mongoose'
const { Schema } = mongoose

const IndicatorSchema = new Schema({
    id : {type : Number, required : true},
    codigoIndicador : {type : String, required : true},
    fechaIndicador : {type : Date, required : true},
    nombreIndicador : {type : String, required : true},
    origenIndicador : {type : String, required : true},
    tiempoIndicador : {type : Number, required : false},
    unidadMedidaIndicador : {type : String, required : true},
    valorIndicador : {type : SchemaTypes.Decimal128 , required : true},
})

export default mongoose.model('Indicator', IndicatorSchema)