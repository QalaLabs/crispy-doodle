import Link from 'next/link'

const ERROR_MESSAGES: Record<string, string> = {
  OAuthSignin: 'Could not start the sign-in process. Please try again.',
  OAuthCallback: 'Something went wrong with Google sign-in. Please try again.',
  OAuthCreateAccount: 'Could not create your account via Google.',
  EmailCreateAccount: 'Could not create your account.',
  Callback: 'An unexpected error occurred.',
  OAuthAccountNotLinked: 'This email is already registered with a different sign-in method.',
  EmailSignin: 'Could not send the sign-in email. Please check your address.',
  CredentialsSignin: 'Invalid email or password.',
  SessionRequired: 'You must be signed in to access this page.',
  default: 'An unexpected error occurred. Please try again.',
}

export default function AuthErrorPage({
  searchParams,
}: {
  searchParams: { error?: string }
}) {
  const message = ERROR_MESSAGES[searchParams.error ?? 'default'] ?? ERROR_MESSAGES.default

  return (
    <div className="text-center space-y-3">
      <div className="text-4xl">⚠️</div>
      <h2 className="text-xl font-semibold text-stone-800">Sign-in error</h2>
      <p className="text-sm text-stone-500">{message}</p>
      <Link
        href="/auth/login"
        className="inline-block mt-4 bg-brand-500 hover:bg-brand-600 text-white rounded-xl py-2 px-6 text-sm font-medium transition"
      >
        Back to sign in
      </Link>
    </div>
  )
}
