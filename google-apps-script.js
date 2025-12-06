const SPREADSHEET_ID = '1le_9XHeSrK-xJaXlzeu1GWu6tVgc9L7etml9MvYLSuM';

const SHEET_NAME = 'Orders';

// ========== MAIN FUNCTION ==========

function doPost(e) {
  try {
    // Basic guard: ensure we actually have POST data
    if (!e || !e.postData || !e.postData.contents) {
      Logger.log('doPost called without event data.');
      return createErrorResponse('No POST data received.');
    }

    const data = JSON.parse(e.postData.contents);

    const validation = validateOrderData(data);
    if (!validation.valid) {
      return createErrorResponse(validation.message);
    }

    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    let sheet = spreadsheet.getSheetByName(SHEET_NAME);

    if (!sheet) {
      sheet = spreadsheet.insertSheet(SHEET_NAME);
      setupSheetHeaders(sheet);
    }

    // Ensure headers exist (if sheet existed but empty)
    if (sheet.getLastRow() === 0) {
      setupSheetHeaders(sheet);
    }

    const orderId = generateOrderId(sheet);
    const timestamp = new Date();
    const orderRow = processOrderData(data, orderId, timestamp);

    // Append row and then get actual new last row (to avoid off-by-one)
    sheet.appendRow(orderRow);
    const newRowNumber = sheet.getLastRow();

    // Format the new row
    formatOrderRow(sheet, newRowNumber);

    // =============================
    //   SEND EMAIL NOTIFICATION
    // =============================
    // Default status
    let emailStatus = "Failed";

    try {
      // Try to send email — this function is safe-guarded
      sendOrderEmailNotification(data, orderId, timestamp, orderRow);
      emailStatus = "Sent";
    } catch (err) {
      // If sendEmail throws, capture the error text in the status for debugging
      Logger.log("Email Error: " + err.toString());
      // Limit the error text to a reasonable length for the sheet
      const errText = (err && err.toString && err.toString().substring(0, 200)) || "Unknown error";
      emailStatus = "Failed: " + errText;
    }

    // Update Email Status in the new row, Column 13
    sheet.getRange(newRowNumber, 13).setValue(emailStatus);

    return createSuccessResponse(orderId);
  } catch (error) {
    Logger.log('Error in doPost: ' + error.toString());
    return createErrorResponse('Server error: ' + error.toString());
  }
}

// ========== TEST HELPER (run this manually in the editor to authorize and test) ==========

function doPostTest() {
  // A small mock payload for testing — change values if you want
  const testPayload = {
    fullName: "Test User",
    phone: "0123456789",
    email: "customer@example.com",
    fullAddress: "Test Address, Dhaka",
    deliveryLocation: "inside",
    deliveryCost: 60,
    totalPrice: 560,
    items: [
      { name: "Sample Product 1", price: 250, quantity: 1 },
      { name: "Sample Product 2", price: 250, quantity: 1 }
    ]
  };

  const fakeEvent = {
    postData: {
      contents: JSON.stringify(testPayload)
    }
  };

  // Call actual doPost with our fake event
  const response = doPost(fakeEvent);
  Logger.log("Test response: " + (response ? response.getContent() : "no response"));
}

// ========== SEND EMAIL ==========

function sendOrderEmailNotification(data, orderId, timestamp, orderRow) {
  // Prevent crashes when function is run manually with missing params
  if (!data || !orderId || !timestamp || !orderRow) {
    Logger.log("sendOrderEmailNotification called without full parameters.");
    return;
  }

  const emailTo = "support@giftwalabd.com";
  const subject = "🎉 New Order Received – " + orderId;

  // Format timestamp
  const formattedDate = Utilities.formatDate(timestamp, Session.getScriptTimeZone(), "dd MMMM yyyy, hh:mm a");
  
  // Build HTML email template
  const htmlBody = buildHTMLEmailTemplate(data, orderId, formattedDate, orderRow);
  
  // Plain text fallback
  const plainTextBody = buildPlainTextEmail(data, orderId, formattedDate, orderRow);

  // Use try/catch here to bubble up any error to caller (doPost) while giving more context
  try {
    MailApp.sendEmail({
      to: emailTo,
      subject: subject,
      htmlBody: htmlBody,
      body: plainTextBody
    });
    Logger.log("Order email sent for " + orderId + " to " + emailTo);
  } catch (err) {
    // Re-throw the error so doPost can capture it and write "Failed: <err>" into the sheet
    Logger.log("MailApp.sendEmail failed: " + err.toString());
    throw err;
  }
}

// ========== HTML EMAIL TEMPLATE ==========

