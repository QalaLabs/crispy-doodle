"use client";

import React, { useEffect } from 'react';
import { useOnlineStatus } from '@/hooks/use-online-status';
import { showSuccess, showError } from '@/utils/toast';

const SyncManager = () => {
  const isOnline = useOnlineStatus();

  useEffect(() => {
    if (isOnline) {
      const syncPendingData = async () => {
        const draft = localStorage.getItem('journal_draft');
        if (draft) {
          const parsed = JSON.parse(draft);
          if (parsed.isPendingSync) {
            try {
              const res = await fetch('/api/journals', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  content: parsed.content,
                  mood: parsed.mood,
                  imageKeys: parsed.images
                })
              });

              if (res.ok) {
                localStorage.removeItem('journal_draft');
                showSuccess("Offline journal entry synced successfully!");
                // Trigger a refresh of the journal list if on that page
                window.dispatchEvent(new CustomEvent('journal-synced'));
              }
            } catch (err) {
              console.error("Sync failed, will retry later", err);
            }
          }
        }
      };

      syncPendingData();
    }
  }, [isOnline]);

  return null; // Background component
};

export default SyncManager;
