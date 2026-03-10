# Cofabric Project



## Spec

Quick Sheets: AI-Powered Financial Advisory Platform
Final Technical Specification
1. Executive Summary asdfjasjkdfajs
asdfasdf
asdfasdfa
asdfasd
Quick Sheets is a dual-interface financial advisory platform enabling financial advisors to upload client documents, receive AI-generated insights, and manage client relationships—while clients can chat with their own financial data and receive personalized guidance.
Technology Stack

Backend: Supabase (PostgreSQL + Auth + Storage + Edge Functions)

Frontend: Next.js 14+ with App Router, TypeScript, Tailwind CSS

AI Provider: OpenAI (GPT-4 for generation, text-embedding-3-small for embeddings)

Vector Store: Supabase pgvector extension

Document Processing: pdf-parse for PDFs, Tesseract.js for OCR

File Storage: Supabase Storage with signed URLs

Deployment: Vercel (frontend), Supabase (backend services)
Scope Boundaries
IN SCOPE:

Advisor document upload and management

AI-generated summaries, opportunities, and proposals per client

Client-facing chat (RAG-powered personal + general advisory)

Role-based access (advisor sees all their clients; client sees only their data)

Basic compliance disclaimers on all AI outputs
OUT OF SCOPE:

Multi-advisor firms / team collaboration features

Billing or payment processing

Integration with external financial data providers (Plaid, Yodlee)

Mobile native apps (web responsive only)

Advanced compliance workflows (e.g., SEC audit trails, formal review queues)

Document e-signatures

White-labeling or custom branding per advisor
2. Feature Dependencies
Build Order
Features must be built in the following order due to dependencies:PHASE 1 - Foundation (no dependencies)
├── F1: Authentication & Authorization
└── F2: Client Management

PHASE 2 - Document Layer (requires Phase 1)
├── F3: Document Upload & Storage (depends on F1, F2)
└── F4: Document Processing Pipeline (depends on F3)

PHASE 3 - Intelligence Layer (requires Phase 2)
├── F5: Vector Store & Embeddings (depends on F4)
└── F6: AI Insight Generation (depends on F4, F5)

PHASE 4 - Interface Layer (requires Phase 3)
├── F7: Advisor Dashboard & Proposal Editor (depends on F1, F2, F3, F6)
└── F8: Client Portal & Chat Interface (depends on F1, F2, F5, F6)
Dependency Summary Table
| Feature | Depends On | Depended On By |
|---------|-----------|----------------|
| F1: Authentication | None | F2, F3, F7, F8 |
| F2: Client Management | F1 | F3, F5, F6, F7, F8 |
| F3: Document Upload | F1, F2 | F4, F7 |
| F4: Document Processing | F3 | F5, F6 |
| F5: Vector Store | F4 | F6, F8 |
| F6: AI Insight Generation | F4, F5 | F7, F8 |
| F7: Advisor Dashboard | F1, F2, F3, F6 | None |
| F8: Client Portal | F1, F2, F5, F6 | None |
3. Feature Specifications
F1: Authentication & Authorization
Purpose: Establish secure user identity and role-based access control for advisors and clients.
User Roles:

Advisor: Can create/manage clients, upload documents, view all insights for their clients, edit proposals

Client: Can view their own documents/insights, use chat features, cannot see other clients' data
Advisor Authentication:

Sign up with email and password

Email verification required before platform access

Password reset via email link
Client Authentication:

Clients cannot self-register

Advisors invite clients via email

Client receives secure link to set password and activate account

Password reset via email link
Authorization Rules:

A client belongs to exactly one advisor

Advisor can only access clients they created

Client can only access their own documents and insights

All API routes validate both authentication (who are you?) and authorization (can you access this resource?)
Session Management:

Sessions expire after 24 hours of inactivity

Session tokens rotated on privilege changes
Edge Cases:

Advisor deactivation: Soft-delete advisor; their clients retain read-only access to existing data

Client cannot exist without an advisor link

Email addresses must be unique across entire system

Duplicate email at registration: Show clear error message
Dependencies: None
F2: Client Management
Purpose: Enable advisors to create and manage client profiles that serve as the container for all documents and insights.
Client Profile Data:

Name (required)

Email (required, unique, used for portal login)

Phone (optional)

Notes (optional, advisor-only field)
Advisor Capabilities:

Create new client profile

Edit client profile information

Archive client (soft-delete: hides from dashboard, preserves all data)

