// Simple toast helpers — wired to console in server context, browser toast in client
export function showSuccess(message: string) {
  if (typeof window !== 'undefined') {
    // Will be replaced with sonner/react-hot-toast once installed
    console.log('[toast:success]', message)
  }
}

export function showError(message: string) {
  if (typeof window !== 'undefined') {
    console.error('[toast:error]', message)
  }
}
