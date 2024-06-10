# Mi Tienda de ropa

Te encuentras en la documentación de funcionamiento y control del servidor de la tienda.

## Índice

  - [Funcionamiento](#funcionamiento)
  - [Servicios](#servicios)
  - [Puesta en marcha](#puesta-en-marcha)
  - [Endpoints](#endpoints)
  - [Base de datos](#base-de-datos)
  - [Verificadores](#verificadores)
  

## Funcionamiento

El funcionamiento es el siguiente:

Una vez desplegado el servidor se dispone de una pagina principal desde la que se pueden ver todos los productos en general, así como por categoria a la que pertenecen. A su vez, se puede ver mas información de un producto en especifico usando el boton presente en el recuadro del mismo.

El adminsitrador podrá añadir nuevos productos al la base de datos desde su portal en el dashboard, donde también podrá modificar los productos o eliminarlos de la base de datos. Cuenta tambien con las funciones basicas para ver todos los productos o filtrarlos por categorias.

Los productos cuentan con las siguientes caracteristicas:
- Nombre.
- Descripción.
- Categoria. [Esta solo puede ser "camisetas", "pantalones", "zapatos", y "accesorios]
- Talla. [Estas solo pueden ser "XS", "S", "M", "L", y "XL"]
- Precio.

El nombre debe ser un string, no vacio, entre cinco y veinticinco caracteres.
La descripción debe ser un string, no vacio, entre diez y cincuenta caracteres.
La imagen se guardara como un string con la ruta/enlace.
La categoria sera un string, no vacio, limitado a los tipos previamente definidos.
La talla sera un string, no vacio, limitado a los tipos previamente definidos.
El precio debe ser un valor numerico.

La modificación de un producto se realizara a traves de un formulario que nos devolvera los valores ya definidos para poder realizar el cambio unicamente de los valores que requiramos sin tener que rellenar todos los campos nuevamente. Ningun campo puede estar vacio y devolvera errores especificos en caso de que alguna entrada no cumpla con las condiciones requeridas.

El añadir un nuevo producto se realizara a traves de un formulario en el que introduciremos los valores requeridos para el nuevo producto. Ningun campo puede estar vacio y devolvera errores especificos en caso de que alguna entrada no cumpla con las condiciones requeridas.

El borrado de un producto se realizara desde el boton especifico para ese fin dentro de la ficha de detalle del propio producto. Eso lo borrara por completo de nuestra base de datos.

## Servicios

Para el correcto funcionamiento del servidor usamos los siguientes complementos:
- dotenv: Para cargar variables de entorno desde un archivo `.env`. De este modo podemos definir los parametros que no deben quedar publicos.
- express: Para el framework del servidor en si mismo, con el control y manejo de rutas.
- express-mongo-sanitize: Para sanear las entradas en la base de datos, evitando la injección maliciosa en nuestra base de datos.
- express-validator: Para la validación y control de los inputs y consultas, implementando reglas de control.
- method-override: Para sobrescribir el control de los controles basicos de CRUD que permiten los formularios HTML, ampliando su uso a los metodos PUT y DELETE.
-moongose: Para la definición, manejo y control de la base de datos, que en este caso se trada de mongoDB.

## Puesta en marcha

Para poder iniciar los servicios de nuestra aplicación, se deberan seguir los siguientes pasos: 

- Instalar todos los modulos requeridos con `npm install`.
- Para el uso de mongoDB se debe estar registrado y haber configurado previamente el servidor para poder conectarnos a el.
- Definir la `MONGO_URI` y `PORT` dentro del archivo `.env` con la información requerida. En el primer caso nuestro enlace de conexión a la base de datos a la que queramos conectar, y en la segunda, el puerto en el que se ejecutara la aplicación.
- Finalmente iniciarl el servidor con el comando `npm start`. 

## Endpoints

Los endpoints del servidor son los siguientes: 

## Por defecto ##
- `/` - `GET` &rarr  Si no se especifica una ruta, se redirigira a `/products`. Esta es la ruta por defecto.
- `/products` - `GET` &rarr Ruta base para poder ver todos los productos de la base de datos.
- `/products/category/:category` - `GET` &rarr Ruta en la que se puede especificar la categoria de los productos que queremos poder visualizar. La categoria correspondera al parametro pasado en `:category`.
- `/products/:id` - `GET` &rarr Para poder ver la vista de detalle de un producto en base al parametro `:id`.

## Administrador ##
- `/dashboard` - `GET` &rarr Vista general para el administrador del servidor. En esta vista estará presente un medio para añadir nuevos productos a la base de datos.
- `/dashboard/category/:category` - `GET` &rarr Vista filtrada por categoria para el administrador, según el parametro `:category' .
- `/dashboard/new` - `GET` &rarr Ruta para ver el formulario para añadir un nuevo producto a la base de datos.
- `/dashboard` - `POST` &rarr Ruta para añadir un nuevo producto a la base de datos según los valores contenidos en el body.
- `/dashboard/:productId` - `GET` &rarr Vista en detalle de un producto especificado por el parametro `:productId' dentro del panel del administrador. Contendra los accesos para editar o eliminar el producto.
- `/dashboard/:productId/edit` - `GET` &rarr Ruta a la vista para poder editar los valores del producto especificado por el parametro `:productId' .
- `/dashboard/:productId` - `PUT` &rarr Ruta para guardar los cambios realizados al producto especificado por el parametro `:productId'.
- `/dashboard/:productId/delete` - `DELETE` &rarr Ruta àra eliminar el producto especificado por el parametro `:productId' de la base de datos.

## Base de datos

Hacemos uso de MongoDB, una base de datos no relacional, a la que nos conectamos desde Atlas, un servicio en la nube de la propia mongoose, que maneja el despliege y control de la base de datos.

Para poder hacer uso de la misma, debemos registrarnos y crear una base de datos donde queramos que se almacenen los valores que vamos a manejar. De este servicio es del que debemos obtener el string de valores que contenga la ruta de la base de datos y nuestra clave de acceso, para que el servidor pueda conectar con el servicio en la nube y realizar las consultas y manejo de datos que sea necesario con nuestros productos.

## Verificadores

Se implementan unos verificadores basicos tanto para el control de los datos que vamos a enviar al servidor, fuera de los requerimientros de los propios datos según la base de datos, así como las consultas enviadas al servidor, que en este caso se trata de las consultas por `:id`, `:productId`, y `:category`.

Para `:id` y `:productId` se comprueba que no este vacio y que la longitud sea la correcta para ese tipo de valor.
Para `:category` se comprueba que no este vacio y que se trate de una producta reconocida dentro de los valores de un array.

A la hora de añadir y modificar un producto se pasa el mismo modulo de comprobación, que comprueba que los valores no esten vacios, realiza un pequeño formateo para evitar la inyección de codigo malicioso, y requiere una longitud minima/maxima para algunos de los valores. Para la categoria y la talla también comprueba que los valores se encuentren dentro de los aceptados dentro de un array de valores.