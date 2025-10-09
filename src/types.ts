export interface FormData {
  guestName: string;
  rsvp: 'yes' | 'no';
  giftOption: 'cashapp' | 'physical';
  notes: string;
}

export interface SubmittedData extends FormData {
  timestamp: string;
}

export interface Config {
  GOOGLE_APPS_SCRIPT_URL: string;
  GOOGLE_CALENDAR_EVENT_URL: string;
  EVENT_NAME: string;
  EVENT_DATE: string;
  EVENT_TIME: string;
  EVENT_LOCATION: string;
}