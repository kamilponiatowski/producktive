-- ============================================================
-- Supabase: Schemat dla strony Producktive
-- Uruchom w: Supabase Dashboard → SQL Editor
-- ============================================================

-- Tabela wiadomości kontaktowych
CREATE TABLE contact_messages (
  id             UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name           TEXT NOT NULL CHECK (char_length(name) BETWEEN 2 AND 100),
  email          TEXT NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  service        TEXT NOT NULL,
  budget         TEXT NOT NULL,
  message        TEXT NOT NULL CHECK (char_length(message) BETWEEN 20 AND 5000),
  attachment_url TEXT,
  created_at     TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  is_read        BOOLEAN DEFAULT FALSE NOT NULL
);

-- ─── RLS: Row Level Security ──────────────────────────────
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Publiczni użytkownicy mogą TYLKO dodawać wiadomości (INSERT)
CREATE POLICY "public_can_insert_contact"
  ON contact_messages FOR INSERT
  TO anon
  WITH CHECK (true);

-- Tylko zalogowany właściciel (service_role) może czytać
CREATE POLICY "owner_can_read_contact"
  ON contact_messages FOR SELECT
  TO authenticated
  USING (true);

-- ─── Indeksy ──────────────────────────────────────────────
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at DESC);
CREATE INDEX idx_contact_messages_is_read    ON contact_messages(is_read);

-- ============================================================
-- MIGRACJA: uruchom poniższe jeśli tabela już istnieje
-- ============================================================
-- ALTER TABLE contact_messages
--   DROP CONSTRAINT IF EXISTS contact_messages_message_check;
-- ALTER TABLE contact_messages
--   ADD CONSTRAINT contact_messages_message_check
--     CHECK (char_length(message) BETWEEN 20 AND 5000);
-- ALTER TABLE contact_messages
--   ADD COLUMN IF NOT EXISTS attachment_url TEXT;

-- ============================================================
-- STORAGE: bucket dla załączników
-- Utwórz ręcznie: Supabase Dashboard → Storage → New Bucket
--   Name:            contact-attachments
--   Public:          TAK (aby publicUrl działał w emailach)
--   File size limit: 5242880 (5 MB)
--   Allowed MIME:    image/jpeg,image/png,image/webp,application/pdf,
--                    application/msword,
--                    application/vnd.openxmlformats-officedocument.wordprocessingml.document
-- ============================================================