function buildHTMLEmailTemplate(data, orderId, formattedDate, orderRow) {
  const items = data.items || [];
  const subtotal = orderRow[9] || 0;
  const deliveryCost = orderRow[10] || 0;
  const totalPrice = orderRow[11] || 0;
  
  // Build product rows
  let productRows = '';
  items.forEach((item, index) => {
    const itemTotal = (Number(item.price) || 0) * (Number(item.quantity) || 0);
    productRows += `
      <tr style="border-bottom: 1px solid #e5e7eb;">
        <td style="padding: 12px; text-align: left; color: #374151;">${index + 1}</td>
        <td style="padding: 12px; text-align: left; color: #111827; font-weight: 500;">${item.name || 'Unknown Product'}</td>
        <td style="padding: 12px; text-align: center; color: #374151;">${item.quantity || 0}</td>
        <td style="padding: 12px; text-align: right; color: #374151;">৳${Number(item.price) || 0}</td>
        <td style="padding: 12px; text-align: right; color: #111827; font-weight: 600;">৳${itemTotal}</td>
      </tr>
    `;
  });

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Order - ${orderId}</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f3f4f6;">
  <table role="presentation" style="width: 100%; border-collapse: collapse; background-color: #f3f4f6; padding: 20px;">
    <tr>
      <td align="center" style="padding: 20px 0;">
        <table role="presentation" style="width: 100%; max-width: 600px; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); overflow: hidden;">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700; letter-spacing: -0.5px;">
                🎉 New Order Received
              </h1>
              <p style="margin: 10px 0 0 0; color: #e0e7ff; font-size: 16px; font-weight: 500;">
                Order ID: ${orderId}
              </p>
            </td>
          </tr>

          <!-- Order Info Section -->
          <tr>
            <td style="padding: 30px 40px;">
              <div style="background-color: #f9fafb; border-left: 4px solid #667eea; padding: 20px; border-radius: 4px; margin-bottom: 30px;">
                <p style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">
                  Order Date & Time
                </p>
                <p style="margin: 0; color: #111827; font-size: 18px; font-weight: 600;">
                  ${formattedDate}
                </p>
              </div>

              <!-- Customer Details -->
              <h2 style="margin: 0 0 20px 0; color: #111827; font-size: 20px; font-weight: 700; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
                👤 Customer Information
              </h2>
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                <tr>
                  <td style="padding: 10px 0; color: #6b7280; font-size: 14px; width: 140px; font-weight: 500;">Full Name:</td>
                  <td style="padding: 10px 0; color: #111827; font-size: 14px; font-weight: 600;">${data.fullName || 'N/A'}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #6b7280; font-size: 14px; font-weight: 500;">Phone:</td>
                  <td style="padding: 10px 0; color: #111827; font-size: 14px; font-weight: 600;">
                    <a href="tel:${data.phone || ''}" style="color: #667eea; text-decoration: none;">${data.phone || 'N/A'}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #6b7280; font-size: 14px; font-weight: 500;">Email:</td>
                  <td style="padding: 10px 0; color: #111827; font-size: 14px; font-weight: 600;">
                    ${data.email ? '<a href="mailto:' + data.email + '" style="color: #667eea; text-decoration: none;">' + data.email + '</a>' : 'N/A'}
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #6b7280; font-size: 14px; font-weight: 500; vertical-align: top;">Address:</td>
                  <td style="padding: 10px 0; color: #111827; font-size: 14px; font-weight: 600;">${data.fullAddress || 'N/A'}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; color: #6b7280; font-size: 14px; font-weight: 500;">Delivery:</td>
                  <td style="padding: 10px 0;">
                    <span style="display: inline-block; background-color: ${data.deliveryLocation === 'inside' ? '#10b981' : '#f59e0b'}; color: #ffffff; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600;">
                      ${data.deliveryLocation === 'inside' ? '📍 Inside Dhaka' : '📍 Outside Dhaka'}
                    </span>
                  </td>
                </tr>
              </table>

              <!-- Order Items -->
              <h2 style="margin: 0 0 20px 0; color: #111827; font-size: 20px; font-weight: 700; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px;">
                🛍️ Order Items
              </h2>
              <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 30px; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 6px; overflow: hidden;">
                <thead>
                  <tr style="background-color: #f9fafb;">
                    <th style="padding: 12px; text-align: left; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">#</th>
                    <th style="padding: 12px; text-align: left; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Product Name</th>
                    <th style="padding: 12px; text-align: center; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Qty</th>
                    <th style="padding: 12px; text-align: right; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Unit Price</th>
                    <th style="padding: 12px; text-align: right; color: #6b7280; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${productRows}
                </tbody>
              </table>

              <!-- Order Summary -->
              <div style="background: linear-gradient(135deg, #f9fafb 0%, #ffffff 100%); border: 2px solid #e5e7eb; border-radius: 8px; padding: 25px; margin-bottom: 30px;">
                <h3 style="margin: 0 0 20px 0; color: #111827; font-size: 18px; font-weight: 700;">
                  💰 Order Summary
                </h3>
                <table role="presentation" style="width: 100%; border-collapse: collapse;">
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Subtotal:</td>
                    <td style="padding: 8px 0; text-align: right; color: #374151; font-size: 14px; font-weight: 500;">৳${subtotal.toLocaleString()}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; color: #6b7280; font-size: 14px;">Delivery Charge:</td>
                    <td style="padding: 8px 0; text-align: right; color: #374151; font-size: 14px; font-weight: 500;">৳${deliveryCost.toLocaleString()}</td>
                  </tr>
                  <tr style="border-top: 2px solid #e5e7eb; margin-top: 10px;">
                    <td style="padding: 15px 0 0 0; color: #111827; font-size: 18px; font-weight: 700;">Total Amount:</td>
                    <td style="padding: 15px 0 0 0; text-align: right; color: #667eea; font-size: 24px; font-weight: 700;">৳${totalPrice.toLocaleString()}</td>
                  </tr>
                </table>
              </div>

              <!-- Footer Note -->
              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; border-radius: 4px; margin-bottom: 20px;">
                <p style="margin: 0; color: #92400e; font-size: 13px; line-height: 1.6;">
                  <strong>📋 Next Steps:</strong> Please process this order and contact the customer to confirm delivery details. Payment will be collected upon delivery (Cash on Delivery).
                </p>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #f9fafb; padding: 25px 40px; text-align: center; border-top: 1px solid #e5e7eb;">
              <p style="margin: 0 0 10px 0; color: #6b7280; font-size: 14px; font-weight: 500;">
                Giftwala Bangladesh
              </p>
              <p style="margin: 0; color: #9ca3af; font-size: 12px;">
                This is an automated notification. Please do not reply to this email.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}

