// App.tsx
import React, { useState } from 'react';
import { RSVPForm } from './RSVPForm';
import { ConfirmationMessage } from './ConfirmationMessage';
import { SubmittedData } from './types';
import bgImage from "./bg.jpg"

export default function App() {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [submittedData, setSubmittedData] = useState<SubmittedData | null>(null);

  const handleSubmissionSuccess = (data: SubmittedData) => {
    setSubmittedData(data);
    setSubmitted(true);
  };

  const handleReturn = () => {
    setSubmitted(false);
    setSubmittedData(null);
  };

  return (
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8 relative bg-contain flex justify-center"
     style={{
    backgroundImage:`linear-gradient(to bottom right, rgba(202,138,4,0.7), rgba(5,150,105,0.7), rgba(13,148,136,0.7)), url(${bgImage})`,
    backgroundBlendMode: "overlay",
    width: "100%",
    backgroundPosition:'center'
  }}
    >
      <div className="max-w-3xl mx-auto">
        {!submitted ? (
          <RSVPForm onSubmissionSuccess={handleSubmissionSuccess} />
        ) : (
          submittedData && <ConfirmationMessage data={submittedData} onReturn={handleReturn} />
        )}
      </div>
    </div>
  );
}