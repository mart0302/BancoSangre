<?php
require_once('tcpdf/tcpdf.php');

// Get invoice data (in a real app, this would come from your database)
$folio = isset($_GET['folio']) ? $_GET['folio'] : 'FAC-00001';

// Create new PDF document
$pdf = new TCPDF(PDF_PAGE_ORIENTATION, PDF_UNIT, PDF_PAGE_FORMAT, true, 'UTF-8', false);

// Set document information
$pdf->SetCreator('HEMOCENTRO DE PUEBLA');
$pdf->SetAuthor('HEMOCENTRO DE PUEBLA');
$pdf->SetTitle('Factura ' . $folio);
$pdf->SetSubject('Factura de Servicios');
$pdf->SetKeywords('Factura, HEMOCENTRO, Puebla');

// Set margins
$pdf->SetMargins(15, 15, 15);
$pdf->SetHeaderMargin(5);
$pdf->SetFooterMargin(10);

// Add a page
$pdf->AddPage();

// Content
$html = '
<h1 style="text-align:center;color:#e63946;">HEMOCENTRO DE PUEBLA</h1>
<h2 style="text-align:center;">Factura</h2>
<h3 style="text-align:center;">Folio: ' . htmlspecialchars($folio) . '</h3>

<table border="1" cellpadding="4">
    <tr>
        <th width="30%">Fecha</th>
        <td width="70%">' . date('d/m/Y') . '</td>
    </tr>
    <tr>
        <th>Cliente</th>
        <td>Cliente Ejemplo</td>
    </tr>
    <tr>
        <th>RFC</th>
        <td>XAXX010101000</td>
    </tr>
</table>

<h4>Conceptos</h4>
<table border="1" cellpadding="4">
    <tr>
        <th width="10%">Cantidad</th>
        <th width="50%">Descripción</th>
        <th width="20%">P. Unitario</th>
        <th width="20%">Importe</th>
    </tr>
    <tr>
        <td>1</td>
        <td>Donación de sangre</td>
        <td>$0.00</td>
        <td>$0.00</td>
    </tr>
    <tr>
        <td>1</td>
        <td>Procesamiento de muestra</td>
        <td>$350.00</td>
        <td>$350.00</td>
    </tr>
    <tr>
        <td colspan="3" style="text-align:right;"><strong>Subtotal:</strong></td>
        <td>$350.00</td>
    </tr>
    <tr>
        <td colspan="3" style="text-align:right;"><strong>IVA (16%):</strong></td>
        <td>$56.00</td>
    </tr>
    <tr>
        <td colspan="3" style="text-align:right;"><strong>Total:</strong></td>
        <td>$406.00</td>
    </tr>
</table>

<p style="text-align:center;font-size:0.8em;">Este documento es una representación impresa de un CFDI</p>
';

// Print content
$pdf->writeHTML($html, true, false, true, false, '');

// Close and output PDF
$pdf->Output('factura_' . $folio . '.pdf', 'D');
?>