View list of all their clients

Search clients by name or email

Filter clients by insight status
Client Record Relationships:
Each client record is the parent entity for:

All uploaded documents

Generated insights (summary, opportunities, proposals)

Chat conversation history

Vector embeddings
Client List Display:

Client name

Email

Document count

Last activity date

Insight status: Needs Documents, Processing, Ready, Failed
Behavioral Rules:

Creating a client triggers invitation email (via F1)

Archiving hides client from default views but preserves all data

An advisor can have unlimited clients

Client deletion is soft-delete only (data retained for compliance)
Edge Cases:

Advisor creates client with existing email: Show clear error

Client with no documents: Valid state; insights show "No documents uploaded yet"
Dependencies: F1
F3: Document Upload & Storage
Purpose: Allow advisors to upload financial documents for a specific client with secure storage and metadata tracking.
Supported Files:

PDF (primary)

Images: JPG, PNG (for scanned documents)

Maximum file size: 20MB per file

Maximum files per upload batch: 10
Upload Flow:

Advisor selects a client

Advisor uploads files via drag-and-drop or file picker

Files upload with progress indication

Each file creates a document record

Successfully uploaded documents automatically queue for processing (F4)
Document Status Lifecycle:
uploading → uploaded → processing → ready | failed
Document Metadata:

Original filename

File type (MIME type)

File size

Upload timestamp

Uploaded by (advisor user ID)

Processing status

Document category (assigned during F4 processing)
Document Categories (system-assigned):

Tax Return

Investment Statement

Insurance Policy

Estate Document

Bank Statement

Other/Unknown
Advisor Capabilities:

View all documents for a client (list or grid view)

See document status and category

Download original document

Delete document (soft-delete: removes from UI, triggers insight regeneration)

Manually override document category
Security:

Documents stored with encryption at rest

Access via signed URLs with 15-minute expiration

URL generation requires authorization check
Edge Cases:

Upload fails mid-transfer: Show error, allow retry, do not create partial records

Duplicate filename: Allowed (documents distinguished by ID)

Unsupported file type: Reject before upload with clear message

File exceeds size limit: Reject with message showing limit
Dependencies: F1, F2
F4: Document Processing Pipeline
Purpose: Extract text, classify documents, and extract structured data from uploaded documents to enable AI features.
Processing Stages:
Stage 1: Text Extraction

PDFs: Extract embedded text

Images/scanned PDFs: Run OCR

Output: Raw text content stored on document record
Stage 2: Document Classification

Analyze extracted text to determine document type

Assign one category from: Tax Return, Investment Statement, Insurance Policy, Estate Document, Bank Statement, Other/Unknown

Store category on document record
Stage 3: Structured Data Extraction
Extract category-specific fields:

Tax Returns: tax year, filing status, AGI, total income, total tax, refund/owed

Investment Statements: account type, total value, as-of date

Insurance Policies: policy type, coverage amount, premium, beneficiaries

Estate Documents: document type, date executed

Bank Statements: account type, ending balance, statement period
Output stored as structured data on document record.
Stage 4: Text Chunking

Split extracted text into chunks (~500 tokens each, 100 token overlap)

Tag each chunk with: document_id, client_id, chunk_index, document_category

Pass chunks to F5 for embedding
Processing Triggers:

Automatic: When document upload completes (F3)

Manual: Advisor can request reprocessing
Status Updates:

Document status updated through stages: processing → ready or failed

If any stage fails: entire document marked failed with error message

Partial success not allowed
Performance Targets:

Single document: < 60 seconds for typical 10-page PDF

Parallel processing: up to 3 documents per client concurrently
Error Handling:

OCR fails: Mark failed, suggest better quality scan

Text extraction yields nothing: Mark failed with "No readable text found"

Classification/extraction fails: Retry once, then mark failed
Dependencies: F3
F5: Vector Store & Embeddings
Purpose: Create and maintain per-client vector stores enabling RAG-powered chat and insight generation.
Embedding Creation:

Model: OpenAI text-embedding-3-small (1536 dimensions)

Each text chunk from F4 produces one embedding

Embeddings stored in pgvector table
Vector Record Contents:

Embedding vector (1536 dimensions)

client_id (required for scoping)

document_id (for source attribution)

chunk_text (original text)

chunk_index (ordering within document)

document_category (for filtered retrieval)
Operations:
Add Embeddings:

Triggered when F4 completes document processing

