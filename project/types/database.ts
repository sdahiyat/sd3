export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          role: 'advisor' | 'client'
          name: string
          phone?: string
          advisor_id?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          role: 'advisor' | 'client'
          name: string
          phone?: string
          advisor_id?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          role?: 'advisor' | 'client'
          name?: string
          phone?: string
          advisor_id?: string
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
          phone?: string
          notes?: string
          status: 'active' | 'archived'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          advisor_id: string
          name: string
          email: string
          phone?: string
          notes?: string
          status?: 'active' | 'archived'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          advisor_id?: string
          name?: string
          email?: string
          phone?: string
          notes?: string
          status?: 'active' | 'archived'
          created_at?: string
          updated_at?: string
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
          storage_path: string
          category?: string
          status: 'uploading' | 'uploaded' | 'processing' | 'ready' | 'failed'
          extracted_text?: string
          structured_data?: any
          error_message?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          client_id: string
          advisor_id: string
          filename: string
          file_type: string
          file_size: number
          storage_path: string
          category?: string
          status?: 'uploading' | 'uploaded' | 'processing' | 'ready' | 'failed'
          extracted_text?: string
          structured_data?: any
          error_message?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          client_id?: string
          advisor_id?: string
          filename?: string
          file_type?: string
          file_size?: number
          storage_path?: string
          category?: string
          status?: 'uploading' | 'uploaded' | 'processing' | 'ready' | 'failed'
          extracted_text?: string
          structured_data?: any
          error_message?: string
          created_at?: string
          updated_at?: string
        }
      }
      document_chunks: {
        Row: {
          id: string
          document_id: string
          client_id: string
          chunk_index: number
          chunk_text: string
          embedding: number[]
          document_category?: string
          created_at: string
        }
        Insert: {
          id?: string
          document_id: string
          client_id: string
          chunk_index: number
          chunk_text: string
          embedding: number[]
          document_category?: string
          created_at?: string
        }
        Update: {
          id?: string
          document_id?: string
          client_id?: string
          chunk_index?: number
          chunk_text?: string
          embedding?: number[]
          document_category?: string
          created_at?: string
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
          status: 'generating' | 'ready' | 'failed'
          error_message?: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          client_id: string
          advisor_id: string
          type: 'summary' | 'opportunities' | 'proposal'
          content: string
          version?: number
          status?: 'generating' | 'ready' | 'failed'
          error_message?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          client_id?: string
          advisor_id?: string
          type?: 'summary' | 'opportunities' | 'proposal'
          content?: string
          version?: number
          status?: 'generating' | 'ready' | 'failed'
          error_message?: string
          created_at?: string
          updated_at?: string
        }
      }
      chat_conversations: {
        Row: {
          id: string
          client_id: string
          type: 'personal' | 'general'
          message: string
          sender: 'client' | 'ai'
          source_documents?: string[]
          created_at: string
        }
        Insert: {
          id?: string
          client_id: string
          type: 'personal' | 'general'
          message: string
          sender: 'client' | 'ai'
          source_documents?: string[]
          created_at?: string
        }
        Update: {
          id?: string
          client_id?: string
          type?: 'personal' | 'general'
          message?: string
          sender?: 'client' | 'ai'
          source_documents?: string[]
          created_at?: string
        }
      }
    }
  }
}
