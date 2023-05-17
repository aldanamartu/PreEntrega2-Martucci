// array de productos
const productos = [
    { id: 1, nombre: "lemonpie", precio: 100 },
    { id: 2, nombre: "chocotorta", precio: 200 },
    { id: 3, nombre: "brownie", precio: 500 },
    { id: 4, nombre: "cheesecake", precio: 400 },
];

let carrito = [];
let precio = 0;

// imprimo productos en el DOM
productos.forEach(item => {
    let producto = document.createElement("producto");
    producto.innerHTML = `
      <h3>ID: ${item.id}</h3>
      <p>Nombre: ${item.nombre}</p>
      <b>$${item.precio}</b>
      <button id="agregar${item.id}" value="${item.id}">Agregar a carrito</button>
    `;

    document.getElementById("productos").append(producto);

    // funcion que agrega productos al carrito
    producto.addEventListener("click", (event) => {
        event.preventDefault();

        let idProducto = event.target.value;

        let producto = productos.filter(function (item) {
            return item.id == idProducto;
        });

        if (producto) {
            let elementoCarrito = JSON.parse(JSON.stringify(producto[0]));
            elementoCarrito.index = carrito.length;
            carrito.push(elementoCarrito);
            let itemCarrito = document.createElement("item-carrito");
            itemCarrito.setAttribute("id", `item-${elementoCarrito.index}`);
            itemCarrito.innerHTML = `
            <h3>ID: ${elementoCarrito.id}</h3>
            <p>Nombre: ${elementoCarrito.nombre}</p>
            <b>$${elementoCarrito.precio}</b>
            <button id="eliminar${elementoCarrito.id}" value="${elementoCarrito.index}">Eliminar del carrito</button>
            `;

            let carritoElement = document.getElementById("carrito");
            carritoElement.append(itemCarrito);

            console.log("CARRITO CON PRODUCTO AGREGADO: " + JSON.stringify(carrito));

            precio += elementoCarrito.precio;
            document.getElementById("precio").innerHTML = precio;
            console.log("PRECIO: " + precio);

            itemCarrito.addEventListener("click", (event) => {
                event.preventDefault();
                let index = parseInt(event.target.value);

                //busco el producto a borrar
                let carritoElement = carrito.filter(function (item) {
                    return item.index == index;
                });
                let element = JSON.parse(JSON.stringify(carritoElement[0]));

                // borro elemento del carrito por indice
                carrito = carrito.filter(i => i.index !== index);
                console.log("CARRITO DESPUES DE BORRAR: " + JSON.stringify(carrito));
                // borro element del carrito por indice en el html
                document.getElementById(`item-${index}`).remove();

                // actualizo el precio del carrito
                precio -= element.precio;
                document.getElementById("precio").innerHTML = precio;
                console.log("PRECIO: " + precio);
            });

        }
    });
});