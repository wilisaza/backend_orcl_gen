# Backend Genérico para BD Oracle

Utilidad para ejecución de consultas y sentencias de inserción, edición y eliminación en BD Oracle

## Preparación inicial:

- Url de acceso al servicio
- Puerto de conexión
- Datos de conexión de la BD
    El servicio requiere las siguientes variables de Header para conectarse al servicio de BD específico:
    - "dbUser": Usuario de base de datos
    - "dbPassword": Contraseña del usuario
    - "dbHost": Dirección IP o URL donde se ubica el recurso de BD
    - "dbSid": SID o nombre específico de la base de datos


## Métodos:

**GET**

Mediante el método GET es posible realizar las siguientes acciones:

- Consultar todos los elementos de un objeto:
    - Endpoint: [miUrl:miPuerto/objeto]()
    - Retorno: Objeto "outdata" con array de elementos/objetos de retorno

- Consultar elementos de un objeto con filtro:
    - Endpoint: [miUrl:miPuerto/objeto?campo1=valor1&campoN=valorN]()
    - Retorno: Objeto "outdata" con array de elementos/objetos de retorno

- Conteo de elementos de un objeto:
    - Endpoint: [miUrl:miPuerto/count/objeto]()
    - Retorno: Objeto "outdata" con array de objeto y conteo en elemento "cant"

- Conteo de elementos de un objeto con filtro:
    - Endpoint: [miUrl:miPuerto/count/objeto?campo1=valor1&campoN=valorN]()
    - Retorno: Objeto "outdata" con array de objeto y conteo en elemento "cant"

- Máximo valor de un elemento de un objeto:
    - Endpoint: [miUrl:miPuerto/max/objeto/campo]()
    - Retorno: Objeto "outdata" con array de objeto y máximo en elemento "max_value"

- Máximo valor de un elemento de un objeto con filtro:
    - Endpoint: [miUrl:miPuerto/max/objeto/campo?campo1=valor1&campoN=valorN]()
    - Retorno: Objeto "outdata" con array de objeto y máximo en elemento "max_value"

- Obtener el valor de retorno de la ejecución de una función
    - Endpoint: [miUrl:miPuerto/function/nom_funcion?campo1=valor1&campoN=valorN]()
    - Retorno: Objeto "outdata" con array de objeto y máximo en elemento "result"


**POST**

Mediante el método POST es posible realizar las siguientes acciones:

- Consultar todos los elementos de un objeto personalizado:
    - Endpoint: [miUrl:miPuerto/custom/objeto]()
    - Body: Objeto JSON con especificación de campos y valor vacío
    - Retorno: Objeto "outdata" con array de elementos/objetos de retorno

- Consultar elementos de un objeto personalizado con filtro:
    - Endpoint: [miUrl:miPuerto/custom/objeto?campo1=valor1&campoN=valorN]()
    - Body: Objeto JSON con especificación de campos y valor vacío
    - Retorno: Objeto "outdata" con array de elementos/objetos de retorno

- Insertar un elemento a un objeto:
    - Endpoint: [miUrl:miPuerto/objeto]()
    - Body: Objeto JSON con especificación de campos y valores
    - Retorno: Objeto "outdata" con array de elemento/objeto insertado