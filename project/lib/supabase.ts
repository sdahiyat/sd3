import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Auth helpers
export const signUp = async (email: string, password: string) => {
  return await supabase.auth.signUp({
    email,
    password,
  });
};

export const signIn = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
};

export const signOut = async () => {
  return await supabase.auth.signOut();
};

// Client management
export const createClient = async (clientData: {
  name: string;
  email: string;
  phone?: string;
  notes?: string;
  advisor_id: string;
}) => {
  return await supabase
    .from('clients')
    .insert(clientData)
    .select()
    .single();
};

export const getClientsByAdvisor = async (advisorId: string) => {
  return await supabase
    .from('clients')
    .select('*')
    .eq('advisor_id', advisorId)
    .is('archived_at', null)
    .order('name');
};

// Document management
export const uploadDocument = async (file: File, clientId: string) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `${clientId}/${Date.now()}.${fileExt}`;
  
  const { data, error } = await supabase.storage
    .from('documents')
    .upload(fileName, file);
    
  if (error) throw error;
  
  return await supabase
    .from('documents')
    .insert({
      client_id: clientId,
      filename: file.name,
      file_type: file.type,
      file_size: file.size,
      upload_url: data.path,
      status: 'uploaded'
    })
    .select()
    .single();
};

export const getClientDocuments = async (clientId: string) => {
  return await supabase
    .from('documents')
    .select('*')
    .eq('client_id', clientId)
    .order('uploaded_at', { ascending: false });
};
