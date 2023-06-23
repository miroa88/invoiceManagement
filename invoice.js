document.querySelectorAll('[contenteditable="true"]').forEach(function(element) {
    element.addEventListener('click', function(event) {
      event.target.focus();
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
    column4.contentEditable = true;
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
  