
$(document).ready(function() {
    $('.selectpicker').selectpicker();
});


document.getElementById('couponForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form values
    const formData = {
      
        inputCode: document.getElementById('inputCode').value,
        validFrom: document.getElementById('validFrom').value,
        validUntil: document.getElementById('validUntil').value,
        events: Array.from(document.getElementById('events').selectedOptions).map(option => option.value).join(', '),
         discountType: document.getElementById('discountType').value,
        discount: document.getElementById('discount').value,
        quantity: document.getElementById('quantity').value,
      
    };

    // Get image files
   
    // addRow(formData, images);

    document.getElementById('couponForm').reset();
});

function previewImage(file, callback) {
    const reader = new FileReader();
    reader.onload = function(event) {
        callback(event.target.result);
    };
    reader.readAsDataURL(file);
}

function addRow(formData, images) {
    const submittedTableBody = document.getElementById('submittedTableBody');
    const row = document.createElement('tr');

    for (const [key, value] of Object.entries(formData)) {
        const cell = document.createElement('td');
        cell.textContent = value;
        row.appendChild(cell);
    }

    const imagesCell = document.createElement('td');
    row.appendChild(imagesCell);

    for (const image of Object.values(images)) {
        previewImage(image, function(imageSrc) {
            const imageElement = document.createElement('img');
            imageElement.src = imageSrc;
            imageElement.style.width = '50px';
            imageElement.style.marginRight = '5px';
            imagesCell.appendChild(imageElement);
        });
    }

    const cellActions = document.createElement('td');
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.className = 'btn btn-secondary btn-sm me-2';
    editButton.addEventListener('click', () => enableEditing(row));
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.className = 'btn btn-primary btn-sm me-2';
    saveButton.addEventListener('click', () => saveRow(row));
    saveButton.style.display = 'none'; // Hide save button initially
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'btn btn-danger btn-sm';
    deleteButton.addEventListener('click', () => deleteRow(row));
    cellActions.appendChild(editButton);
    cellActions.appendChild(saveButton);
    cellActions.appendChild(deleteButton);
    row.appendChild(cellActions);

    submittedTableBody.appendChild(row);
}

function enableEditing(row) {
    const cells = row.children;
    for (let i = 0; i < cells.length - 2; i++) { // Exclude the last two cells (Images and Actions)
        const cell = cells[i];
        const input = document.createElement('input');
        input.type = 'text';
        input.value = cell.textContent;
        input.style.width = '70%'; // Make input fields smaller
        cell.textContent = '';
        cell.appendChild(input);
    }
    const actionsCell = cells[cells.length - 1];
    actionsCell.children[0].style.display = 'none'; // Hide edit button
    actionsCell.children[1].style.display = 'inline-block'; // Show save button
}

function saveRow(row) {
    const cells = row.children;
    for (let i = 0; i < cells.length - 2; i++) { // Exclude the last two cells (Images and Actions)
        const cell = cells[i];
        const input = cell.children[0];
        cell.textContent = input.value;
    }
    const actionsCell = cells[cells.length - 1];
    actionsCell.children[0].style.display = 'inline-block'; // Show edit button
    actionsCell.children[1].style.display = 'none'; // Hide save button
}

function deleteRow(row) {
    row.remove();
}