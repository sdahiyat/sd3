export type UserRole = 'advisor' | 'client'

export interface User {
  id: string
  email: string
  role: UserRole
  created_at: string
  updated_at: string
}

export interface Client {
  id: string
  advisor_id: string
  name: string
  email: string
  phone?: string
  notes?: string
  created_at: string
  updated_at: string
  archived_at?: string
}

export type DocumentStatus = 'uploading' | 'uploaded' | 'processing' | 'ready' | 'failed'

export type DocumentCategory = 'Tax Return' | 'Investment Statement' | 'Insurance Policy' | 'Estate Document' | 'Bank Statement' | 'Other/Unknown'

export interface Document {
  id: string
  client_id: string
  filename: string
  file_type: string
  file_size: number
  status: DocumentStatus
  category?: DocumentCategory
  uploaded_by: string
  created_at: string
  updated_at: string
  extracted_text?: string
  structured_data?: Record<string, any>
  error_message?: string
}

export type InsightStatus = 'needs_documents' | 'processing' | 'ready' | 'failed'

export interface Insight {
  id: string
  client_id: string
  type: 'summary' | 'opportunities' | 'proposal'
  content: string
  status: InsightStatus
  version: number
  created_at: string
  updated_at: string
  error_message?: string
}

export interface ChatMessage {
  id: string
  client_id: string
  role: 'user' | 'assistant'
  content: string
  mode: 'personal' | 'general'
  sources?: Array<{
    document_id: string
    document_name: string
    chunk_text: string
  }>
  created_at: string
}

export interface VectorRecord {
  id: string
  client_id: string
  document_id: string
  chunk_text: string
  chunk_index: number
  document_category: DocumentCategory
  embedding: number[]
  created_at: string
}
