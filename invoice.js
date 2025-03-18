document.querySelectorAll('[contenteditable="true"]').forEach(function(element) {
  element.addEventListener('click', function(event) {
    event.target.focus();
    event.target.textContent = ""
  });
});
  
document.getElementById('addRowButton').addEventListener('click', function() {
  const table = document.getElementById('invoiceTable');
  const newRow = document.createElement('tr');

  const column1 = document.createElement('td');
  column1.contentEditable = true;
  newRow.appendChild(column1);

  const column2 = document.createElement('td');
  column2.contentEditable = true;
  newRow.appendChild(column2);

  const column3 = document.createElement('td');
  column3.contentEditable = true;
  newRow.appendChild(column3);

  const column4 = document.createElement('td');
  newRow.appendChild(column4);

  const deleteColumn = document.createElement('td');
  deleteColumn.classList.add('delete-column');
  const deleteButton = document.createElement('button');
  deleteButton.classList.add('deleteRowButton');
  deleteButton.textContent = 'Delete';
  deleteColumn.appendChild(deleteButton);
  newRow.appendChild(deleteColumn);

  table.querySelector('tbody').appendChild(newRow);

  // Attach event listener to the delete button of the new row
  deleteButton.addEventListener('click', function() {
      const row = deleteButton.closest('tr');
      if (row.parentNode.rows.length > 1) {
          row.remove();
      } else {
          alert('Cannot delete the last row.');
      }
  });

  column2.addEventListener('input', updateRowTotal);
  column3.addEventListener('input', updateRowTotal);
  const taxElement = document.getElementById('tax');
  taxElement.addEventListener('input', updateRowTotal);

  updateRowTotal();

  function updateRowTotal() {
    const quantity = parseFloat(column2.textContent) || 0
    column3.textContent = column3.textContent.includes("$") 
    ? column3.textContent 
    : `$${(parseFloat(column3.textContent) || 0).toFixed(2)}`;

    taxElement.textContent = taxElement.textContent.includes("%") 
    ? taxElement.textContent 
    : `${(parseFloat(taxElement.textContent) || 0).toFixed(1)}%`;

    const unitPrice = parseFloat(column3.textContent.replace(/^\$/, "")) || 0;
    const total = quantity * unitPrice;
    column4.textContent = `$${total.toFixed(2)}`;  // Set the total value in the 4th column
    updateTotals();  // Recalculate the overall totals
  }

  function updateTotals() {
    let subtotal = 0;
    const rows = table.querySelectorAll('tbody tr');
    rows.forEach(row => {
      const totalCell = row.cells[3];
      const total = parseFloat(totalCell.textContent.replace('$', '')) || 0;
      subtotal += total;
    });

    const taxElement = document.getElementById('tax');
    const taxContent = parseFloat(taxElement.textContent.replace(/^\%/, ""))/100 || 0.1

    const tax = subtotal * taxContent; 
    const total = subtotal + tax;

    // Update the subtotal, tax, and total in the footer
    const subtotalCell = table.querySelector('.subtotal').nextElementSibling;
    const taxCell = table.querySelector('.tax').nextElementSibling;
    const totalCell = table.querySelector('.total').nextElementSibling;

    subtotalCell.textContent = `$${subtotal.toFixed(2)}`;
    taxCell.textContent = `$${tax.toFixed(2)}`;
    totalCell.textContent = `$${total.toFixed(2)}`;
  }

});
  
document.getElementById('convertButton').addEventListener('click', function() {
  const invoiceElement = document.querySelector('.invoice');

  const opt = {
    margin: 0,
    filename: 'invoice.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    // Prompt the user to choose the save location
    output: 'save'
  };

  html2pdf().set(opt).from(invoiceElement).save();
});

document.querySelectorAll('.deleteRowButton').forEach(function(button) {
  button.addEventListener('click', function() {
    const row = button.closest('tr');
    if (row.parentNode.rows.length > 1) {
      row.remove();
    } else {
      alert('Cannot delete the last row.');
    }
  });
});
  