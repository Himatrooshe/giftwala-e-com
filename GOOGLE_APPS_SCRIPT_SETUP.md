# Google Apps Script Setup for Order Management

This guide will help you set up Google Apps Script to save orders to Google Sheets and send confirmation emails.

## Step 1: Create Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Giftwala Orders" (or any name you prefer)
4. In the first row, add these column headers:
   - Timestamp
   - Order ID
   - Full Name
   - Phone
   - Email
   - Full Address
   - Delivery Location
   - Product Details
   - Subtotal
   - Delivery Cost
   - Total Price
5. Copy the Sheet ID from the URL (the long string between `/d/` and `/edit`)
   - Example: `https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit`

## Step 2: Create Google Apps Script

1. Go to [Google Apps Script](https://script.google.com)
2. Click "New Project"
3. Delete the default code
4. Copy and paste the code from `google-apps-script-order-handler.js`
5. Replace `YOUR_SHEET_ID` with your actual Google Sheet ID (from Step 1)
6. Replace `tuhinbogra010@gmail.com` with your email if different
7. Click "Save" (Ctrl+S or Cmd+S)
8. Name your project: "Giftwala Order Handler"

## Step 3: Deploy as Web App

1. Click "Deploy" → "New deployment"
2. Click the gear icon ⚙️ next to "Select type" → Choose "Web app"
3. Configure:
   - **Description**: "Order Handler v1"
   - **Execute as**: "Me" (your email)
   - **Who has access**: "Anyone" (important for public access)
4. Click "Deploy"
5. Click "Authorize access" and grant permissions:
   - Allow access to Google Sheets
   - Allow access to Gmail (for sending emails)
6. Copy the **Web App URL** (looks like: `https://script.google.com/macros/s/.../exec`)

## Step 4: Update Checkout Page

1. Open `src/app/checkout/page.tsx`
2. Find the line with `const scriptUrl = 'https://script.google.com/...'`
3. Replace the URL with your new Web App URL from Step 3
4. Save the file

## Step 5: Test the Setup

1. Go to your website's checkout page
2. Fill out a test order
3. Submit the order
4. Check:
   - Google Sheets should have a new row with order details
   - You should receive an email at `tuhinbogra010@gmail.com`
   - Customer should receive email (if email was provided)

## Email Configuration

The script sends two emails:
1. **Customer Email** (if email provided): Order confirmation with details
2. **Admin Email** (always): Notification of new order to `tuhinbogra010@gmail.com`

## Troubleshooting

### Emails not sending?
- Check that Gmail API is enabled in your Google Cloud Console
- Verify the email address is correct in the script
- Check Apps Script execution logs: View → Execution log

### Orders not saving to Sheets?
- Verify Sheet ID is correct
- Check that the sheet name is "Orders" (or update in script)
- Check Apps Script execution logs for errors

### CORS Errors?
- Make sure "Who has access" is set to "Anyone" in deployment settings
- The script uses `ContentService` which handles CORS automatically

## Security Notes

- The Web App URL is public but requires proper data format
- Consider adding basic validation in the script
- Regularly backup your Google Sheet
- Monitor the execution logs for suspicious activity

## Support

If you encounter issues:
1. Check Apps Script execution logs
2. Verify all permissions are granted
3. Test with the `testOrderSubmission()` function in the script editor

