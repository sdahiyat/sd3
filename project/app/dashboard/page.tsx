'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Mock client data - will be replaced with Supabase queries
  const clients = [
    { id: 1, name: 'John Smith', email: 'john@example.com', documentCount: 5, status: 'ready', lastUpdated: '2024-01-15' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', documentCount: 3, status: 'processing', lastUpdated: '2024-01-14' },
    { id: 3, name: 'Mike Davis', email: 'mike@example.com', documentCount: 0, status: 'needs-documents', lastUpdated: '2024-01-10' },
  ];

  const getStatusBadge = (status: string) => {
    const styles = {
      'ready': 'bg-green-100 text-green-800',
      'processing': 'bg-yellow-100 text-yellow-800',
      'needs-documents': 'bg-red-100 text-red-800',
      'failed': 'bg-red-100 text-red-800'
    };
    return `px-2 py-1 text-xs font-medium rounded-full ${styles[status as keyof typeof styles]}`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6 md:flex md:items-center md:justify-between">
            <div className="flex-1 min-w-0">
              <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl">
                Client Dashboard
              </h2>
            </div>
            <div className="mt-4 flex md:mt-0 md:ml-4">
              <Link
                href="/dashboard/clients/new"
                className="ml-3 inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                Add Client
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search clients by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="all">All Statuses</option>
            <option value="ready">Ready</option>
            <option value="processing">Processing</option>
            <option value="needs-documents">Needs Documents</option>
            <option value="failed">Failed</option>
          </select>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-md">
          <ul className="divide-y divide-gray-200">
            {clients.map((client) => (
              <li key={client.id}>
                <Link href={`/dashboard/clients/${client.id}`} className="block hover:bg-gray-50">
                  <div className="px-4 py-4 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-700">
                              {client.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{client.name}</div>
                          <div className="text-sm text-gray-500">{client.email}</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-sm text-gray-500">
                          {client.documentCount} documents
                        </div>
                        <span className={getStatusBadge(client.status)}>
                          {client.status.replace('-', ' ')}
                        </span>
                        <div className="text-sm text-gray-500">
                          {client.lastUpdated}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
