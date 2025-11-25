"use client";

import { useState, useEffect } from "react";

export function useMissiveEmail() {
  const [email, setEmail] = useState<string | undefined>();
  const [phoneNumber, setPhoneNumber] = useState<string | undefined>();
  const [contactName, setContactName] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);
  const [missiveError, setMissiveError] = useState<string | null>(null);

  useEffect(() => {
    console.log("[useEmail] useEffect initializing");
    let mounted = true;

    const fetchAndDisplaySenderEmail = (ids?: string[]) => {
      console.log(
        "[useEmail] fetchAndDisplaySenderEmail called with ids:",
        ids
      );

      if (!ids || ids.length !== 1) {
        console.log(
          "[useEmail] Skipping - no single conversation selected:",
          ids?.length || 0
        );
        setEmail(undefined);
        setPhoneNumber(undefined);
        setContactName(undefined);
        return;
      }

      if (!window.Missive) {
        console.error("[useEmail] Missive not available");
        return;
      }

      window.Missive.fetchConversations(ids)
        .then((conversations) => {
          if (!mounted) return;

          const firstMessage = conversations[0]?.messages?.[0];
          const fromField = firstMessage?.from_field;

          console.log("conversations", conversations);
          console.log("firstMessage", firstMessage);
          console.log("fromField", fromField);

          if (!fromField) {
            console.log("[useEmail] No from_field found in first message");
            setEmail(undefined);
            setPhoneNumber(undefined);
            setContactName(undefined);
            return;
          }

          // Extract email (for email conversations)
          if (fromField.address) {
            console.log("[useEmail] Setting email to:", fromField.address);
            setEmail(fromField.address);
            setPhoneNumber(undefined);
          }
          // Extract phone number (for WhatsApp conversations)
          else if (fromField.phone_number) {
            console.log("[useEmail] Setting phone to:", fromField.phone_number);
            setPhoneNumber(fromField.phone_number);
            setEmail(undefined);
          } else {
            console.log("[useEmail] No email or phone found in from_field");
            setEmail(undefined);
            setPhoneNumber(undefined);
          }

          // Extract contact name (available for both types)
          if (fromField.name) {
            console.log("[useEmail] Setting contact name to:", fromField.name);
            setContactName(fromField.name);
          } else {
            setContactName(undefined);
          }
        })
        .catch((err: unknown) => {
          if (!mounted) return;
          console.error("Error fetching conversation data:", err);
          setMissiveError(
            "Failed to fetch conversation data. Please try again."
          );
        });
    };

    const initMissive = () => {
      if (!mounted) return;

      if (typeof window !== "undefined" && window.Missive) {
        console.log("[useEmail] Missive library loaded");
        setLoading(false);

        // Set up event listener with retroactive to get current state
        const handleConversationChange = (ids?: string[]) => {
          console.log(
            "[useEmail] handleConversationChange fired - change:conversations event, ids:",
            ids
          );
          fetchAndDisplaySenderEmail(ids);
        };

        // Register with retroactive: true to get current state immediately
        window.Missive.on("change:conversations", handleConversationChange, {
          retroactive: true,
        });

        // Cleanup function
        return () => {
          if (window.Missive) {
            window.Missive.off(
              "change:conversations",
              handleConversationChange
            );
            console.log("[useEmail] Cleaned up event listeners");
          }
        };
      }
    };

    // Wait for Missive library to load
    const checkMissiveInterval = setInterval(() => {
      if (window.Missive) {
        clearInterval(checkMissiveInterval);
        initMissive();
      }
    }, 100);

    // Timeout after 10 seconds
    const timeout = setTimeout(() => {
      if (!window.Missive) {
        clearInterval(checkMissiveInterval);
        console.error("[useEmail] Missive library failed to load");
        setMissiveError(
          "Failed to load Missive integration. Please refresh the page."
        );
        setLoading(false);
      }
    }, 10000);

    return () => {
      mounted = false;
      clearInterval(checkMissiveInterval);
      clearTimeout(timeout);
    };
  }, []);

  return { email, phoneNumber, contactName, loading, missiveError };
}