Generate embedding for each chunk

Batch insert into vector table
Query Embeddings:

Input: query text, client_id, optional category filter

Process: Embed query, similarity search within client's embeddings only

Output: Top-k results (default k=5) with chunk text and source document
Delete Embeddings:

Triggered when document is deleted

Remove all embeddings for that document_id

Triggers insight regeneration (F6)
Client Isolation (Security Requirement):

All queries MUST filter by client_id

No cross-client retrieval permitted
Performance Targets:

Embedding generation: ~100ms per chunk

Query latency: < 500ms for typical retrieval
Edge Cases:

Document reprocessed: Delete old embeddings, create new ones

Client with no documents: Query returns empty results (F8 handles gracefully)

Large document (100+ pages): Show progress; may take several minutes
Dependencies: F4
F6: AI Insight Generation asdkjfaskldjfalsdjfaslkdfj
asdklfasdkljsdfk
asdkfj
Purpose: Generate three AI-powered outputs per client: financial summary, planning opportunities, and draft proposal.
Insight Types:
1. Financial Summary

Comprehensive overview of client's financial situation

Synthesizes all uploaded documents

Sections: Income & Tax, Investments & Retirement, Insurance Coverage, Estate Planning, Key Observations

Length: 500-1000 words

Tone: Professional, factual, advisor-facing
2. Planning Opportunities

Actionable recommendations based on document analysis

Examples: tax optimization, coverage gaps, beneficiary inconsistencies, retirement contribution opportunities

Format: Bulleted list with explanations (5-15 items typical)

Priority ranking: High / Medium / Low

Tone: Directive, advisory
3. Draft Proposal

Client-facing document advisor can customize

Structure: Executive Summary, Current Situation, Recommendations, Next Steps

Length: 1-2 pages

Tone: Warm, professional, client-appropriate

Editable by advisor (see F7)
Generation Triggers:

Automatic: When all documents finish processing for a client

Manual: Advisor clicks "Regenerate Insights"

Re-triggered: When documents are added or deleted
Generation Process:

Retrieve structured data from client's documents

Retrieve relevant text chunks via vector search

Construct prompts with context

Generate each insight type

Store with timestamp and version
Versioning:

Each generation creates a new version

Previous versions viewable (read-only)

Latest version shown by default

Advisor edits to proposals tracked separately
Compliance Disclaimers:
All insights include mandatory disclaimer:
> "This analysis is generated by AI based on uploaded documents. It is intended for informational purposes only and does not constitute financial, tax, or legal advice. Please consult with a qualified professional before making financial decisions."
Disclaimer cannot be removed by advisor edits.
Error Handling:

Generation fails: Store error, show "Generation failed" status, allow retry

Partial generation not stored (all three complete or none)

No documents: Show "Upload documents to generate insights" instead of generating
Edge Cases:

Few documents: Generate with available info, note limitations

Conflicting information: Surface conflicts in summary, do not guess

Old documents (5+ years): Include but note dates, recommend updates
Dependencies: F4, F5
F7: Advisor Dashboard & Proposal Editor
Purpose: Central interface for advisors to manage clients, view documents and insights, and customize proposals.
Views:
Client List (Home)

Display all clients in table or card format

Show: Name, Email, Document Count, Insight Status, Last Updated

Search by name or email

Filter by insight status: Ready, Processing, Needs Documents, Failed

Sort by name, last updated, or document count

Click client to open Client Detail
Client Detail

Header with client name, contact info, edit button

Sections/Tabs:

Documents: List with status, category, upload date; upload button; delete action

Summary: Read-only financial summary display

Opportunities: List with priority badges

Proposal: Draft proposal with editing capability

Chat History (optional): View client's chat conversations
Proposal Editor

Rich text editor with basic formatting (headers, bold, italic, bullets, numbered lists)

Pre-populated with AI-generated draft

Auto-save while editing (debounced, 5 seconds after typing stops)

"Reset to AI Draft" button with confirmation

"Copy to Clipboard" button

"Export as PDF" button
Status Indicators:

Insight status badges on client cards and detail view

Processing indicators during document/insight generation

Error indicators with "Retry" action
Notifications:

Toast notifications for: upload success, processing complete, errors

No email notifications in MVP
Real-Time Updates:

UI updates without page refresh when documents finish processing

UI updates when insights are generated
Responsive Design:

Fully functional on desktop

Usable on tablet

