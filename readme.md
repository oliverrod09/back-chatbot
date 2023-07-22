# Backend del Chatbot para Guía de ISOS en Pequeñas Empresas

Este repositorio contiene el backend de un proyecto de chatbot desarrollado en Express.js y conectado a MongoDB Atlas. El chatbot está diseñado para guiar y ayudar a pequeñas empresas en la implementación y comprensión de las normas ISO (International Organization for Standardization).

## Descripción del Proyecto

El backend del chatbot actúa como el motor principal, procesando las consultas y generando respuestas relevantes basadas en las normas ISO seleccionadas. Está construido en Express.js, lo que permite una comunicación eficiente con el frontend y la base de datos en MongoDB Atlas. 

## Configuración

Para ejecutar el backend de manera local o en un servidor, se deben configurar las variables de entorno en un archivo `.env` en el directorio raíz del proyecto. Asegúrate de incluir la siguiente configuración en tu archivo `.env`:

PORT=3000
LOCALKEY="CREA_UNA_LLAVE"
urlMongo="TU_URL_DE_MONGODB_ATLAS"
apiKey='TU_API_KEY_DE_OPENAI'
urlApi='https://api.openai.com/v1/chat/completions'


Reemplaza `TU_URL_DE_MONGODB_ATLAS`, `TU_API_KEY_DE_OPENAI` y `TU_API_KEY_DE_OPENAI` con tus credenciales y datos de configuración. Ten en cuenta que estos valores sensibles no deben ser compartidos públicamente y se deben mantener en privado.

## Instalación y Uso

1. Asegúrate de tener instalado [Node.js](https://nodejs.org) en tu sistema.
2. Clona este repositorio en tu máquina local utilizando el siguiente comando:
 git clone https://github.com/oliverrod09/back-chatbot.git

Ve a la carpeta del proyecto: cd back-chatbot

Instala las dependencias del proyecto: npm install

Inicia el servidor del backend: node app

El servidor del backend estará en funcionamiento y listo para recibir solicitudes del frontend del chatbot.

Contacto
Si tienes alguna pregunta o sugerencia sobre el proyecto, no dudes en contactarnos. Puedes encontrarnos en nuestra página de contacto https://oliverrod.website/.

