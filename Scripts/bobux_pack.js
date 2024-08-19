//bobux_pack.js
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

// Función para mostrar un cuadro de diálogo personalizado
function showCustomConfirm(message, onConfirm) {
    const confirmOverlay = document.createElement('div');
    confirmOverlay.style.position = 'fixed';
    confirmOverlay.style.top = '0';
    confirmOverlay.style.left = '0';
    confirmOverlay.style.width = '100%';
    confirmOverlay.style.height = '100%';
    confirmOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.75)';
    confirmOverlay.style.display = 'flex';
    confirmOverlay.style.alignItems = 'center';
    confirmOverlay.style.justifyContent = 'center';
    confirmOverlay.style.zIndex = '1000';

    const confirmBox = document.createElement('div');
    confirmBox.style.backgroundColor = 'var(--color2)';
    confirmBox.style.padding = '20px';
    confirmBox.style.borderRadius = '10px';
    confirmBox.style.textAlign = 'center';
    confirmBox.style.border = '2px solid var(--color5)';

    const messageElem = document.createElement('p');
    messageElem.textContent = message;
    messageElem.style.color = 'var(--color4)';
    confirmBox.appendChild(messageElem);

    const yesButton = document.createElement('button');
    yesButton.textContent = 'Yes';
    yesButton.className = 'btn';
    yesButton.style.margin = '10px';
    yesButton.addEventListener('click', () => {
        document.body.removeChild(confirmOverlay);
        onConfirm(true);
    });
    confirmBox.appendChild(yesButton);

    const noButton = document.createElement('button');
    noButton.textContent = 'No';
    noButton.className = 'btn';
    noButton.style.margin = '10px';
    noButton.addEventListener('click', () => {
        document.body.removeChild(confirmOverlay);
        onConfirm(false);
    });
    confirmBox.appendChild(noButton);

    confirmOverlay.appendChild(confirmBox);
    document.body.appendChild(confirmOverlay);
}

// Función para generar los paquetes
function generatePackages() {
    const container = document.getElementById('packages-container');

    packages.forEach(pkg => {
        const packageDiv = document.createElement('div');
        packageDiv.className = 'package card-bobux';

        packageDiv.innerHTML = `
            <img src="${pkg.imgSrc}" alt="${pkg.title}" class="img-tier">
            <h2>${pkg.title}</h2>
            <p><span> - ${pkg.robux} Get Bobux -</span></p>
            <p>Price ${pkg.price} Tickets</p>
            <a href="#" class="btn" data-price="${pkg.price}">Buy Bobux</a>
        `;

        container.appendChild(packageDiv);
    });

    // Añadir el evento click a los botones de compra
    const buyButtons = document.querySelectorAll('.btn');
    buyButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const price = parseInt(this.getAttribute('data-price'));

            // Reemplazamos confirm() con showCustomConfirm()
            showCustomConfirm(`Are you sure you want to spend ${price} tickets to buy this package?`, function(confirmPurchase) {
                if (confirmPurchase) {
                    handlePurchase(price);
                } else {
                    alert('Purchase canceled.');
                }
            });
        });
    });
}

// Función para manejar la compra de paquetes
function handlePurchase(price) {
    const ticketCountElement = document.getElementById('ticket-count');
    let ticketCount = parseInt(localStorage.getItem('ticketCount')) || 0;

    if (ticketCount >= price) {
        // Reducir el conteo de tickets
        ticketCount -= price;
        ticketCountElement.textContent = ticketCount;
        localStorage.setItem('ticketCount', ticketCount);

        // Guardar los tickets actualizados en la base de datos
        saveTicketsToDatabase(ticketCount);

        alert('Purchase successful!');
    } else {
        alert('Not enough tickets to complete the purchase.');
    }
}

// Función para guardar los tickets en la base de datos
async function saveTicketsToDatabase(ticketCount) {
    const username = localStorage.getItem('username');
    try {
        await fetch('http://localhost:3000/api/updateTickets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: username, tickets: ticketCount })
        });
    } catch (error) {
        console.error('Error al guardar los tickets en la base de datos:', error);
    }
}

// Llamar a la función para generar los paquetes cuando se cargue la página
document.addEventListener('DOMContentLoaded', generatePackages);

