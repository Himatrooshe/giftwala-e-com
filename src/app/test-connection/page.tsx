'use client';

import { useState } from 'react';

export default function TestConnectionPage() {
  const [testResult, setTestResult] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  const testGoogleAppsScript = async () => {
    setIsLoading(true);
    setTestResult('Testing connection...');

    try {
      const testData = {
        test: true,
        timestamp: new Date().toISOString(),
        message: 'This is a test connection'
      };

      console.log('Sending test data:', testData);

      const response = await fetch('https://script.google.com/macros/s/AKfycbye347_k1uZaKqfGs1RP8f9fisfY--Tybgi2b1jrUs1teiS2b2tcKtqX7p_jCUmWpDD/exec?sheet=product', {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testData)
      });

      console.log('Response received:', response);
      setTestResult('✅ Connection successful! Check Google Sheets for test data.');
    } catch (error) {
      console.error('Connection failed:', error);
      setTestResult(`❌ Connection failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  const testWithCORS = async () => {
    setIsLoading(true);
    setTestResult('Testing with CORS...');

    try {
      const testData = {
        test: true,
        timestamp: new Date().toISOString(),
        message: 'This is a CORS test'
      };

      const response = await fetch('https://script.google.com/macros/s/AKfycbye347_k1uZaKqfGs1RP8f9fisfY--Tybgi2b1jrUs1teiS2b2tcKtqX7p_jCUmWpDD/exec?sheet=product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(testData)
      });

      const result = await response.json();
      console.log('CORS Response:', result);
      setTestResult(`✅ CORS test successful! Response: ${JSON.stringify(result)}`);
    } catch (error) {
      console.error('CORS test failed:', error);
      setTestResult(`❌ CORS test failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Google Apps Script Connection Test</h1>
        
        <div className="space-y-4">
          <button
            onClick={testGoogleAppsScript}
            disabled={isLoading}
            className="w-full bg-red-600 text-white py-3 px-6 rounded-lg hover:bg-red-700 disabled:opacity-50"
          >
            {isLoading ? 'Testing...' : 'Test Connection (no-cors)'}
          </button>

          <button
            onClick={testWithCORS}
            disabled={isLoading}
            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 disabled:opacity-50"
          >
            {isLoading ? 'Testing...' : 'Test Connection (with CORS)'}
          </button>
        </div>

        {testResult && (
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <h3 className="font-semibold mb-2">Test Result:</h3>
            <p className="text-sm">{testResult}</p>
          </div>
        )}

        <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="font-semibold text-yellow-800 mb-2">Debugging Steps:</h3>
          <ol className="text-sm text-yellow-700 space-y-1">
            <li>1. Open browser console (F12)</li>
            <li>2. Click the test buttons above</li>
            <li>3. Check console for detailed error messages</li>
            <li>4. Check Google Sheets for any new data</li>
            <li>5. Verify the Google Apps Script is deployed and accessible</li>
          </ol>
        </div>

        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="font-semibold text-red-800 mb-2">Common Issues:</h3>
          <ul className="text-sm text-red-700 space-y-1">
            <li>• Google Apps Script not deployed as web app</li>
            <li>• CORS policy blocking requests</li>
            <li>• Incorrect web app URL</li>
            <li>• Google Apps Script function not found (doGet/doPost)</li>
            <li>• Network connectivity issues</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
