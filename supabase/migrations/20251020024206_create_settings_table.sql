/*
  # Create settings table and storage bucket

  1. New Tables
    - `settings`
      - `id` (integer, primary key) - Single row for site settings
      - `logo_url` (text, nullable) - URL to the uploaded logo
      - `created_at` (timestamptz) - When settings were created
      - `updated_at` (timestamptz) - Last update timestamp

  2. Storage
    - Create `assets` bucket for logo uploads
    - Enable public access for logo files

  3. Security
    - Enable RLS on `settings` table
    - Allow public read access to settings
    - Restrict write access to authenticated users
*/

CREATE TABLE IF NOT EXISTS settings (
  id integer PRIMARY KEY DEFAULT 1,
  logo_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT single_row CHECK (id = 1)
);

ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read settings"
  ON settings
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can update settings"
  ON settings
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can insert settings"
  ON settings
  FOR INSERT
  TO authenticated
  WITH CHECK (id = 1);

INSERT INTO settings (id, logo_url) VALUES (1, null) ON CONFLICT (id) DO NOTHING;

INSERT INTO storage.buckets (id, name, public) 
VALUES ('assets', 'assets', true)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public can view assets"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'assets');

CREATE POLICY "Authenticated users can upload assets"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'assets');

CREATE POLICY "Authenticated users can update assets"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'assets')
  WITH CHECK (bucket_id = 'assets');

CREATE POLICY "Authenticated users can delete assets"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'assets');
