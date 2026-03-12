export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center font-mono text-sm lg:flex">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-8">Quick Sheets</h1>
          <p className="text-xl text-muted-foreground mb-12">
            AI-Powered Financial Advisory Platform
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="border rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">For Advisors</h2>
              <p className="text-muted-foreground mb-4">
                Upload client documents, receive AI-generated insights, and manage client relationships.
              </p>
              <div className="space-y-2 text-left text-sm">
                <div>• Document upload and management</div>
                <div>• AI-generated summaries and opportunities</div>
                <div>• Customizable client proposals</div>
                <div>• Client relationship management</div>
              </div>
            </div>
            <div className="border rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">For Clients</h2>
              <p className="text-muted-foreground mb-4">
                Chat with your financial data and receive personalized guidance from AI.
              </p>
              <div className="space-y-2 text-left text-sm">
                <div>• View your financial documents</div>
                <div>• Chat with your personal data</div>
                <div>• Get general financial advice</div>
                <div>• Review advisor insights</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
