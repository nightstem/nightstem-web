export type UmamiProps = {
  /** Hostname of server */
  hostname?: string;
  /** Browser language */
  language?: string;
  /** Page referrer */
  referrer?: string;
  /** Screen dimensions (eg. 1920x1080) */
  screen?: string;
  /** Page title */
  title?: string;
  /** Page url */
  url?: string;
  /** Website ID */
  website: string;
  /** Event name */
  name?: string;
  /** Event data */
  data?: Record<string, unknown>;
};

export type UmamiAPI = {
  /** Tracks the current page */
  track(): void;
  /** Tracks the current page with custom payload */
  track(payload: Record<string, unknown>): void;
  /** Tracks custom event */
  track(eventName: string): void;
  /** Tracks custom event with data */
  track(eventName: string, data: Record<string, unknown>): void;
  /** Tracks custom event with default properties */
  track(cb: (props: UmamiProps) => Record<string, unknown>): void;

  /** Assign ID to current session */
  identify(id: string): void;
  /** Assign ID with data to current session */
  identify(id: string, data: Record<string, unknown>): void;
  /** Assign data without ID to current session */
  identify(data: Record<string, unknown>): void;
};
