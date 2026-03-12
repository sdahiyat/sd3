export type UserRole = 'advisor' | 'client'

export type User = {
  id: string
  email: string
  role: UserRole
  created_at: string
  updated_at: string
}

export type Client = {
  id: string
  advisor_id: string
  name: string
  email: string
  phone?: string
  notes?: string
  insight_status: InsightStatus
  created_at: string
  updated_at: string
  archived_at?: string
}

export type InsightStatus = 'needs_documents' | 'processing' | 'ready' | 'failed'

export type DocumentStatus = 'uploading' | 'uploaded' | 'processing' | 'ready' | 'failed'

export type DocumentCategory = 
  | 'tax_return'
  | 'investment_statement' 
  | 'insurance_policy'
  | 'estate_document'
  | 'bank_statement'
  | 'other'

export type Document = {
  id: string
  client_id: string
  advisor_id: string
  filename: string
  file_type: string
  file_size: number
  status: DocumentStatus
  category?: DocumentCategory
  extracted_text?: string
  structured_data?: Record<string, any>
  storage_path: string
  created_at: string
  updated_at: string
  deleted_at?: string
}

export type Insight = {
  id: string
  client_id: string
  advisor_id: string
  type: 'summary' | 'opportunities' | 'proposal'
  content: string
  version: number
  is_latest: boolean
  created_at: string
}

export type ChatMessage = {
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

export type VectorEmbedding = {
  id: string
  client_id: string
  document_id: string
  chunk_text: string
  chunk_index: number
  document_category: DocumentCategory
  embedding: number[]
  created_at: string
}

export interface DocumentProcessingResult {
  text: string
  category: DocumentCategory
  structured_data: Record<string, any>
}

export interface SimilaritySearchResult {
  chunk_text: string
  document_id: string
  document_name: string
  similarity_score: number
}

export interface InsightGenerationContext {
  structured_data: Record<string, any>[]
  relevant_chunks: SimilaritySearchResult[]
  client: Client
}
