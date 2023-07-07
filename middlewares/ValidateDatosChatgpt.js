
const Validate = (req, res, next) => {
    const { empresa, cantidad_clientes, ubicacion   } = req.body;
  
    if (typeof empresa !== 'string') {
      return res.status(400).json({ status: 'El campo "empresa" debe ser un texto' });
    }else if(empresa.length == 0){
        return res.status(400).json({ status: 'no puedes enviar campo empresa vacio' });
    }else if(cantidad_clientes.length==0){
        return res.status(400).json({ status: 'no puedes enviar campo cantidad_clientes vacio' });
    }else if(ubicacion.length==0){
        return res.status(400).json({ status: 'no puedes enviar campo ubicacion vacio' });
    }
    next();
  }

  module.exports = Validate;