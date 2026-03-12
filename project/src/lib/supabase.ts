import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side client with service role key for admin operations
export const supabaseAdmin = createClient(
  supabaseUrl,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Database types for better TypeScript support
export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          role: 'advisor' | 'client'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          role: 'advisor' | 'client'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          role?: 'advisor' | 'client'
          created_at?: string
          updated_at?: string
        }
      }
      clients: {
        Row: {
          id: string
          advisor_id: string
          name: string
          email: string
          phone: string | null
          notes: string | null
          insight_status: 'needs_documents' | 'processing' | 'ready' | 'failed'
          created_at: string
          updated_at: string
          archived_at: string | null
        }
        Insert: {
          id?: string
          advisor_id: string
          name: string
          email: string
          phone?: string | null
          notes?: string | null
          insight_status?: 'needs_documents' | 'processing' | 'ready' | 'failed'
          created_at?: string
          updated_at?: string
          archived_at?: string | null
        }
        Update: {
          id?: string
          advisor_id?: string
          name?: string
          email?: string
          phone?: string | null
          notes?: string | null
          insight_status?: 'needs_documents' | 'processing' | 'ready' | 'failed'
          created_at?: string
          updated_at?: string
          archived_at?: string | null
        }
      }
      documents: {
        Row: {
          id: string
          client_id: string
          advisor_id: string
          filename: string
          file_type: string
          file_size: number
          status: 'uploading' | 'uploaded' | 'processing' | 'ready' | 'failed'
          category: string | null
          extracted_text: string | null
          structured_data: any | null
          storage_path: string
          created_at: string
          updated_at: string
          deleted_at: string | null
        }
        Insert: {
          id?: string
          client_id: string
          advisor_id: string
          filename: string
          file_type: string
          file_size: number
          status?: 'uploading' | 'uploaded' | 'processing' | 'ready' | 'failed'
          category?: string | null
          extracted_text?: string | null
          structured_data?: any | null
          storage_path: string
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
        Update: {
          id?: string
          client_id?: string
          advisor_id?: string
          filename?: string
          file_type?: string
          file_size?: number
          status?: 'uploading' | 'uploaded' | 'processing' | 'ready' | 'failed'
          category?: string | null
          extracted_text?: string | null
          structured_data?: any | null
          storage_path?: string
          created_at?: string
          updated_at?: string
          deleted_at?: string | null
        }
      }
      insights: {
        Row: {
          id: string
          client_id: string
          advisor_id: string
          type: 'summary' | 'opportunities' | 'proposal'
          content: string
          version: number
          is_latest: boolean
          created_at: string
        }
        Insert: {
          id?: string
          client_id: string
          advisor_id: string
          type: 'summary' | 'opportunities' | 'proposal'
          content: string
          version?: number
          is_latest?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          client_id?: string
          advisor_id?: string
          type?: 'summary' | 'opportunities' | 'proposal'
          content?: string
          version?: number
          is_latest?: boolean
          created_at?: string
        }
      }
      chat_messages: {
        Row: {
          id: string
          client_id: string
          role: 'user' | 'assistant'
          content: string
          mode: 'personal' | 'general'
          sources: any | null
          created_at: string
        }
        Insert: {
          id?: string
          client_id: string
          role: 'user' | 'assistant'
          content: string
          mode: 'personal' | 'general'
          sources?: any | null
          created_at?: string
        }
        Update: {
          id?: string
          client_id?: string
          role?: 'user' | 'assistant'
          content?: string
          mode?: 'personal' | 'general'
          sources?: any | null
          created_at?: string
        }
      }
      vector_embeddings: {
        Row: {
          id: string
          client_id: string
          document_id: string
          chunk_text: string
          chunk_index: number
          document_category: string
          embedding: any
          created_at: string
        }
        Insert: {
          id?: string
          client_id: string
          document_id: string
          chunk_text: string
          chunk_index: number
          document_category: string
          embedding: any
          created_at?: string
        }
        Update: {
          id?: string
          client_id?: string
          document_id?: string
          chunk_text?: string
          chunk_index?: number
          document_category?: string
          embedding?: any
          created_at?: string
        }
      }
    }
  }
}
