/**
 * Google Apps Script for Handling E-commerce Orders
 * 
 * Instructions:
 * 1. Go to https://script.google.com
 * 2. Create a new project
 * 3. Paste this code
 * 4. Create a Google Sheet named "Orders" with these columns in row 1:
 *    - Timestamp
 *    - Order ID
 *    - Full Name
 *    - Phone
 *    - Email
 *    - Full Address
 *    - Delivery Location
 *    - Product Details (JSON)
 *    - Subtotal
 *    - Delivery Cost
 *    - Total Price
 * 5. Replace 'YOUR_SHEET_ID' with your actual Google Sheet ID
 * 6. Replace 'tuhinbogra010@gmail.com' with your email if different
 * 7. Deploy as Web App with:
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 8. Copy the Web App URL and use it in your checkout page
 */

/**
 * Handle GET requests (for testing/health checks)
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Giftwala Order Handler is running',
      version: '1.0',
      timestamp: new Date().toISOString()
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Handle POST requests (for order submissions)
 */
function doPost(e) {
  try {
    // Parse the incoming data
    // Handle both text/plain and application/json content types
    let data;
    if (typeof e.postData.contents === 'string') {
      data = JSON.parse(e.postData.contents);
    } else {
      data = e.parameter || e.postData.contents;
    }
    
    // Generate Order ID
    const orderId = generateOrderId();
    const timestamp = new Date();
    
    // Get or create the Orders sheet
    const sheet = getOrCreateSheet('Orders');
    
    // Prepare order items as readable string
    const itemsString = formatOrderItems(data.items || []);
    
    // Prepare row data
    const rowData = [
      timestamp,
      orderId,
      data.fullName || '',
      data.phone || '',
      data.email || '',
      data.fullAddress || '',
      data.deliveryLocation || '',
      itemsString,
      data.subtotal || 0,
      data.deliveryCost || 0,
      data.totalPrice || 0
    ];
    
    // Add row to sheet
    sheet.appendRow(rowData);
    
    // Send confirmation email
    sendOrderConfirmationEmail(data, orderId);
    
    // Return success response with CORS headers
    const output = ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      orderId: orderId,
      message: 'Order saved successfully'
    }));
    output.setMimeType(ContentService.MimeType.JSON);
    return output;
      
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    const errorOutput = ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    }));
    errorOutput.setMimeType(ContentService.MimeType.JSON);
    return errorOutput;
  }
}

/**
 * Generate a unique Order ID
 */
function generateOrderId() {
  const sheet = getOrCreateSheet('Orders');
  const lastRow = sheet.getLastRow();
  const orderNumber = lastRow; // Start from 1, increment with each order
  return `#ORD${String(orderNumber).padStart(4, '0')}`;
}

/**
 * Get or create the Orders sheet
 */
function getOrCreateSheet(sheetName) {
  const spreadsheetId = 'YOUR_SHEET_ID'; // REPLACE WITH YOUR GOOGLE SHEET ID
  const spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  let sheet = spreadsheet.getSheetByName(sheetName);
  
  if (!sheet) {
    // Create sheet if it doesn't exist
    sheet = spreadsheet.insertSheet(sheetName);
    // Add headers
    sheet.appendRow([
      'Timestamp',
      'Order ID',
      'Full Name',
      'Phone',
      'Email',
      'Full Address',
      'Delivery Location',
      'Product Details',
      'Subtotal',
      'Delivery Cost',
      'Total Price'
    ]);
    // Format header row
    const headerRange = sheet.getRange(1, 1, 1, 11);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#4285f4');
    headerRange.setFontColor('#ffffff');
  }
  
  return sheet;
}

/**
 * Format order items as readable string
 */
function formatOrderItems(items) {
  if (!items || items.length === 0) return 'No items';
  
  const formatted = items.map((item, index) => {
    return `${index + 1}. ${item.name} (Qty: ${item.quantity}) - ৳${item.price}`;
  }).join(' | ');
  
  return formatted;
}