// ========== PLAIN TEXT FALLBACK ==========

function buildPlainTextEmail(data, orderId, formattedDate, orderRow) {
  const items = data.items || [];
  const itemsText = items.length > 0
    ? items.map((item, index) => `${index + 1}. ${item.name} (Qty: ${item.quantity}, Price: ৳${item.price})`).join("\n")
    : "No items listed";

  return `NEW ORDER RECEIVED

Order ID: ${orderId}
Date: ${formattedDate}

CUSTOMER DETAILS:
Name: ${data.fullName || 'N/A'}
Phone: ${data.phone || 'N/A'}
Email: ${data.email || 'N/A'}
Address: ${data.fullAddress || 'N/A'}
Delivery Location: ${data.deliveryLocation === 'inside' ? 'Inside Dhaka' : 'Outside Dhaka'}

ORDER ITEMS:
${itemsText}

ORDER SUMMARY:
Subtotal: ৳${orderRow[9] || 0}
Delivery Cost: ৳${orderRow[10] || 0}
Total Price: ৳${orderRow[11] || 0}

---
Giftwala Bangladesh
This is an automated notification.`;
}

// ========== DATA PROCESSING ==========

function processOrderData(data, orderId, timestamp) {
  const items = data.items || [];

  const subtotal = items.reduce((sum, item) => {
    const price = Number(item.price) || 0;
    const qty = Number(item.quantity) || 0;
    return sum + (price * qty);
  }, 0);

  const productsList = formatProductsList(items);
  const totalItems = items.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);

  return [
    orderId,                                               // A
    timestamp,                                             // B
    productsList,                                          // C
    totalItems,                                            // D
    data.fullName || '',                                   // E
    data.phone || '',                                      // F
    data.email || '',                                      // G
    data.fullAddress || '',                                // H
    data.deliveryLocation === 'inside' ? 'Inside Dhaka' : 'Outside Dhaka', // I
    subtotal,                                              // J
    data.deliveryCost || 0,                                // K
    data.totalPrice || 0,                                  // L
    "Pending"                                              // M (Email Status)
  ];
}

// ========== PRODUCT FORMATTING ==========

function formatProductsList(items) {
  if (!items || items.length === 0) return '';

  return items.map(item => {
    const name = item.name || 'Unknown Product';
    const qty = item.quantity || 0;
    const price = item.price || 0;
    return `${name} (Qty: ${qty} x ৳${price})`;
  }).join(', ');
}

// ========== SHEET SETUP ==========

