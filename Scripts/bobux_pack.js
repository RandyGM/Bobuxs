const packages = [
    {
        imgSrc: "../Img/Icon.png",
        title: "Bobux 1000 Tickets",
        robux: 100,
        price: 1000
    },
    {
        imgSrc: "../Img/Icon.png",
        title: "Bobux 4000 Tickets",
        robux: 500,
        price: 4000
    },
    {
        imgSrc: "../Img/Icon.png",
        title: "Bobux 8000 Tickets",
        robux: 1000,
        price: 8000
    },
    {
        imgSrc: "../Img/Icon.png",
        title: "Bobux 8400 Tickets",
        robux: 1500,
        price: 8400
    },
    {
        imgSrc: "../Img/Icon.png",
        title: "Bobux 9000 Tickets",
        robux: 2000,
        price: 9000
    }
];

// Función para generar los paquetes
function generatePackages() {
    const container = document.getElementById('packages-container');

    packages.forEach(pkg => {
        const packageDiv = document.createElement('div');
        packageDiv.className = 'package';

        packageDiv.innerHTML = `
            <img src="${pkg.imgSrc}" alt="${pkg.title}" class="img-tier">
            <h2>${pkg.title}</h2>
            <p><span> - ${pkg.robux} Get Bobux -</span></p>
            <p>Price ${pkg.price} Tickets</p>
            <a href="#" class="btn" data-price="${pkg.price}" data-robux="${pkg.robux}">Buy Bobux</a>
        `;

        container.appendChild(packageDiv);
    });

    // Añadir el evento click a los botones de compra
    const buyButtons = document.querySelectorAll('.btn');
    buyButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const price = parseInt(this.getAttribute('data-price'));
            const robux = this.getAttribute('data-robux');
            const confirmPurchase = confirm(`Are you sure you want to spend ${price} tickets to buy ${robux} Bobux?`);

            if (confirmPurchase) {
                handlePurchase(price, robux);
            } else {
                alert('Purchase canceled.');
            }
        });
    });
}

// Función para manejar la compra de paquetes
function handlePurchase(price, robux) {
    // Actualiza los tickets del usuario aquí
    // ...

    // Mostrar el mensaje de confirmación
    const confirmationDiv = document.getElementById('purchase-confirmation');
    const bobuxAmountSpan = document.getElementById('bobux-amount');
    const ticketCostSpan = document.getElementById('ticket-cost');

    bobuxAmountSpan.textContent = robux;
    ticketCostSpan.textContent = price;

    confirmationDiv.style.display = 'block';

    const closeButton = document.getElementById('close-confirmation');
    closeButton.addEventListener('click', function() {
        confirmationDiv.style.display = 'none';
    });
}

// Llamada a la función para generar los paquetes al cargar la página
window.onload = generatePackages;