/**
 * Send confirmation email to customer and admin
 */
function sendOrderConfirmationEmail(orderData, orderId) {
  const customerEmail = orderData.email || '';
  const adminEmail = 'tuhinbogra010@gmail.com'; // REPLACE WITH YOUR EMAIL
  
  // Prepare email content
  const itemsList = (orderData.items || []).map((item, index) => {
    return `${index + 1}. ${item.name} - Quantity: ${item.quantity} - Price: ৳${item.price}`;
  }).join('\n');
  
  const emailSubject = `Order Confirmed: ${orderId} - Giftwala Bangladesh`;
  
  const emailBody = `
Dear ${orderData.fullName || 'Customer'},

Thank you for your order! Your order has been successfully reserved.

ORDER DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Order ID: ${orderId}
Order Date: ${new Date().toLocaleString('en-BD', { timeZone: 'Asia/Dhaka' })}

CUSTOMER INFORMATION:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Name: ${orderData.fullName || 'N/A'}
Phone: ${orderData.phone || 'N/A'}
Email: ${orderData.email || 'N/A'}
Address: ${orderData.fullAddress || 'N/A'}
Delivery Location: ${orderData.deliveryLocation === 'inside' ? 'Inside Dhaka' : 'Outside Dhaka'}

ORDER ITEMS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
${itemsList}

PRICING SUMMARY:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Subtotal: ৳${orderData.subtotal || 0}
Delivery Charge: ৳${orderData.deliveryCost || 0}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
TOTAL: ৳${orderData.totalPrice || 0}

NEXT STEPS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. We will call you shortly to confirm your order
2. Your order will be processed and shipped within 1-2 business days
3. Delivery time: ${orderData.deliveryLocation === 'inside' ? '2-3 business days' : '3-5 business days'}
4. Payment: Cash on Delivery (COD) - Pay when you receive your order

If you have any questions, please contact us:
📧 Email: tuhinbogra010@gmail.com
📱 Phone: +880 1789571784

Thank you for choosing Giftwala Bangladesh!

Best regards,
Giftwala Team
  `.trim();
  
  // Send email to customer if email provided
  if (customerEmail) {
    try {
      MailApp.sendEmail({
        to: customerEmail,
        subject: emailSubject,
        body: emailBody,
        name: 'Giftwala Bangladesh'
      });
      Logger.log('Confirmation email sent to customer: ' + customerEmail);
    } catch (emailError) {
      Logger.log('Failed to send email to customer: ' + emailError.toString());
    }
  }
  
  // Always send notification email to admin
  try {
    const adminEmailSubject = `New Order Received: ${orderId}`;
    const adminEmailBody = `
NEW ORDER RECEIVED - ACTION REQUIRED

Order ID: ${orderId}
Customer: ${orderData.fullName || 'N/A'}
Phone: ${orderData.phone || 'N/A'}
Email: ${orderData.email || 'N/A'}
Total: ৳${orderData.totalPrice || 0}

Please check Google Sheets for complete order details.

${emailBody}
    `.trim();
    
    MailApp.sendEmail({
      to: adminEmail,
      subject: adminEmailSubject,
      body: adminEmailBody,
      name: 'Giftwala Order System'
    });
    Logger.log('Notification email sent to admin: ' + adminEmail);
  } catch (adminEmailError) {
    Logger.log('Failed to send email to admin: ' + adminEmailError.toString());
  }
}

/**
 * Test function - can be run manually to test the script
 */
function testOrderSubmission() {
  const testData = {
    fullName: 'Test Customer',
    phone: '01789571784',
    email: 'test@example.com',
    fullAddress: 'Test Address, Dhaka',
    deliveryLocation: 'inside',
    items: [
      {
        id: 'gear-lever-sleeve',
        name: 'Gear Shifter Lever Shoe Protector',
        quantity: 2,
        price: 390
      }
    ],
    subtotal: 390,
    deliveryCost: 80,
    totalPrice: 470
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
  Logger.log('Test result: ' + result.getContent());
}

