import Link from 'next/link'

export default function VerifyPage() {
  return (
    <div className="text-center space-y-3">
      <div className="text-4xl">✉️</div>
      <h2 className="text-xl font-semibold text-stone-800">Verify your email</h2>
      <p className="text-sm text-stone-500">
        A sign-in link has been sent to your inbox. Click it to continue.
        The link expires in 24 hours.
      </p>
      <Link href="/auth/login" className="block text-sm text-brand-600 hover:underline mt-4">
        Back to sign in
      </Link>
    </div>
  )
}
