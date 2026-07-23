const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');

module.exports = {
  generatePassPDF(pass, res) {
    const doc = new PDFDocument({ size: 'A4', margin: 40 });

    // Set headers for file download
    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=Pass_${pass.pass_code}.pdf`);

    doc.pipe(res);

    // Decorative Header Banner
    doc.rect(40, 40, 515, 90).fill('#0F172A');
    doc.fillColor('#F59E0B').fontSize(22).font('Helvetica-Bold').text('SHRI SAILEELA PALKHI SOHALA 2026', 55, 55);
    doc.fillColor('#FFFFFF').fontSize(11).font('Helvetica').text('OFFICIAL PILGRIM DEVOTEE PASS | SHRI SAI LEELA SEVA TRUST', 55, 82);
    doc.fillColor('#94A3B8').fontSize(9).text('Reg. No: E-3892/MUM | Shirdi Yatra Emergency Desk: +91 98765 43210', 55, 100);

    // Pass Status Badge
    doc.rect(430, 55, 110, 26).rrect(430, 55, 110, 26, 4).fill('#059669');
    doc.fillColor('#FFFFFF').fontSize(11).font('Helvetica-Bold').text('CONFIRMED', 445, 62);

    // Main Details Box
    doc.rect(40, 145, 515, 340).lineWidth(1).strokeColor('#CBD5E1').stroke();
    
    // Watermark / Sub-header
    doc.fillColor('#0F172A').fontSize(14).font('Helvetica-Bold').text('DEVOTEE IDENTIFICATION DETAILS', 60, 165);
    doc.moveTo(60, 183).lineTo(535, 183).lineWidth(1).strokeColor('#E2E8F0').stroke();

    const drawField = (label, value, x, y, width = 220) => {
      doc.fillColor('#64748B').fontSize(9).font('Helvetica-Bold').text(label.toUpperCase(), x, y);
      doc.fillColor('#1E293B').fontSize(11).font('Helvetica').text(value || 'N/A', x, y + 13, { width });
    };

    drawField('Pass Registration ID', pass.pass_code, 60, 195);
    drawField('Full Name', pass.full_name, 300, 195);

    drawField('Contact Phone', pass.phone, 60, 240);
    drawField('Age & Gender', `${pass.age} Yrs / ${pass.gender}`, 300, 240);

    drawField('City / Origin', pass.city, 60, 285);
    drawField('ID Proof Verified', `${pass.id_proof_type} (${pass.id_proof_number})`, 300, 285);

    drawField('Assigned Yatra Batch', pass.batch, 60, 330, 440);

    drawField('Emergency Contact Number', pass.emergency_contact, 60, 385);
    drawField('Registration Date', new Date(pass.created_at).toLocaleDateString('en-IN', { dateStyle: 'medium' }), 300, 385);

    // Simulated QR Code Box
    doc.rect(60, 435, 455, 38).fill('#F8FAFC');
    doc.fillColor('#0F172A').fontSize(9).font('Helvetica-Bold').text(`VALID FOR ENTRY AT ALL PALKHI HALT COUNTERS | VERIFY CODE: ${pass.pass_code}`, 75, 448);

    // Instructions Box
    doc.rect(40, 500, 515, 180).fill('#FFFBEB');
    doc.rect(40, 500, 515, 180).lineWidth(1).strokeColor('#FCD34D').stroke();
    
    doc.fillColor('#92400E').fontSize(11).font('Helvetica-Bold').text('IMPORTANT INSTRUCTIONS FOR VARKARIS / DEVOTEES', 55, 515);
    
    const instructions = [
      '1. Please carry this original PDF pass (printed or digital on phone) along with your original ID Proof.',
      '2. Report to your assigned batch leader 30 minutes prior to Palkhi departure time.',
      '3. Free Mahaprasad & Medical assistance is available at all designated halts by showing this pass.',
      '4. Maintain sanctity and decorum during the entire Shirdi Palkhi Yatra.',
      '5. For medical or route emergencies, contact Palkhi Control Room: +91 98765 43210 / 91234 56789.'
    ];

    let instY = 535;
    instructions.forEach(inst => {
      doc.fillColor('#78350F').fontSize(9).font('Helvetica').text(inst, 55, instY);
      instY += 20;
    });

    // Signatures & Footer
    doc.fillColor('#64748B').fontSize(8).font('Helvetica').text('Issued by Shri Saileela Palkhi Seva Trust System | Computer Generated Document', 40, 750, { align: 'center', width: 515 });

    doc.end();
  },

  generateDonationPDF(donation, res) {
    const doc = new PDFDocument({ size: 'A4', margin: 40 });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=Receipt_${donation.receipt_no}.pdf`);

    doc.pipe(res);

    // Header Box
    doc.rect(40, 40, 515, 95).fill('#0F172A');
    doc.fillColor('#F59E0B').fontSize(22).font('Helvetica-Bold').text('SHRI SAI LEELA SEVA TRUST', 55, 55);
    doc.fillColor('#FFFFFF').fontSize(11).font('Helvetica').text('OFFICIAL DONATION RECEIPT (SEC 80G TAX EXEMPT)', 55, 82);
    doc.fillColor('#94A3B8').fontSize(9).text('Reg Trust No: E-3892/MUM | 80G Approval: CIT(E)/80G/2024-25/A-1029', 55, 102);

    // Main Receipt Body
    doc.rect(40, 150, 515, 330).lineWidth(1).strokeColor('#E2E8F0').stroke();

    doc.fillColor('#0F172A').fontSize(14).font('Helvetica-Bold').text('DONATION ACKNOWLEDGEMENT', 60, 168);
    doc.moveTo(60, 186).lineTo(535, 186).lineWidth(1).strokeColor('#E2E8F0').stroke();

    const drawField = (label, value, x, y, width = 220) => {
      doc.fillColor('#64748B').fontSize(9).font('Helvetica-Bold').text(label.toUpperCase(), x, y);
      doc.fillColor('#1E293B').fontSize(11).font('Helvetica').text(value || 'N/A', x, y + 13, { width });
    };

    drawField('Receipt Number', donation.receipt_no, 60, 200);
    drawField('Donation Date', new Date(donation.created_at).toLocaleDateString('en-IN', { dateStyle: 'medium' }), 300, 200);

    drawField('Donor Name', donation.donor_name, 60, 245);
    drawField('Contact Phone', donation.phone, 300, 245);

    drawField('PAN Number (80G)', donation.pan_number || 'NOT PROVIDED', 60, 290);
    drawField('Seva Category', donation.category, 300, 290);

    drawField('Razorpay Payment ID', donation.payment_id || 'pay_Simulated123', 60, 335);
    drawField('Transaction Status', donation.status || 'SUCCESS', 300, 335);

    // Amount Highlight Card
    doc.rect(60, 390, 455, 60).fill('#ECFDF5');
    doc.rect(60, 390, 455, 60).lineWidth(1).strokeColor('#10B981').stroke();
    
    doc.fillColor('#065F46').fontSize(10).font('Helvetica-Bold').text('AMOUNT RECEIVED IN WORDS / NUMBERS', 75, 402);
    doc.fillColor('#047857').fontSize(18).font('Helvetica-Bold').text(`₹ ${parseFloat(donation.amount).toLocaleString('en-IN')}/-`, 75, 420);

    // Tax Note
    doc.fillColor('#475569').fontSize(9).font('Helvetica-Oblique').text('All donations made to Shri Sai Leela Seva Trust are 50% tax exempt under Section 80G of the Income Tax Act, 1961.', 40, 500, { align: 'center', width: 515 });

    // Signatures
    doc.fillColor('#1E293B').fontSize(10).font('Helvetica-Bold').text('For Shri Sai Leela Seva Trust', 380, 570);
    doc.fillColor('#64748B').fontSize(9).font('Helvetica').text('Authorized Trustee Signature', 380, 620);
    
    doc.fillColor('#94A3B8').fontSize(8).font('Helvetica').text('Thank you for supporting Palkhi Annadan & Medical Seva. Om Sai Ram!', 40, 750, { align: 'center', width: 515 });

    doc.end();
  }
};