Functional (not optimized) on phone
Dependencies: F1, F2, F3, F6
F8: Client Portal & Chat Interface
Purpose: Enable clients to view their financial insights and interact with AI for personalized and general financial guidance.
Portal Sections:
Dashboard (Home)

Welcome message with client name

Quick stats: document count, last updated date

Summary preview: first 200 words of financial summary with "Read more" link

Call-to-action: "Ask a question about your finances"
My Documents

Read-only list of uploaded documents

Display: document name, category, upload date

Download original document

Cannot upload or delete (advisor-only actions)
Financial Summary

Full financial summary from F6

Read-only display

Compliance disclaimer visible
Chat Interface
Primary feature with two distinct modes:
Mode A: Personal Financial Chat

Answers questions based on client's uploaded documents

Uses vector retrieval (F5) for context

Source attribution: Citations link to source documents

Example questions: "What was my AGI last year?", "How much life insurance do I have?"

Label: "Personal Insights" badge
Mode B: General Advisory Chat

Answers general financial and tax questions

Does NOT access client's documents

Uses LLM general knowledge only

Example questions: "What's the 401k contribution limit?", "How does a Roth conversion work?"

Label: "General Information" badge

Prominent disclaimer about general vs. personalized advice
Chat UX Requirements:

Conversation history preserved per mode

Visual distinction between user and AI messages

Typing indicator during AI response generation

Copy message button

Conversation context: last 10 messages included for continuity

"New conversation" button to clear history
Source Attribution (Personal Chat):

Inline citations [1], [2] in responses

Footnotes showing document name and type

If no relevant documents: "I don't have information about that in your uploaded documents."
Conversation Storage:

All messages stored with timestamps

Advisors can view client chat history (see F7)

Retention: indefinite
Rate Limiting:

Maximum 50 messages per client per day

Display remaining quota

Graceful message when limit exceeded
Error Handling:

Timeout: "I'm having trouble responding. Please try again."

No documents for personal query: Suggest general chat or ask advisor to upload documents
Dependencies: F1, F2, F5, F6
4. Non-Functional Requirements
Performance

Page load: < 2 seconds

Document upload: < 30 seconds for 20MB file with progress indication

Chat response: < 5 seconds (streaming preferred)

Document processing: < 60 seconds for typical document

Insight generation: < 90 seconds for complete set
Security

Data encrypted at rest and in transit

Row-level security at database level

Signed URLs for document access (15-minute expiration)

No sensitive data in URL parameters

Rate limiting on all API endpoints
Compliance (MVP Level)

Disclaimer on all AI-generated content (non-removable)

Audit logging: document uploads, document access, insight generation, chat messages

Soft-delete only (no hard deletion by users)

Data retention: minimum 7 years
Scalability Targets

100 concurrent advisors

1,000 total clients

Unlimited document storage (S3-backed)

Vector store: up to 1M vectors via pgvector
5. Assumptions & Decisions
The following assumptions are made for MVP. If requirements change, specific features may need revision.
| Decision | Current Assumption |
|----------|-------------------|
| Client onboarding | Advisor-invite only (no self-registration) |
| Proposal sharing | External only (copy/export); no in-app sharing to client portal |
| Client document upload | Not allowed; advisor-only for quality control |
| Language support | English only |
| Audit log UI | Backend logging only; no advisor-facing UI |
6. Glossary
| Term | Definition |
|------|------------|
| Advisor | A financial professional who manages multiple clients. Primary platform user. |
| Client | An individual whose financial documents are managed by an advisor. Has portal access. |
| Document | A single uploaded file (PDF or image) containing financial information. |
| Insight | AI-generated content (summary, opportunities, or proposal) derived from client documents. |
| RAG | Retrieval-Augmented Generation. Technique where relevant document chunks are retrieved and provided to LLM for contextual answers. |
| Chunk | A segment of document text (~500 tokens) stored with its embedding for similarity search. |
| Embedding | A vector representation of text enabling semantic similarity search. |
| Signed URL | A time-limited, authenticated URL for secure document access. |

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Stack

- [Next.js 14](https://nextjs.org/) (App Router)
- [Tailwind CSS](https://tailwindcss.com/)
- TypeScript

## Structure

```
app/         # Next.js App Router pages & layouts
components/  # Shared React components
lib/         # Utilities and helpers
public/      # Static assets
```

---

*Scaffolded by [Cofabric](https://cofabric.dev)*
