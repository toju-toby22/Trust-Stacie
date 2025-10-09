// ConfirmationMessage.tsx for Trust App
import React from 'react';
import { SubmittedData } from './types';
import { CONFIG } from './config';

interface ConfirmationMessageProps {
  data: SubmittedData;
  onReturn: () => void;
}

export function ConfirmationMessage({ data, onReturn }: ConfirmationMessageProps) {
  return (
    <>
    
    <div className="bg-white rounded-xl shadow-xl p-8 max-w-2xl mx-auto text-center">

      <div className="mb-6">
        {data.rsvp === 'yes' ? (
          <div className="text-6xl mb-4">🎉</div>
        ) : (
          <div className="text-6xl mb-4">😢</div>
        )}
        
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          {data.rsvp === 'yes' ? "We're so excited!" : "We'll miss you!"}
        </h2>
        
        <div className="text-lg text-gray-600 space-y-2">
          <p className="font-semibold">RSVP received for:</p>
          <div className="bg-green-50 p-4 rounded-lg">
            {data.guestName1 && <p className="font-medium">✓ {data.guestName1}</p>}
            {data.guestName2 && <p className="font-medium">✓ {data.guestName2}</p>}
            {data.guestName3 && <p className="font-medium">✓ {data.guestName3}</p>}
            {data.guestName4 && <p className="font-medium">✓ {data.guestName4}</p>}
          </div>
        </div>
        
        {data.rsvp === 'yes' ? (
          <div className="mt-6 p-4 bg-green-50 rounded-lg">
            <p className="text-green-800 font-medium">
              We can't wait to celebrate with you!
            </p>
            <p className="text-sm text-green-600 mt-2">
              {CONFIG.EVENT_DATE} at {CONFIG.EVENT_TIME}
            </p>
            <p className="text-sm text-green-600">
              {CONFIG.EVENT_LOCATION}
            </p>
          </div>
        ) : (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <p className="text-gray-600">
              We're sorry you can't make it. You'll be missed!
            </p>
          </div>
        )}
        
        <div className="mt-8 space-y-4">
          <a
            href={CONFIG.GOOGLE_CALENDAR_EVENT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
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
      
      {/* <div className="mt-8 pt-6 border-t border-gray-200">
        <p className="text-xs text-gray-400">
          Submitted on {new Date(data.timestamp).toLocaleString()}
        </p>
      </div> */}

      </div>
    </>
  );
}