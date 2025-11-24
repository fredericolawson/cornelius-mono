export interface MissiveFromField {
  address: string;
  name?: string;
}

export interface MissiveMessage {
  from_field?: MissiveFromField;
  to_fields?: MissiveFromField[];
  subject?: string;
  body?: string;
}

export interface MissiveConversation {
  id: string;
  latest_message?: MissiveMessage;
  subject?: string;
}

export interface MissiveAPI {
  /**
   * Fetch conversation details by IDs
   */
  fetchConversations(ids: string[]): Promise<MissiveConversation[]>;

  /**
   * Register event listeners
   */
  on(
    event: "main_action" | "change:conversations" | "message_sent" | "change:users",
    callback: (ids?: string[]) => void,
    options?: { retroactive?: boolean }
  ): void;

  /**
   * Remove event listeners
   */
  off(
    event: "main_action" | "change:conversations" | "message_sent" | "change:users",
    callback: (ids?: string[]) => void
  ): void;

  /**
   * Store data securely
   */
  storeSet(key: string, value: string): Promise<void>;

  /**
   * Retrieve stored data
   */
  storeGet(key: string): Promise<string | null>;

  /**
   * Initiate OAuth callback flow
   */
  initiateCallback(url: string): Promise<Record<string, string>>;
}

declare global {
  interface Window {
    Missive?: MissiveAPI;
  }
}

