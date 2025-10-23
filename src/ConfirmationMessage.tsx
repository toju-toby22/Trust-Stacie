import React, { useEffect, useState } from 'react';

interface TrustFormData {
  guestName1: string;
  guestName2: string;
  guestName3: string;
  guestName4: string;
  rsvp: 'yes' | 'no';
}

interface SubmittedData extends TrustFormData {
  timestamp: string;
  sheetName: string;
  confirmationCode?: string;
}

interface ConfirmationMessageProps {
  data: SubmittedData;
  onReturn: () => void;
}

export function ConfirmationMessage({ data, onReturn }: ConfirmationMessageProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const guestList = [data.guestName1, data.guestName2, data.guestName3, data.guestName4].filter(Boolean);

  useEffect(() => {
    if (data.confirmationCode) {
      // Create QR code data - keep it simple
      const qrData = `${data.confirmationCode}|${guestList.join(',')}`;

      // Use QR Server API (free, no limits)
      const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(qrData)}`;
      setQrCodeUrl(qrUrl);
    }
  }, [data.confirmationCode, guestList]);

  const downloadQRCode = async () => {
    if (qrCodeUrl) {
      try {
        const response = await fetch(qrCodeUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.download = `RSVP-QR-${data.guestName1.replace(/\s+/g, '-')}.png`;
        link.href = url;
        link.click();
        window.URL.revokeObjectURL(url);
      } catch (error) {
        console.error('Error downloading QR code:', error);
        // Fallback: open in new tab
        window.open(qrCodeUrl, '_blank');
      }
    }
  };

  if (data.rsvp === 'no') {
    return (
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-2xl mx-auto text-center">
        <div className="mb-6">
          <div className="text-6xl mb-4">😢</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">We'll miss you!</h2>
          
          <div className="text-lg text-gray-600 space-y-2">
            <p className="font-semibold">RSVP received for:</p>
            <div className="bg-gray-50 p-4 rounded-lg">
              {guestList.map((guest, index) => (
                <p key={index} className="font-medium">✓ {guest}</p>
              ))}
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-600">
              We're sorry you can't make it. You'll be missed!
            </p>
          </div>

          <div className="mt-8">
            <button
              onClick={onReturn}
              className="text-gray-500 hover:text-gray-700 underline text-sm"
            >
              ← Back to form
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-xl p-8 max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          We're so excited!
        </h2>
        
        <div className="text-lg text-gray-600 space-y-2 mb-6">
          <p className="font-semibold">RSVP confirmed for:</p>
          <div className="bg-green-50 p-4 rounded-lg">
            {guestList.map((guest, index) => (
              <p key={index} className="font-medium text-green-800">✓ {guest}</p>
            ))}
          </div>
        </div>

        <div className="p-4 bg-green-50 rounded-lg mb-8">
          <p className="text-green-800 font-medium">
            We can't wait to celebrate with you!
          </p>
        </div>

         <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
              <h4 className="font-bold text-yellow-800 mb-2 flex items-center">
                <span className="text-xl mr-2">⚠️</span>
                Important Instructions
              </h4>
              <ul className="text-sm text-yellow-800 space-y-2 text-left">
                <li className="flex items-start">
                  <span className="mr-2">1.</span>
                  <span>Download this QR code to your phone immediately</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">2.</span>
                  <span>Save it to your phone's gallery or screenshot this page</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">3.</span>
                  <span>Show this QR code at the event entrance for check-in</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">4.</span>
                  <span className="font-bold">Each guest needs their own QR code - do not share with others</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">5.</span>
                  <span>The QR code will be scanned once at entry and cannot be reused</span>
                </li>
              </ul>
            </div>
      </div>

      {/* QR Code Section */}
      <div className="border-t border-gray-200 pt-6 ">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 mb-6 flex flex-col space-y-8 items-center">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center justify-center">
            <span className="mr-2">📱</span>
            Your Event Check-In QR Code
          </h3>
          
          <div className="bg-white p-6 rounded-lg shadow-md inline-block mx-auto">
            {qrCodeUrl ? (
              <img 
                src={qrCodeUrl} 
                alt="QR Code" 
                className="mx-auto mb-4 w-[300px] h-[300px]"
              />
            ) : (
              <div className="w-[300px] h-[300px] flex items-center justify-center bg-gray-100 mx-auto mb-4">
                <p className="text-gray-500">Loading QR Code...</p>
              </div>
            )}
            <p className="text-sm text-gray-600 font-mono text-center">
              Code: {data.confirmationCode}
            </p>
          </div>

          <div className="mt-6 space-y-4">
            <button
              onClick={downloadQRCode}
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-lg transition duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
            >
              <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download QR Code
            </button>

           

            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <p className="text-sm text-blue-800">
                <span className="font-semibold">💡 Pro Tip:</span> Take a screenshot of this entire page or save the QR code to multiple locations (phone, email, cloud) to ensure you have access on event day!
              </p>
            </div>
          </div>
        </div>

        <div className="text-center space-y-4">
          <a
            href="https://calendar.google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
          >
            📅 Add to Calendar
          </a>
          
          <div>
            <button
              onClick={onReturn}
              className="text-gray-500 hover:text-gray-700 underline text-sm"
            >
              ← Back to form
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-xs text-gray-400 text-center">
          Submitted on {new Date(data.timestamp).toLocaleString()}
        </p>
      </div>
    </div>
  );
}