function setupSheetHeaders(sheet) {
  const headers = [
    'Order ID',
    'Timestamp',
    'Product Names',
    'Total Items',
    'Full Name',
    'Phone',
    'Email',
    'Full Address',
    'Delivery Location',
    'Subtotal',
    'Delivery Cost',
    'Total Price',
    'Email Status' // NEW COLUMN
  ];

  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);

  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#1a73e8');
  headerRange.setFontColor('#ffffff');
  headerRange.setFontSize(11);

  sheet.setColumnWidth(1, 100);
  sheet.setColumnWidth(2, 160);
  sheet.setColumnWidth(3, 300);
  sheet.setColumnWidth(4, 100);
  sheet.setColumnWidth(5, 150);
  sheet.setColumnWidth(6, 120);
  sheet.setColumnWidth(7, 200);
  sheet.setColumnWidth(8, 250);
  sheet.setColumnWidth(9, 130);
  sheet.setColumnWidth(10, 120);
  sheet.setColumnWidth(11, 120);
  sheet.setColumnWidth(12, 120);
  sheet.setColumnWidth(13, 180); // Email Status column a bit wider

  sheet.setFrozenRows(1);
}

// ========== ROW FORMATTING ==========

function formatOrderRow(sheet, rowNumber) {
  // Format timestamp
  sheet.getRange(rowNumber, 2).setNumberFormat('yyyy-mm-dd hh:mm:ss');

  // Format currency columns (Subtotal, Delivery Cost, Total Price)
  sheet.getRange(rowNumber, 10).setNumberFormat('৳#,##0.00');
  sheet.getRange(rowNumber, 11).setNumberFormat('৳#,##0.00');
  sheet.getRange(rowNumber, 12).setNumberFormat('৳#,##0.00');

  // Format Total Items as number
  sheet.getRange(rowNumber, 4).setNumberFormat('0');

  // Alternate row colors for better readability
  const totalCols = 13;
  if (rowNumber % 2 === 0) {
    sheet.getRange(rowNumber, 1, 1, totalCols).setBackground('#f8f9fa');
  } else {
    // ensure odd rows remain white
    sheet.getRange(rowNumber, 1, 1, totalCols).setBackground('#ffffff');
  }
}

// ========== ORDER ID GENERATION ==========

function generateOrderId(sheet) {
  const lastRow = sheet.getLastRow();

  // If sheet only has header, start from #1001
  if (lastRow <= 1) {
    return '#1001';
  }

  // Get all Order IDs from column A (skip header)
  const orderIdRange = sheet.getRange(2, 1, lastRow - 1, 1);
  const orderIds = orderIdRange.getValues().flat();

  let maxOrderNumber = 1000;

  orderIds.forEach(orderId => {
    if (orderId && typeof orderId === 'string' && orderId.startsWith('#')) {
      const number = parseInt(orderId.substring(1), 10);
      if (!isNaN(number) && number > maxOrderNumber) {
        maxOrderNumber = number;
      }
    }
  });

  return '#' + (maxOrderNumber + 1);
}

// ========== VALIDATION ==========

function validateOrderData(data) {
  if (!data || typeof data !== 'object') {
    return { valid: false, message: 'Invalid payload' };
  }

  if (!data.fullName || data.fullName.toString().trim() === '') {
    return { valid: false, message: 'Full name is required' };
  }

  if (!data.phone || data.phone.toString().trim() === '') {
    return { valid: false, message: 'Phone number is required' };
  }

  if (!data.fullAddress || data.fullAddress.toString().trim() === '') {
    return { valid: false, message: 'Full address is required' };
  }

  if (!data.items || !Array.isArray(data.items) || data.items.length === 0) {
    return { valid: false, message: 'At least one item is required' };
  }

  for (let i = 0; i < data.items.length; i++) {
    const item = data.items[i];
    if (!item || !item.name || item.price == null || item.quantity == null) {
      return { valid: false, message: `Item ${i + 1} is missing required fields` };
    }

    if (Number(item.quantity) <= 0) {
      return { valid: false, message: `Item ${i + 1} has invalid quantity` };
    }

    if (Number(item.price) <= 0) {
      return { valid: false, message: `Item ${i + 1} has invalid price` };
    }
  }

  return { valid: true };
}

// ========== RESPONSE HELPERS ==========

function createSuccessResponse(orderId) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'success',
    orderId: orderId,
    message: 'Order saved successfully'
  })).setMimeType(ContentService.MimeType.JSON);
}

function createErrorResponse(message) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'error',
    message: message
  })).setMimeType(ContentService.MimeType.JSON);
}
