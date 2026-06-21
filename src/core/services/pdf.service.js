import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { formatPDFCurrency, formatDate, numberToWords, formatTimestamp } from '../../utils/format';
import { TAX_TYPES } from '../constants/tax-types';

export const PDFService = {
  generateInvoicePDF: (invoice, profile) => {
    console.log("[DEBUG] PDF service entered");
    const doc = new jsPDF('p', 'mm', 'a4');
    console.log("[DEBUG] jsPDF instance created");
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    
    // Brand & Theme Colors
    const primaryColor = [15, 23, 42]; // Slate 900
    const accentColor = [0, 212, 170]; // Teal primary
    const textColor = [40, 40, 40];
    const mutedColor = [100, 100, 100];
    const lightBorder = [230, 230, 230];

    // --- HEADER BACKGROUND ---
    doc.setFillColor(250, 250, 250);
    doc.rect(0, 0, pageWidth, 45, 'F');
    doc.setDrawColor(...accentColor);
    doc.setLineWidth(0.5);
    doc.line(0, 45, pageWidth, 45);

    // --- HEADER ---
    doc.setFontSize(28);
    doc.setTextColor(...accentColor);
    doc.setFont('helvetica', 'bold');
    doc.text('INVOICE', pageWidth - 14, 25, { align: 'right' });

    // Business Info (Left)
    doc.setFontSize(16);
    doc.setTextColor(...primaryColor);
    doc.text(invoice.businessName || 'Business Name', 14, 22);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...mutedColor);
    
    let yPos = 28;
    if (invoice.businessAddress) {
      const addressLines = doc.splitTextToSize(invoice.businessAddress, 80);
      doc.text(addressLines, 14, yPos);
      yPos += (addressLines.length * 5);
    }
    if (invoice.businessPhone) {
      doc.text(`Phone: ${invoice.businessPhone}`, 14, yPos);
      yPos += 5;
    }
    if (profile.gstin) {
      doc.setFont('helvetica', 'bold');
      doc.text(`GSTIN:`, 14, yPos);
      doc.setFont('helvetica', 'normal');
      doc.text(profile.gstin, 28, yPos);
      yPos += 5;
    }
    if (profile.email) {
      doc.text(`Email: ${profile.email}`, 14, yPos);
    }

    // Invoice Meta (Right aligned perfectly)
    const metaXOffset = pageWidth - 14;
    doc.setFontSize(10);
    doc.setTextColor(...textColor);
    
    // Shifted slightly lower
    let metaY = 32;
    doc.setFont('helvetica', 'normal');
    doc.text(`Invoice No:`, metaXOffset - 35, metaY, { align: 'right' });
    doc.setFont('helvetica', 'bold');
    doc.text(invoice.invoiceNumber, metaXOffset, metaY, { align: 'right' });
    
    metaY += 8;
    doc.setFont('helvetica', 'normal');
    doc.text(`Invoice Date:`, metaXOffset - 35, metaY, { align: 'right' });
    doc.setFont('helvetica', 'bold');
    doc.text(formatDate(invoice.invoiceDate), metaXOffset, metaY, { align: 'right' });

    if (invoice.dueDate) {
      metaY += 8;
      doc.setFont('helvetica', 'normal');
      doc.text(`Due Date:`, metaXOffset - 35, metaY, { align: 'right' });
      doc.setFont('helvetica', 'bold');
      doc.text(formatDate(invoice.dueDate), metaXOffset, metaY, { align: 'right' });
    }

    // --- BILL TO ---
    yPos = Math.max(yPos + 10, 55);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...primaryColor);
    doc.text('Bill To:', 14, yPos);
    
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    yPos += 6;
    doc.text(invoice.customerName || 'Customer Name', 14, yPos);
    
    doc.setTextColor(...mutedColor);
    if (invoice.customerAddress) {
      yPos += 5;
      const custAddress = doc.splitTextToSize(invoice.customerAddress, 80);
      doc.text(custAddress, 14, yPos);
      yPos += (custAddress.length * 4);
    }
    if (invoice.customerPhone) {
      yPos += 2;
      doc.text(`Phone: ${invoice.customerPhone}`, 14, yPos);
      yPos += 4;
    }
    if (invoice.customerGSTIN) {
      yPos += 5;
      doc.setFont('helvetica', 'bold');
      doc.text(`GSTIN:`, 14, yPos);
      doc.setFont('helvetica', 'normal');
      doc.text(invoice.customerGSTIN, 28, yPos);
    }
    
    // Add Timestamp near invoice data
    yPos = Math.max(yPos + 10, 85);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...mutedColor);
    doc.text('Generated On:', 14, yPos);
    doc.setFont('helvetica', 'bold');
    doc.text(formatTimestamp(), 14, yPos + 5);

    // --- LINE ITEMS TABLE ---
    yPos += 12;
    
    const tableRows = invoice.lineItems.map((item, index) => [
      index + 1,
      item.description || 'Item',
      item.quantity,
      formatPDFCurrency(item.rate),
      `${item.gstRate}%`,
      formatPDFCurrency(item.totalAmount)
    ]);

    try {
      autoTable(doc, {
        startY: yPos + 12,
        head: [[
          { content: '#', styles: { halign: 'center', valign: 'middle' } },
          { content: 'Item Description', styles: { halign: 'left', valign: 'middle' } },
          { content: 'Qty', styles: { halign: 'center', valign: 'middle' } },
          { content: 'Rate', styles: { halign: 'right', valign: 'middle' } },
          { content: 'GST %', styles: { halign: 'center', valign: 'middle' } },
          { content: 'Amount', styles: { halign: 'right', valign: 'middle' } }
        ]],
        body: tableRows,
        theme: 'plain',
        headStyles: { fillColor: [240, 253, 250], textColor: accentColor, fontStyle: 'bold', valign: 'middle' },
        bodyStyles: { borderBottomWidth: 0.1, borderBottomColor: [180, 240, 220], valign: 'middle' },
        styles: { fontSize: 9, cellPadding: 4, textColor: textColor, minCellHeight: 12, valign: 'middle' },
        columnStyles: {
          0: { cellWidth: 10, halign: 'center', valign: 'middle' },
          1: { cellWidth: 65, halign: 'left', valign: 'middle' },
          2: { cellWidth: 18, halign: 'center', valign: 'middle' },
          3: { cellWidth: 32, halign: 'right', valign: 'middle' },
          4: { cellWidth: 25, halign: 'center', valign: 'middle' },
          5: { cellWidth: 32, halign: 'right', valign: 'middle' }
        }
      });
    console.log("[DEBUG] autoTable executed");
    } catch (e) {
      console.error("[DEBUG] autoTable failed:", e);
    }

    // --- TOTALS ---
    let finalY = doc.lastAutoTable.finalY + 15;
    
    doc.setFontSize(10);
    doc.setTextColor(...textColor);
    
    const totalsValueX = pageWidth - 14;
    const totalsLabelX = pageWidth - 75;
    
    doc.setDrawColor(...accentColor);
    doc.setLineWidth(0.5);
    doc.line(totalsLabelX - 5, finalY - 8, totalsValueX, finalY - 8);

    doc.setFont('helvetica', 'normal');
    doc.text('Subtotal', totalsLabelX, finalY);
    doc.text(formatPDFCurrency(invoice.subtotal), totalsValueX, finalY, { align: 'right' });
    
    let totalsY = finalY + 8;
    
    if (invoice.taxType === TAX_TYPES.INTRA_STATE) {
      doc.text('CGST', totalsLabelX, totalsY);
      doc.text(formatPDFCurrency(invoice.cgst), totalsValueX, totalsY, { align: 'right' });
      totalsY += 8;
      doc.text('SGST', totalsLabelX, totalsY);
      doc.text(formatPDFCurrency(invoice.sgst), totalsValueX, totalsY, { align: 'right' });
    } else {
      doc.text('IGST', totalsLabelX, totalsY);
      doc.text(formatPDFCurrency(invoice.igst), totalsValueX, totalsY, { align: 'right' });
    }
    
    totalsY += 10;
    
    doc.setFillColor(240, 253, 250); // Muted emerald background
    doc.rect(totalsLabelX - 8, totalsY - 8, (totalsValueX - totalsLabelX) + 12, 12, 'F');
    
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(12);
    doc.setTextColor(...accentColor);
    doc.text('Grand Total:', totalsLabelX - 4, totalsY);
    doc.text(formatPDFCurrency(invoice.grandTotal), totalsValueX - 2, totalsY, { align: 'right' });

    // Amount in words
    totalsY += 14;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(...primaryColor);
    doc.text('Amount in words:', 14, totalsY);
    
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...mutedColor);
    doc.text(numberToWords(Math.round(invoice.grandTotal)) + ' Only', 14, totalsY + 5);

    // --- FOOTER ---
    doc.setFillColor(250, 250, 250);
    doc.rect(0, pageHeight - 35, pageWidth, 35, 'F');
    doc.setDrawColor(...accentColor);
    doc.setLineWidth(0.5);
    doc.line(0, pageHeight - 35, pageWidth, pageHeight - 35);
    
    doc.setFontSize(9);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(...primaryColor);
    doc.text('Terms & Conditions', 14, pageHeight - 25);
    
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor(...mutedColor);
    doc.text('1. Please pay within the due date.', 14, pageHeight - 19);
    doc.text('2. All disputes are subject to local jurisdiction.', 14, pageHeight - 14);
    
    doc.setFont('helvetica', 'italic');
    doc.text('Generated securely via GST Calculator Pro', pageWidth - 14, pageHeight - 19, { align: 'right' });
    doc.text('Built for Digital Heroes', pageWidth - 14, pageHeight - 14, { align: 'right' });

    console.log("[DEBUG] doc.save() reached");
    try {
      doc.save(`${invoice.invoiceNumber}.pdf`);
      console.log("[DEBUG] PDF downloaded successfully");
    } catch (error) {
      console.error("[DEBUG] PDF generation failed:", error);
      throw new Error("Failed to generate PDF");
    }
  }
};
