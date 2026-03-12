import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12">
      <div className="mx-auto max-w-4xl px-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
          Quick Sheets
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600">
          AI-powered financial advisory platform enabling advisors to upload client documents, 
          receive AI-generated insights, and manage client relationships—while clients can chat 
          with their own financial data and receive personalized guidance.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/auth/login"
            className="rounded-md bg-primary px-3.5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            Sign In
          </Link>
          <Link
            href="/auth/signup"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Sign Up <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
