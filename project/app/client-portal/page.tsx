'use client';

import { useState } from 'react';

export default function ClientPortalPage() {
  const [activeTab, setActiveTab] = useState('dashboard');

  // Mock client data
  const clientData = {
    name: 'John Smith',
    documentCount: 5,
    lastUpdated: '2024-01-15'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome, {clientData.name}
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Your personal financial portal
            </p>
          </div>
          <div className="border-t border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'dashboard', name: 'Dashboard' },
                { id: 'documents', name: 'My Documents' },
                { id: 'summary', name: 'Financial Summary' },
                { id: 'chat', name: 'Ask Questions' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-2 px-1 border-b-2 font-medium text-sm`}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Documents</dt>
                      <dd className="text-lg font-medium text-gray-900">{clientData.documentCount}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Last Updated</dt>
                      <dd className="text-lg font-medium text-gray-900">{clientData.lastUpdated}</dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <h3 className="text-lg font-medium text-blue-900 mb-2">Quick Actions</h3>
                <button
                  onClick={() => setActiveTab('chat')}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Ask a Question
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'chat' && (
          <div className="bg-white shadow rounded-lg">
            <div className="p-6">
              <div className="flex justify-center mb-6">
                <div className="flex bg-gray-100 rounded-lg p-1">
                  <button className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-md">
                    Personal Insights
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 rounded-md">
                    General Information
                  </button>
                </div>
              </div>
              
              <div className="h-96 border border-gray-200 rounded-lg p-4 mb-4 overflow-y-auto">
                <div className="flex items-start space-x-3 mb-4">
                  <div className="bg-blue-100 rounded-full p-2">
                    <span className="text-blue-600 font-medium text-sm">AI</span>
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3">
                    <p className="text-sm">Hello! I can help you understand your financial situation based on your uploaded documents, or answer general financial questions. What would you like to know?</p>
                  </div>
                </div>
              </div>

              <div className="flex">
                <input
                  type="text"
                  placeholder="Ask me about your finances..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
                <button className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700">
                  Send
                </button>
              </div>
            </div>
          </div>
        )}

        {(activeTab === 'documents' || activeTab === 'summary') && (
          <div className="bg-white shadow rounded-lg p-6">
            <p className="text-gray-500 text-center">
              {activeTab === 'documents' ? 'Your documents will appear here.' : 'Your financial summary will appear here.'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
