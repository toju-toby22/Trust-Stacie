// RSVPForm.tsx
import React, { useEffect, useState } from "react";
import { CONFIG } from "./config";
import image from "./flower-pattern-png-5.png";

interface TrustFormData {
  guestName1: string;
  guestName2: string;
  guestName3: string;
  guestName4: string;
  rsvp: "yes" | "no";
}

interface SubmittedData extends TrustFormData {
  timestamp: string;
  sheetName: string;
  confirmationCode?: string;
}

interface RSVPFormProps {
  onSubmissionSuccess: (data: SubmittedData) => void;
}

export function RSVPForm({ onSubmissionSuccess }: RSVPFormProps) {
  const [formData, setFormData] = useState<TrustFormData>({
    guestName1: "",
    guestName2: "",
    guestName3: "",
    guestName4: "",
    rsvp: "yes",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [showQA, setShowQA] = useState<boolean>(false);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFormVisible(true);
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateFullName = (name: string): boolean => {
    const nameParts = name.trim().split(/\s+/);
    return nameParts.length >= 2 && nameParts.every(part => part.length > 0);
  };

  const generateConfirmationCode = (): string => {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    return `RSV-${random}-${timestamp}`;
  };

  const handleSubmit = async () => {
    if (!formData.guestName1.trim()) {
      setError("Please enter Guest Name 1 (First and Last Name required)");
      return;
    }

    if (!validateFullName(formData.guestName1)) {
      setError("Guest Name 1 must include both First and Last Name");
      return;
    }

    if (formData.guestName2.trim() && !validateFullName(formData.guestName2)) {
      setError("Guest Name 2 must include both First and Last Name");
      return;
    }

    if (formData.guestName3.trim() && !validateFullName(formData.guestName3)) {
      setError("Guest Name 3 must include both First and Last Name");
      return;
    }

    if (formData.guestName4.trim() && !validateFullName(formData.guestName4)) {
      setError("Guest Name 4 must include both First and Last Name");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const confirmationCode = generateConfirmationCode();
      
      const dataToSubmit: SubmittedData = {
        ...formData,
        timestamp: new Date().toISOString(),
        sheetName: "trust",
        confirmationCode: confirmationCode,
      };

      await fetch(CONFIG.GOOGLE_APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSubmit),
      });

      localStorage.setItem('trustRSVPSubmitted', 'true');
      localStorage.removeItem('trustRSVPAccessTime');
      
      onSubmissionSuccess(dataToSubmit);
    } catch (err) {
      setError("There was an error submitting your RSVP. Please try again.");
      console.error("Error submitting:", err);
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div>
      {!isFormVisible && (
        <div className="relative flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-emerald-600 mb-4"></div>
            <p className="text-black font-extrabold text-4xl monsieur-la-doulaise-regular-diff">
              Loading your invitation...
            </p>
          </div>
        </div>
      )}

      <div
        className={`bg-white rounded-xl shadow-xl p-8 max-w-2xl mx-auto relative overflow-hidden transition-all duration-1000 ${
          isFormVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="flex justify-between items-center bg-gradient-to-br from-yellow-600 via-emerald-600 to-teal-600">
          <img
            src={image}
            alt=""
            className="h-12 lg:h-[70px] rotate-[90deg] absolute top-[10px] left-[-19px]"
          />
          <img
            src={image}
            alt=""
            className="h-12 lg:h-[70px] rotate-[90deg] absolute top-[10px] right-[-19px] scale-y-[-1]"
          />
        </div>

        <div className="flex items-center justify-center">
          <div className="text-center mb-8">
            <h1 className="text-[40px] text-center font-bold text-gray-800 mb-2 monsieur-la-doulaise-regular">
              {CONFIG.EVENT_NAME}
            </h1>
            <div className="h-1 w-20 bg-green-500 mx-auto rounded-full mb-4"></div>
            <div className="text-gray-600 space-y-1">
              <p className="text-lg font-semibold">{CONFIG.EVENT_DATE}</p>
              <p>{CONFIG.EVENT_TIME}</p>
              <p>{CONFIG.EVENT_LOCATION}</p>
            </div>
          </div>
        </div>

       

        <div className="space-y-6">
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="guestName1">
              Guest Name 1* (First and Last Name)
            </label>
            <input
              className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              id="guestName1"
              name="guestName1"
              type="text"
              value={formData.guestName1}
              onChange={handleChange}
              placeholder="e.g., John Doe"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="guestName2">
              Guest Name 2 (First and Last Name)
            </label>
            <input
              className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              id="guestName2"
              name="guestName2"
              type="text"
              value={formData.guestName2}
              onChange={handleChange}
              placeholder="e.g., Jane Smith (Optional)"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="guestName3">
              Guest Name 3 (First and Last Name)
            </label>
            <input
              className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              id="guestName3"
              name="guestName3"
              type="text"
              value={formData.guestName3}
              onChange={handleChange}
              placeholder="e.g., Bob Johnson (Optional)"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="guestName4">
              Guest Name 4 (First and Last Name)
            </label>
            <input
              className="shadow appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              id="guestName4"
              name="guestName4"
              type="text"
              value={formData.guestName4}
              onChange={handleChange}
              placeholder="e.g., Mary Williams (Optional)"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-3">
              Will you attend? *
            </label>
            <div className="flex gap-6">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="rsvp"
                  value="yes"
                  checked={formData.rsvp === "yes"}
                  onChange={handleChange}
                  className="w-5 h-5 text-green-600 focus:ring-2 focus:ring-green-500"
                />
                <span className="ml-2 text-gray-700 font-medium">Yes, I'll be there</span>
              </label>
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="rsvp"
                  value="no"
                  checked={formData.rsvp === "no"}
                  onChange={handleChange}
                  className="w-5 h-5 text-red-600 focus:ring-2 focus:ring-red-500"
                />
                <span className="ml-2 text-gray-700 font-medium">Sorry, can't make it</span>
              </label>
            </div>
          </div>

          <div className="mb-6 rounded-xl p-6 border border-emerald-200 bg-gradient-to-br from-yellow-100 via-emerald-100 to-yellow-50 shadow-lg">
            <button
              onClick={() => setShowQA(!showQA)}
              className="w-full flex items-center justify-between text-left"
            >
              <div>
                <h3 className="text-2xl font-extrabold text-emerald-900 mb-1 bg-gradient-to-r from-emerald-700 via-yellow-600 to-emerald-400 bg-clip-text text-transparent">
                  Q & A
                </h3>
                <p className="text-sm text-emerald-700">
                  For all our friends and family who have lots of questions, please check out our Q & A
                </p>
              </div>
              <svg
                className={`w-6 h-6 text-emerald-600 transition-transform ${showQA ? "rotate-180" : ""}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {showQA && (
              <div className="mt-4 space-y-4 border-t border-emerald-200 pt-4">
                <div>
                  <p className="font-semibold text-emerald-900 mb-1 bg-gradient-to-r from-emerald-700 via-yellow-600 to-emerald-400 bg-clip-text text-transparent">
                    1. When is the RSVP deadline?
                  </p>
                  <p className="text-emerald-800">November 14th, 2025 (so we can have accurate headcount).</p>
                </div>

                <div>
                  <p className="font-semibold text-emerald-900 mb-1 bg-gradient-to-r from-emerald-700 via-yellow-600 to-emerald-400 bg-clip-text text-transparent">
                    2. What should I wear?
                  </p>
                  <p className="text-emerald-800">
                    This is strictly a black tie event. (Refer back to the video that was sent to you)
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-emerald-900 mb-1 bg-gradient-to-r from-emerald-700 via-yellow-600 to-emerald-400 bg-clip-text text-transparent">
                    3. Kids/infants
                  </p>
                  <p className="text-emerald-800">Kids/infants are not allowed please.</p>
                </div>

                <div>
                  <p className="font-semibold text-emerald-900 mb-1 bg-gradient-to-r from-emerald-700 via-yellow-600 to-emerald-400 bg-clip-text text-transparent">
                    4. Can I give cash as a gift?
                  </p>
                  <p className="text-emerald-800">
                    Your presence is the greatest gift, but if you wish to give, cash gifts are welcome / preferred:
                  </p>
                  <p className="text-emerald-800">
                    CashApp:{" "}
                    <a
                      href="https://cash.app/$trustasonye1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-emerald-900 underline hover:text-emerald-700"
                    >
                      $trustasonye1
                    </a>
                    <br />
                    Zelle:{" "}
                    <a
                      href="mailto:trusttaylor317@gmail.com"
                      className="font-mono text-emerald-900 underline hover:text-emerald-700"
                    >
                      trusttaylor317@gmail.com
                    </a>
                  </p>
                </div>

                <div>
                  <p className="font-semibold text-emerald-900 mb-1 bg-gradient-to-r from-emerald-700 via-yellow-600 to-emerald-400 bg-clip-text text-transparent">
                    Can I bring a plus one?
                  </p>
                  <p className="text-emerald-800">
                    Please only bring a plus one if your invitation specifically mentions it.
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
            <button
              className={`w-full sm:w-auto bg-gradient-to-r from-red-700 via-rose-600 to-fuchsia-600 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg focus:outline-none focus:ring-4 focus:ring-green-300 transition duration-200 shadow-md hover:shadow-lg ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                "Submit RSVP"
              )}
            </button>

            <a
              href={CONFIG.GOOGLE_CALENDAR_EVENT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto text-center font-bold text-sm bg-blue-500 hover:bg-blue-600 text-white py-3 px-8 rounded-lg focus:outline-none focus:ring-4 focus:ring-green-300 transition duration-200 shadow-md hover:shadow-lg"
            >
              Add to Calendar
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}