export interface User {
  id: string;
  email: string;
  role: 'advisor' | 'client';
  created_at: string;
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
  notes?: string;
  advisor_id: string;
  created_at: string;
  archived_at?: string;
}

export interface Document {
  id: string;
  client_id: string;
  filename: string;
  file_type: string;
  file_size: number;
  status: 'uploading' | 'uploaded' | 'processing' | 'ready' | 'failed';
  category: 'tax_return' | 'investment_statement' | 'insurance_policy' | 'estate_document' | 'bank_statement' | 'other';
  upload_url?: string;
  extracted_text?: string;
  structured_data?: Record<string, any>;
  uploaded_at: string;
  processed_at?: string;
}

export interface Insight {
  id: string;
  client_id: string;
  type: 'summary' | 'opportunities' | 'proposal';
  content: string;
  version: number;
  generated_at: string;
}

export interface ChatMessage {
  id: string;
  client_id: string;
  message: string;
  response: string;
  mode: 'personal' | 'general';
  sources?: string[];
  created_at: string;
}

export interface Embedding {
  id: string;
  client_id: string;
  document_id: string;
  chunk_text: string;
  chunk_index: number;
  document_category: string;
  embedding: number[];
  created_at: string;
}

export type ClientStatus = 'needs-documents' | 'processing' | 'ready' | 'failed';
