[![Status][statuss-shield]][statuss-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]

<!-- PROJECT LOGO -->
<div align="center">
  <a href="https://github.com/hmfarias/backend-ecommerce">
    <img src="https://github.com/hmfarias/backend-ecommerce/blob/main/src/public/logo.png" alt="Logo" width="350" height="auto">
  </a>
  <h1 align="center">BACKEND</h1>

  <p align="center">
    Polirubro online
    <br />
    <a href="" target="_blank" ><strong>»</strong></a>
    <br />
    <br />
    <a href="https://github.com/hmfarias/backend-ecommerce">Ver repositorio</a>
    ·
    <a href="https://github.com/hmfarias/backend-ecommerce/issues">Reportar un error</a>
    ·
    <a href="https://github.com/hmfarias/backend-ecommerce/issues">Solicitar función</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->

<a name="top"></a>

### Tabla de contenidos

1. [Introducción](#introduccion)
2. [Construido con](#consturido)
3. [Consideraciones Importantes](#consideraciones)
   - [WEBSOCKET - DESAFÍO ENTREGABLE - PROCESO DE TESTING](#websocket)
     - [PROBANDO EL DEPLOY EN GLITCH](#glitch)
     - [EN LOCAL](#local)
   - [Comentarios en el código](#comentarios)
4. [Esquema de la App](#esquema)
5. [Instalación en local](#instalacion)
6. [Contribuyendo](#contribuyendo)
7. [Licencia](#licencia)
8. [Contacto](#contacto)

<hr>

<!-- ABOUT THE PROJECT -->

<a name="introduccion"></a>

## INTRODUCCION

Bienvenidos al backend de Notre Dame, tu tienda polirubro online exclusiva. Este repositorio contiene la infraestructura y lógica de negocio que impulsa nuestra plataforma, garantizando una experiencia de compra eficiente, segura y confiable.

Nuestro backend ha sido diseñado para gestionar productos, carritos de compra, pedidos y usuarios, asegurando un flujo de datos ágil y seguro. Implementamos las mejores prácticas en desarrollo, seguridad y escalabilidad para ofrecer un servicio robusto y optimizado.

Gracias por visitar nuestro repositorio. ¡Esperamos que disfrutes explorando y contribuyendo a este proyecto!

[Volver al menú](#top)

<hr>

<a name="consturido"></a>

### CONSTRUIDO CON

![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) como framework de código abierto para crear aplicaciones web y APIs. Está escrito en JavaScript y se ejecuta en el entorno de Node.js

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) como lenguaje de programación interpretado, de alto nivel y dinámico. Se ejecuta en el navegador del cliente, lo que permite la creación de páginas web interactivas y dinámicas.

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) (HyperText Markup Language) como lenguaje de marcación de hipertéxto estándar utilizado para crear y diseñar páginas web.

![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) (Cascading Style Sheets, Level 3) como lenguaje de diseño gráfico utilizado para controlar el aspecto visual de las páginas web, separando el contenido (HTML) de la presentación visual (CSS).

![Static Badge](https://img.shields.io/badge/Sweer%20Alert-green?style=for-the-badge) como biblioteca de JavaScript que facilita la creación de alertas y diálogos personalizados y estéticamente agradables en la aplicacion web.

[Volver al menú](#top)

<hr>

<a name="consideraciones"></a>

## CONSIDERACIONES IMPORTATES

En el estado actual, los datos se manejan en archivo JSON y se accede a ellos mediante la clase FileManagerJson. Esta clase recibe en su constructor el path del archivo json con el que se desea trabajar y posee dos metodos: getData() y saveData(), para obtener y grabar los datos en el archivo Json respectivamente.

[Volver al menú](#top)

<a name="websocket"></a>

### WEBSOCKET - DESAFÍO ENTREGABLE - PROCESO DE TESTING

Se ha configurado el servidor para integrar el motor de plantillas Handlebars e instalar un servidor de socket.io al mismo.

Se ha creado una vista “home.handlebars” la cual contiene la lista de todos los productos agregados hasta el momento.

Además, se ha creado la vista “realTimeProducts.handlebars”, a la cual se accede en el endpoint “/realtimeproducts”. Esta vista contiene la misma lista de productos, pero trabaja con websockets.
Cada vez que se agrega o elimina un producto usando los endpoints creados para tal efecto, la lista se actualiza automáticamente.

Tambien se ha creado una vista “addProducts.handlebars”, a la cual se accede en el endpoint “/addproducts”. Esta vista contiene un formulario para agregar nuevos productos, el cual se envia a la ruta “/api/products” para ser almacenado en la base de datos (archivo JSON) y actualizada en tiempo real.

La conexión de socket emits con HTTP se realiza dentro de la petición POST y DELETE.

<a name="glitch"></a>

### PROBANDO EL DEPLOY EN GLITCH

### Paso 1: Ruta raíz

1. Abra la ruta raíz del servidor en su navegador. (https://western-furtive-cream.glitch.me/)
2. Deberá visualizarse el contenido de la vista `home.handlebars`.
3. En este punto, podrá apreciar el listado de todos los productos cargados hasta el momento **web socket no se encuentra activo aqui**. Al hacer clic en el botón "View Real-Time Products", se accede a la vista "realTimeProducts.handlebars" donde se visualizan los productos en tiempo real.

### Paso 2: Acceso a la ruta `/realtimeproducts`. (https://western-furtive-cream.glitch.me/realtimeproducts)

1. Haga click en el boton "View Real-Time Products" para acceder a la vista "realTimeProducts.handlebars", o bien acceda a la ruta `/realtimeproducts` en la barra de direcciones del navegador.

2. Corrobore que el servidor haya conectado correctamente con el cliente:
   - En la consola del servidor, deberá mostrarse un mensaje que diga: **"New client connected"**.

### Paso 3: Visualización de la lista de productos (ABRA DOS NAVEGADORES PARA PODER VER LA LISTA DE PRODUCTOS EN TIEMPO REAL)

1. En la vista `/realtimeproducts`, podrá apreciar la lista de productos similar a la anterior, pero aquí se encuentra activo web socket.
2. Haga click en el boton "Add more products" para acceder a la vista "addProducts.handlebars", o bien acceda a la ruta `/addproducts` en la barra de direcciones del navegador. Desde aquí se puede agregar nuevos productos. Al hacer clic en el botón "Add Product", se envia el formulario a la ruta `/api/products` donde se almacena en la base de datos (archivo JSON) y actualizada en tiempo real. Es conveniente tener abiertos dos navegadores, uno para ver la lista de productos en tiempo real y otro para agregar productos.
3. A la derecha de cada producto, se encuentra un botón "Delete" que se puede utilizar para eliminar el producto seleccionado. Al hacer clic en el botón, se envia una solicitud DELETE a la ruta `/api/products/:id` donde se elimina el producto de la base de datos (archivo JSON) y actualizada en tiempo real.

OTRA ALTERNATIVA: En el direcotrio raiz del proyecto, podrá encontrar el archivo "Ecommerce Backend.postman_collection.json", el cual provee la coleccion Postman necesaria para probar todos los endpoints de la aplicacion y en especial el POST Y DELETE DE PRODUCTOS, que son los que activan el io.emit para cada caso.

1. Abra Postman e importe la colección. Ejecute el request "Get All Product in DEPLOY" para comprobar que el servidor se encuentre funcionando bien. Debería devoverle los 7 productos cargados hasta el momento.
2. Abra el request "Post a new product in DEPLOY" (ya se encuentra creado el objeto necesario para dar de alta un nuevo producto". Ejecute el request. Esto activa el "io.emit" correspondiente.
3. Podra verificar en el navegador, la incorporación del producto en la lista de productos.
4. Abra el request "Delete a product in DEPLOY" (ya se encutra precargado el id 7 en la ruta aunque puede cambiarlo a cualquier id). Ejecute el request. Esto activa el "io.emit" correspondiente.
5. Podra verificar en el navegador, la eliminación del producto en la lista de productos.

[Volver al menú](#top)

<hr>

<a name="local"></a>

### EN LOCAL

### Paso 1: Instalación y ejecución del servidor

(ver [Instalación en local](#instalacion))

### Paso 2: Ruta raíz

1. Abra la ruta raíz del servidor en su navegador. (http://localhost:8080)
2. Deberá visualizarse el contenido de la vista `home.handlebars`.
3. En este punto, podrá apreciar el listado de todos los productos cargados hasta el momento **web socket no se encuentra activo aqui**. Al hacer clic en el botón "View Real-Time Products", se accede a la vista "realTimeProducts.handlebars" donde se visualizan los productos en tiempo real.

### Paso 3: Acceso a la ruta `/realtimeproducts`. (http://localhost:8080/realtimeproducts)

1. Haga click en el boton "View Real-Time Products" para acceder a la vista "realTimeProducts.handlebars", o bien acceda a la ruta `/realtimeproducts` en la barra de direcciones del navegador.

2. Corrobore que el servidor haya conectado correctamente con el cliente:
   - En la consola del servidor, deberá mostrarse un mensaje que diga: **"New client connected"**.

### Paso 3: Visualización de la lista de productos (ABRA DOS NAVEGADORES PARA PODER VER LA LISTA DE PRODUCTOS EN TIEMPO REAL)

1. En la vista `/realtimeproducts`, podrá apreciar la lista de productos similar a la anterior, pero aquí se encuentra activo web socket.
2. Haga click en el boton "Add more products" para acceder a la vista "addProducts.handlebars", o bien acceda a la ruta `/addproducts` en la barra de direcciones del navegador. Desde aquí se puede agregar nuevos productos. Al hacer clic en el botón "Add Product", se envia el formulario a la ruta `/api/products` donde se almacena en la base de datos (archivo JSON) y actualizada en tiempo real. Es conveniente tener abiertos dos navegadores, uno para ver la lista de productos en tiempo real y otro para agregar productos.
3. A la derecha de cada producto, se encuentra un botón "Delete" que se puede utilizar para eliminar el producto seleccionado. Al hacer clic en el botón, se envia una solicitud DELETE a la ruta `/api/products/:id` donde se elimina el producto de la base de datos (archivo JSON) y actualizada en tiempo real.

OTRA ALTERNATIVA: En el direcotrio raiz del proyecto, podrá encontrar el archivo "Ecommerce Backend.postman_collection.json", el cual provee la coleccion Postman necesaria para probar todos los endpoints de la aplicacion y en especial el POST Y DELETE DE PRODUCTOS, que son los que activan el io.emit para cada caso.

1. Abra Postman e importe la colección. Ejecute el request "Get All Product in DEPLOY" para comprobar que el servidor se encuentre funcionando bien. Debería devoverle los 7 productos cargados hasta el momento.
2. Abra el request "Post a new product in DEPLOY" (ya se encuentra creado el objeto necesario para dar de alta un nuevo producto". Ejecute el request. Esto activa el "io.emit" correspondiente.
3. Podra verificar en el navegador, la incorporación del producto en la lista de productos.
4. Abra el request "Delete a product in DEPLOY" (ya se encutra precargado el id 7 en la ruta aunque puede cambiarlo a cualquier id). Ejecute el request. Esto activa el "io.emit" correspondiente.
5. Podra verificar en el navegador, la eliminación del producto en la lista de productos.

[Volver al menú](#top)

<hr>

<a name="comentarios"></a>

### COMENTARIOS EN EL CÓDIGO

Tratándose de una aplicación de índole DIDACTICO, se han dejado en el código comentarios útiles para su estudio. Pero se destaca que en un proyecto real, los mismos deben ser utilizados lo menos posible.

[Volver al menú](#top)

<hr>

<a name="esquema"></a>

## ESQUEMA DE LA APP

<div align="center">
  <a href="">
    <img src="" alt="Logo" width="900" height="auto">
  </a>
</div>

[Volver al menú](#top)

<hr>

<a name="instalacion"></a>

## INSTALACIÓN EN LOCAL

Prerequisitos de instalación:
Debes contar con un editor de código como Visual Estudio Code o similar.

1- En tu árbol de directorios sitúate en la carpeta donde deseas instalar la app.

2- Clona el repositorio escribiendo en la terminal o consola de tu pc el siguiente código:
<code>
git clone https://github.com/hmfarias/backend-ecommerce.git
</code>

Esto creará la carpeta "backend-ecommerce" y en su interior los archivos de aplicación.

3- Ejecuta tu editor de código y sitúate dentro de la carpeta backend-ecommerce. Podrás ver el código de la aplicación.

4- Abre una terminal y asegurate de estar ubicado dentro de la carpeta backend-ecommerce

5- Ejecuta:
<code>
npm install
</code>

Esto instalará la aplicación de manera local.

6- Ejecuta:
<code>
npm run dev
</code>

Esto iniciará la aplicación en modo desarrrollador, y mostrará un mensaje en la terminal indicando que el servidor está corriendo en el puerto 8080.

En la carpeta raiz encontrarás el archivo "postman_collection.json" el cual contiene la coleccion postman para probar todos los endpoints. Bastará con importar la coleccion desde Postman, para que se cree una coleccion que contendra dos subcarpetas: "Products" con las llamadas a los endpoints de productos y "Carts" con las llamadas a los endpoints de Carritos de compra.

[Volver al menú](#top)

<hr>

<a name="contribuyendo"></a>

## CONTRIBUYENDO

Las contribuciones son lo que hace que la comunidad de código abierto sea un lugar increíble para aprender, inspirar y crear. Cualquier contribución que haga es **muy apreciada**.

Si tiene una sugerencia para mejorar este proyecto, por favor haga un "fork" al repositorio y cree un "pull request". También puede simplemente abrir un "issue" con la etiqueta "mejora".
¡No olvide darle una estrella al proyecto! ¡Gracias de nuevo!

1. Fork al Proyecto
2. Cree una nueva rama para su característica (`git checkout -b feature/newFeature`)
3. Commit para los cambios (`git commit -m 'Add some newFeature'`)
4. Push a la nueva rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

[Volver al menú](#top)

<hr>

<!-- LICENSE -->

<a name="licencia"></a>

## LICENCIA

Distribuido bajo la licencia MIT. Consulte `LICENSE.txt` para obtener más información.

[Volver al menú](#top)

<hr>

<!-- CONTACT -->

<a name="contacto"></a>

## CONTACTO

Marcelo Farias - [+54 9 3512601888] - hmfarias7@gmail.com

[Volver al menú](#top)

<hr>

<!-- ACKNOWLEDGMENTS -->

<!-- MARKDOWN LINKS & IMAGES -->

<!-- [statuss-shield]: https://img.shields.io/badge/STATUS-Developing-green -->

[statuss-shield]: https://img.shields.io/badge/STATUSS-finished-green
[statuss-url]: https://https://github.com/hmfarias/NotreDame#readme
[forks-shield]: https://img.shields.io/github/forks/hmfarias/NotreDame
[forks-url]: https://github.com/hmfarias/NotreDame/network/members
[stars-shield]: https://img.shields.io/github/stars/hmfarias/NotreDame
[stars-url]: https://github.com/hmfarias/NotreDame/stargazers
[issues-shield]: https://img.shields.io/github/issues/hmfarias/NotreDame
[issues-url]: https://github.com/hmfarias/NotreDame/issues
[license-shield]: https://img.shields.io/github/license/othneildrew/Best-README-Template.svg
[license-url]: https://github.com/hmfarias/NotreDame/blob/master/LICENSE.txt
[product-screenshot]: https://github.com/hmfarias/NotreDame/blob/main/assets/images/screenShot.webp
[product-screenshot-navbar]: https://github.com/hmfarias/NotreDame/blob/main/assets/images/navbar.webp
[others-url]: https://github.com/hmfarias/NotreDame
