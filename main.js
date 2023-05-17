// array de productos
const productos = [
    { id: 1, nombre: "lemonpie", precio: 100 },
    { id: 2, nombre: "chocotorta", precio: 200 },
    { id: 3, nombre: "brownie", precio: 500 },
    { id: 4, nombre: "cheesecake", precio: 400 },
];

let carrito = [];

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
        console.log(carrito);

        let idProducto = event.target.value;

        let producto = productos.filter(function (item) {
            return item.id == idProducto;
        });

        if (producto) {
            let elementoCarrito = JSON.parse(JSON.stringify(producto[0]));
            elementoCarrito.index = carrito.length;
            carrito.push(elementoCarrito);
            let carritoElement = document.getElementById("carrito");
            let itemCarrito = document.createElement("item-carrito");
            itemCarrito.setAttribute("id", `item-${elementoCarrito.index}`);
            itemCarrito.innerHTML = `
            <h3>ID: ${elementoCarrito.id}</h3>
            <p>Nombre: ${elementoCarrito.nombre}</p>
            <b>$${elementoCarrito.precio}</b>
            <button id="eliminar${elementoCarrito.id}" value="${elementoCarrito.index}">Eliminar del carrito</button>
            `;

            carritoElement.append(itemCarrito);

            console.log("CARRITO CON PRODUCTO AGREGADO: " + JSON.stringify(carrito));


            itemCarrito.addEventListener("click", (event) => {
                event.preventDefault();
                let index = parseInt(event.target.value);
                // borro elemento del carrito por indice
                carrito = carrito.filter(i => i.index !== index);
                console.log("CARRITO DESPUES DE BORRAR: " + JSON.stringify(carrito));
                // borro element del carrito por indice en el html
                document.getElementById(`item-${index}`).remove();
            });

        }
    });
});