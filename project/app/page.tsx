import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Quick Sheets
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            AI-Powered Financial Advisory Platform. Upload client documents, receive AI-generated insights, 
            and enable clients to chat with their financial data.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/auth/login"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Advisor Login
            </Link>
            <Link
              href="/client-portal"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors"
            >
              Client Portal
            </Link>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">For Financial Advisors</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                Upload and manage client documents
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                AI-generated financial summaries and opportunities
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                Draft proposals ready for customization
              </li>
              <li className="flex items-start">
                <span className="text-blue-600 mr-2">✓</span>
                Comprehensive client management dashboard
              </li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">For Clients</h3>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                Chat with your personal financial data
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                View AI-generated financial insights
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                Access your documents anytime
              </li>
              <li className="flex items-start">
                <span className="text-green-600 mr-2">✓</span>
                Get general financial guidance
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
