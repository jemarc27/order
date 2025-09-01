document.addEventListener('DOMContentLoaded', () => {
    // Sample order data
    const orderData = {
        '00125': {
            items: [
                { name: 'Lomi', quantity: 2, price: 85.00 },
                { name: 'Spaghetti - Medium', quantity: 2, price: 85.00 }
            ],
            total: 645.00,
            address: 'Lumbang na Calzada',
            phone: '09123456789'
        },
        '00443': {
            items: [
                { name: 'Lomi', quantity: 1, price: 90.00 },
                { name: 'Siomai', quantity: 1, price: 50.00 }
            ],
            total: 140.00,
            address: 'Pasig, Mandaluyong',
            phone: '09234567890'
        }
    };

    // Modal elements
    const modal = document.getElementById('order-modal');
    const modalDetails = document.getElementById('modal-order-details');
    const closeBtn = document.querySelector('.close-btn');

    // Open modal with order details
    document.querySelectorAll('.view-orders').forEach(btn => {
        btn.addEventListener('click', function() {
            const row = btn.closest('tr');
            const orderId = row.getAttribute('data-order-id');
            const order = orderData[orderId];
            if (!order) return;

            // Build items table
            let itemsHtml = `<div class="order-items">
                <table>
                    <tbody>
                        ${order.items.map(item => `
                            <tr>
                                <td>${item.quantity}</td>
                                <td>${item.name}</td>
                                <td style="text-align:right;">₱${item.price.toFixed(2)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>`;

            // Build total
            let totalHtml = `<div class="order-total">
                <table style="width:100%;">
                    <tr>
                        <td>Total</td>
                        <td style="text-align:right;">₱${order.total.toFixed(2)}</td>
                    </tr>
                </table>
            </div>`;

            // Build address and phone
            let infoHtml = `<div class="order-info">
                <div>
                    <label>Address</label>
                    <span>${order.address}</span>
                </div>
                <div>
                    <label>Phone Number</label>
                    <span>${order.phone}</span>
                </div>
            </div>`;

            modalDetails.innerHTML = itemsHtml + totalHtml + infoHtml;
            modal.style.display = 'flex';
        });
    });

    // Close modal
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
    // Optional: close modal when clicking outside content
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.style.display = 'none';
    });

    // Search functionality
    const searchInput = document.getElementById('search');
    const tableRows = document.querySelectorAll('#orders-table tbody tr');
    searchInput.addEventListener('keyup', (event) => {
        const searchTerm = event.target.value.toLowerCase();
        tableRows.forEach(row => {
            const orderId = row.querySelector('td:nth-child(1)').textContent.toLowerCase();
            const customerName = row.querySelector('td:nth-child(3)').textContent.toLowerCase();
            if (orderId.includes(searchTerm) || customerName.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });

    // Filter orders by type
    const orderTypeSelect = document.getElementById('order-type');
    const ordersTbody = document.getElementById('orders-tbody');
    orderTypeSelect.addEventListener('change', function() {
        const selectedType = orderTypeSelect.value;
        Array.from(ordersTbody.querySelectorAll('tr')).forEach(row => {
            if (row.getAttribute('data-type') === selectedType) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    });
    // Show all on page load
    orderTypeSelect.dispatchEvent(new Event('change'));

    // Show/hide tables based on order type selection
    const onlineTable = document.getElementById('online-table-container');
    const walkinTable = document.getElementById('walkin-table-container');
    orderTypeSelect.addEventListener('change', function() {
        if (orderTypeSelect.value === 'online') {
            onlineTable.style.display = '';
            walkinTable.style.display = 'none';
        } else if (orderTypeSelect.value === 'walkin') {
            onlineTable.style.display = 'none';
            walkinTable.style.display = '';
        } else {
            onlineTable.style.display = '';
            walkinTable.style.display = '';
        }
    });
    // Set initial view
    if (orderTypeSelect.value === 'online') {
        onlineTable.style.display = '';
        walkinTable.style.display = 'none';
    } else if (orderTypeSelect.value === 'walkin') {
        onlineTable.style.display = 'none';
        walkinTable.style.display = '';
    } else {
        onlineTable.style.display = '';
        walkinTable.style.display = '';
    }
});