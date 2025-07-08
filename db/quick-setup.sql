-- Quick Setup SQL for EVOLVE Project
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Waiting List Table
CREATE TABLE IF NOT EXISTS waiting_list (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL UNIQUE,
    source VARCHAR(50) DEFAULT 'evolve_page',
    metadata JSONB DEFAULT '{}',
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed', 'bounced')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Survey Responses Table
CREATE TABLE IF NOT EXISTS survey_responses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID DEFAULT uuid_generate_v4(),
    email VARCHAR(255),
    experience_level VARCHAR(50),
    failure_reasons TEXT[],
    additional_comments TEXT,
    ip_address INET,
    user_agent TEXT,
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    metadata JSONB DEFAULT '{}'
);

-- Launch Notifications Table
CREATE TABLE IF NOT EXISTS launch_notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL,
    notification_type VARCHAR(50) NOT NULL,
    sent_at TIMESTAMP WITH TIME ZONE,
    opened_at TIMESTAMP WITH TIME ZONE,
    clicked_at TIMESTAMP WITH TIME ZONE,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'delivered', 'failed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Engagement Table
CREATE TABLE IF NOT EXISTS user_engagement (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255),
    session_id UUID,
    action VARCHAR(100) NOT NULL,
    page_url TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Indexes
CREATE INDEX IF NOT EXISTS idx_waiting_list_email ON waiting_list(email);
CREATE INDEX IF NOT EXISTS idx_waiting_list_created_at ON waiting_list(created_at);
CREATE INDEX IF NOT EXISTS idx_survey_responses_email ON survey_responses(email);
CREATE INDEX IF NOT EXISTS idx_survey_responses_completed_at ON survey_responses(completed_at);

-- Enable RLS
ALTER TABLE waiting_list ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE launch_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_engagement ENABLE ROW LEVEL SECURITY;

-- Basic policies for public access
CREATE POLICY "Allow public read access" ON waiting_list FOR SELECT USING (true);
CREATE POLICY "Allow public insert access" ON waiting_list FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read access" ON survey_responses FOR SELECT USING (true);
CREATE POLICY "Allow public insert access" ON survey_responses FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read access" ON launch_notifications FOR SELECT USING (true);
CREATE POLICY "Allow public insert access" ON launch_notifications FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public read access" ON user_engagement FOR SELECT USING (true);
CREATE POLICY "Allow public insert access" ON user_engagement FOR INSERT WITH CHECK (true);