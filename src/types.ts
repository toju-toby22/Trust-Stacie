// types.ts for Trust App

export interface TrustFormData {
  guestName1: string;
  guestName2: string;
  guestName3: string;
  guestName4: string;
  rsvp: 'yes' | 'no';
}

export interface SubmittedData extends TrustFormData {
  timestamp: string;
  name?: string;
  email?: string;
  guests?: number;
  sheetName: string;
}


export interface Config {
  GOOGLE_APPS_SCRIPT_URL: string;
  GOOGLE_CALENDAR_EVENT_URL: string;
  EVENT_NAME: string;
  EVENT_DATE: string;
  EVENT_TIME: string;
  EVENT_LOCATION: string;
}