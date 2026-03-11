import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Quick Sheets
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            AI-Powered Financial Advisory Platform enabling financial advisors to upload client documents, 
            receive AI-generated insights, and manage client relationships.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/auth/login"
              className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              Advisor Login
            </Link>
            <Link
              href="/client/login"
              className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              Client Portal
            </Link>
          </div>
        </div>

        <div className="mt-20 grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">For Financial Advisors</h2>
            <ul className="space-y-3 text-gray-600">
              <li>• Upload and manage client documents</li>
              <li>• Generate AI-powered financial insights</li>
              <li>• Create personalized client proposals</li>
              <li>• Manage client relationships efficiently</li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">For Clients</h2>
            <ul className="space-y-3 text-gray-600">
              <li>• View your financial documents</li>
              <li>• Chat with AI about your finances</li>
              <li>• Access personalized financial insights</li>
              <li>• Get answers to financial questions</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
