
const Validate = (req, res, next) => {
    const { prompt, id_chat } = req.body;
  
    if (typeof prompt !== 'string') {
      return res.status(400).json({ status: 'El campo "prompt" debe ser un texto' });
    }else if(prompt.length == 0){
        return res.status(400).json({ status: 'no puedes enviar un prompt vacio' });
    }else if(id_chat.length==0){
      return res.status(400).json({ status: 'no puedes enviar un id_chat vacio' });
    }
    next();
  }

  module.exports = Validate;