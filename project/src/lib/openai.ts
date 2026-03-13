import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export { openai }

export const EMBEDDING_MODEL = 'text-embedding-3-small'
export const CHAT_MODEL = 'gpt-4'

export async function generateEmbedding(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: EMBEDDING_MODEL,
    input: text,
  })
  
  return response.data[0].embedding
}

export async function generateChatResponse(
  messages: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>,
  model: string = CHAT_MODEL
): Promise<string> {
  const response = await openai.chat.completions.create({
    model,
    messages,
    temperature: 0.7,
    max_tokens: 2000,
  })

  return response.choices[0].message.content || ''
}
