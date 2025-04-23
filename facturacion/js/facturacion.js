document.addEventListener('DOMContentLoaded', function() {
    const invoiceForm = document.getElementById('invoiceForm');
    const resultsSection = document.getElementById('resultsSection');
    const downloadPDF = document.getElementById('downloadPDF');
    const downloadXML = document.getElementById('downloadXML');
    
    // Sample invoice data
    const sampleInvoices = {
        'FAC-2023-001': {
            folio: 'FAC-2023-001',
            date: '15/03/2023',
            client: 'Juan Pérez Hernández',
            rfc: 'XAXX010101000',
            email: 'juan.perez@example.com',
            address: 'Calle Ejemplo 123, Puebla',
            items: [
                { description: 'Donación de sangre', quantity: 1, price: 0 },
                { description: 'Procesamiento de muestra', quantity: 1, price: 350 },
                { description: 'Estudios de laboratorio', quantity: 1, price: 450 }
            ],
            uuid: 'a3d8f9b2-45c1-4e6d-8f7a-1b5c3d9e7f2a',
            satCert: '30001000000300023708'
        },
        'FAC-2023-002': {
            folio: 'FAC-2023-002',
            date: '22/06/2023',
            client: 'María García López',
            rfc: 'MAGL8001015H2',
            email: 'maria.garcia@example.com',
            address: 'Av. Principal 456, Puebla',
            items: [
                { description: 'Donación de sangre', quantity: 1, price: 0 },
                { description: 'Pruebas especiales', quantity: 1, price: 600 }
            ],
            uuid: 'b5e2f8a1-9d4c-3f6e-7b2a-4c6d8f1e5a9b',
            satCert: '30001000000300023708'
        }
    };
    
    // Form submission handler
    if (invoiceForm) {
        invoiceForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const invoiceNumber = document.getElementById('invoiceNumber').value.trim();
            const rfc = document.getElementById('invoiceRFC').value.trim();
            const email = document.getElementById('invoiceEmail').value.trim();
            
            // Validate required fields
            if (!invoiceNumber || !email) {
                alert('Por favor complete los campos obligatorios');
                return;
            }
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Buscando...';
            submitBtn.disabled = true;
            
            // Simulate API call with timeout
            setTimeout(function() {
                // Check if invoice exists in sample data
                const invoice = sampleInvoices[invoiceNumber] || generateRandomInvoice(invoiceNumber, rfc, email);
                
                // Update UI with invoice data
                displayInvoice(invoice);
                
                // Show results section
                resultsSection.style.display = 'block';
                
                // Scroll to results
                resultsSection.scrollIntoView({ behavior: 'smooth' });
                
                // Reset button
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // Generate random invoice for demo purposes
    function generateRandomInvoice(folio, rfc, email) {
        const services = [
            'Donación de sangre',
            'Procesamiento de muestra',
            'Estudios de laboratorio',
            'Pruebas especiales',
            'Almacenamiento de sangre'
        ];
        
        const numItems = Math.floor(Math.random() * 3) + 1;
        const items = [];
        
        // Always include blood donation as first item (free)
        items.push({
            description: 'Donación de sangre',
            quantity: 1,
            price: 0
        });
        
        // Add additional paid services
        for (let i = 1; i < numItems; i++) {
            items.push({
                description: services[i],
                quantity: 1,
                price: Math.floor(Math.random() * 500) + 100
            });
        }
        
        // Calculate totals
        const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const iva = subtotal * 0.16;
        
        return {
            folio: folio,
            date: new Date().toLocaleDateString(),
            client: 'Cliente ' + folio,
            rfc: rfc || 'XAXX010101000',
            email: email || 'cliente@ejemplo.com',
            address: 'Dirección no especificada',
            items: items,
            subtotal: subtotal,
            iva: iva,
            total: subtotal + iva,
            uuid: generateUUID(),
            satCert: '300010000003000' + Math.floor(10000 + Math.random() * 90000)
        };
    }
    
    // Display invoice in the preview section
    function displayInvoice(invoice) {
        // Update header info
        document.getElementById('previewFolio').textContent = invoice.folio;
        document.getElementById('previewDate').textContent = invoice.date;
        document.getElementById('previewClientName').textContent = invoice.client;
        document.getElementById('previewRFC').textContent = invoice.rfc;
        document.getElementById('previewEmail').textContent = invoice.email;
        document.getElementById('previewAddress').textContent = invoice.address;
        
        // Update items table
        const itemsContainer = document.getElementById('invoiceItems');
        itemsContainer.innerHTML = '';
        
        let subtotal = 0;
        
        invoice.items.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.quantity}</td>
                <td>${item.description}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
            `;
            itemsContainer.appendChild(row);
            
            subtotal += item.price * item.quantity;
        });
        
        // Update totals
        const iva = subtotal * 0.16;
        const total = subtotal + iva;
        
        document.getElementById('subtotal').textContent = subtotal.toFixed(2);
        document.getElementById('iva').textContent = iva.toFixed(2);
        document.getElementById('total').textContent = total.toFixed(2);
        
        // Update UUID and certificate
        document.getElementById('uuid').textContent = invoice.uuid;
        document.getElementById('satCert').textContent = invoice.satCert;
    }
    
    // Generate random UUID
    function generateUUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0;
            const v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
    
    // Download PDF button handler
    if (downloadPDF) {
        downloadPDF.addEventListener('click', function() {
            const folio = document.getElementById('previewFolio').textContent;
            alert(`En una implementación real, esto descargaría el PDF de la factura ${folio}`);
            // window.location.href = `generate_pdf.php?folio=${folio}`;
        });
    }
    
    // Download XML button handler
    if (downloadXML) {
        downloadXML.addEventListener('click', function() {
            const folio = document.getElementById('previewFolio').textContent;
            alert(`En una implementación real, esto descargaría el XML del CFDI ${folio}`);
            // window.location.href = `download_xml.php?folio=${folio}`;
        });
    }
});