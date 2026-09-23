-- ==============================================================================
-- JAANDAAR MASALE: Direct Database User Authentication Schema
-- Run this SQL in your Supabase SQL Editor to create the direct users table
-- ==============================================================================

-- 1. Create the custom users table for direct DB authentication (without Supabase Auth service)
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'customer',
  phone TEXT DEFAULT '',
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Ensure profiles table exists with password_hash column for backward compatibility
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT,
  email TEXT UNIQUE,
  password_hash TEXT,
  role TEXT DEFAULT 'customer',
  phone TEXT DEFAULT '',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now())
);

-- Add password_hash to profiles if missing
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_schema = 'public' 
    AND table_name = 'profiles' 
    AND column_name = 'password_hash'
  ) THEN
    ALTER TABLE public.profiles ADD COLUMN password_hash TEXT;
  END IF;
END $$;

-- 3. Indexes for ultra-fast lookup
CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);

-- 4. Enable Row Level Security (RLS) & allow public/service operations
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Allow service role full access
CREATE POLICY IF NOT EXISTS "Service role full access on users"
  ON public.users FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY IF NOT EXISTS "Service role full access on profiles"
  ON public.profiles FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);
