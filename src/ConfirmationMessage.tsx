import React from 'react';
import { SubmittedData } from './types';
import { CONFIG } from './config';

interface ConfirmationMessageProps {
  data: SubmittedData;
  onReturn: () => void;
}

export function ConfirmationMessage({ data, onReturn }: ConfirmationMessageProps) {
  return (
    <div className="bg-white rounded-xl shadow-xl p-8 max-w-2xl mx-auto">
      <div className="text-center">
        <div className="mx-auto h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
          <svg className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        
        <h2 className="mt-4 text-3xl font-bold text-gray-800">Thank You!</h2>
        <p className="mt-2 text-gray-600 text-lg">
          Your RSVP has been successfully submitted.
        </p>
        
        <div className="mt-8 text-left bg-gray-50 p-6 rounded-lg border-2 border-gray-200">
          <h3 className="font-bold mb-4 text-xl text-gray-700">
            Your Response Summary:
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="font-semibold text-gray-700">Name:</span>
              <span className="text-gray-900">{data.guestName}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="font-semibold text-gray-700">Attending:</span>
              <span className={`font-semibold ${data.rsvp === 'yes' ? 'text-green-600' : 'text-red-600'}`}>
                {data.rsvp === 'yes' ? '✓ Yes' : '✗ No'}
              </span>
            </div>
            {/* <div className="flex justify-between border-b border-gray-200 pb-2">
              <span className="font-semibold text-gray-700">Gift Preference:</span>
              <span className="text-gray-900">
                {data.giftOption === 'cashapp' ? 'CashApp' : 'Physical Gift'}
              </span>
            </div> */}
            {data.notes && (
              <div className="pt-2">
                <p className="font-semibold text-gray-700 mb-1">Notes:</p>
                <p className="italic text-gray-600 bg-white p-3 rounded border border-gray-200">
                  {data.notes}
                </p>
              </div>
            )}
          </div>
        </div>
        
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={onReturn}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
          >
            Return to Form
          </button>
          
          <a
            href={CONFIG.GOOGLE_CALENDAR_EVENT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition duration-200 shadow-md hover:shadow-lg inline-block text-center"
          >
            Add to Calendar
          </a>
        </div>
      </div>
    </div>
  );
}