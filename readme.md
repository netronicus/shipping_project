# Proyecto

Con este proyecto se podrán generar rutas de entrega entre dos puntos, también es posible actualizar la posición del evío para poder calcular el tiempo de entrega.

## Comenzando

Para iniciar, es necesario realizar una copia de este proyecto

### Pre Requisitos

Para poder ejecutar este proyecto es necesario que cuentes con nodeJS instalado en su versión 12, puedes seguir las instrucciones en el siguiente enlace https://nodejs.org/es/download/

## Dependencias

Una vez descargado el proyecto, podrás instalar las dependencias ejecutando
```
npm install
```

## Despliegue

Para realizar el despliegue de la aplicación, deberás generar un archivo .env en la raíz del proyecto, el archivo deberá tener la siguiente estructura:

```
DB_HOST=localhost
DB_NAME=test
DB_USER=root
DB_PASS=root
```

Estas credenciales se utilizarán en todo el proyecto, si no se agregan, este no funcionará.

Para desplegarlo en modo desarrollo ejecuta lo siguiente
```
npm run start:dev
```

Para su despliegue en modo producción ejecuta lo siguiente

```
npm run start
```

# Puntos de acceso

## GET: /

Front-end, este permite agregar rutas de envío mediante Interfaz de usuario

## POST: /shipping

Permite agregar rutas nuevas, requiere la siguiente estructura en su body
```
{
    "customer": "Raúl Armenta Urrutia1",
    "descrip": "Un producto enviado de prueba",
    "status": "En proceso",
    "origin_lat": 29.118576135039827,
    "origin_long": -110.9728069676837,
    "current_lat": 29.12818127694525,
    "current_long": -110.98265471108952,
    "end_lat": 30.716104958343806,
    "end_long": -112.1532644359991
}
```

## GET: /shipping

Retorna un listado de todas las rutas de entrega almacenadas en base de datos

## GET: /shipping/:id

Retorna la información de una ruta de entrega especificando su ID

## PUT: /shipping/:id

Permite actualizar las coordenadas de la entrega, requiere el siguiente body
```
{
    "id": 1,
    "current_lat": 29.12818127694525,
    "current_long": -110.98265471108952,
}
```