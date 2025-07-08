-- Initial Database Schema for EVOLVE Project
-- This file serves as documentation and can be run directly in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Enable RLS (Row Level Security)
ALTER DEFAULT PRIVILEGES REVOKE EXECUTE ON FUNCTIONS FROM PUBLIC;

-- ====================================
-- Early Access Program Tables
-- ====================================

-- Waiting List Table
CREATE TABLE IF NOT EXISTS waiting_list (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL UNIQUE,
    source VARCHAR(50) DEFAULT 'evolve_page', -- Track where they signed up from
    metadata JSONB DEFAULT '{}', -- Additional data like referrer, utm params, etc.
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed', 'bounced')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Survey Responses Table
CREATE TABLE IF NOT EXISTS survey_responses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id UUID DEFAULT uuid_generate_v4(), -- Group related responses
    email VARCHAR(255), -- Optional, if they provided it
    experience_level VARCHAR(50), -- 'never', 'planning', 'few', 'experienced', 'expert'
    failure_reasons TEXT[], -- Array of selected failure reasons
    additional_comments TEXT, -- For future open-ended questions
    ip_address INET, -- For analytics and spam prevention
    user_agent TEXT, -- For analytics
    completed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    metadata JSONB DEFAULT '{}' -- Store additional survey data
);

-- Book Launch Notifications Table
CREATE TABLE IF NOT EXISTS launch_notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL,
    notification_type VARCHAR(50) NOT NULL, -- 'launch', 'early_access', 'preview', etc.
    sent_at TIMESTAMP WITH TIME ZONE,
    opened_at TIMESTAMP WITH TIME ZONE,
    clicked_at TIMESTAMP WITH TIME ZONE,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'sent', 'delivered', 'failed')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Engagement Tracking
CREATE TABLE IF NOT EXISTS user_engagement (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255),
    session_id UUID,
    action VARCHAR(100) NOT NULL, -- 'page_view', 'survey_start', 'waitlist_join', etc.
    page_url TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ====================================
-- Indexes for Performance
-- ====================================

-- Waiting List Indexes
CREATE INDEX IF NOT EXISTS idx_waiting_list_email ON waiting_list(email);
CREATE INDEX IF NOT EXISTS idx_waiting_list_created_at ON waiting_list(created_at);
CREATE INDEX IF NOT EXISTS idx_waiting_list_status ON waiting_list(status);

-- Survey Responses Indexes
CREATE INDEX IF NOT EXISTS idx_survey_responses_session_id ON survey_responses(session_id);
CREATE INDEX IF NOT EXISTS idx_survey_responses_email ON survey_responses(email);
CREATE INDEX IF NOT EXISTS idx_survey_responses_completed_at ON survey_responses(completed_at);
CREATE INDEX IF NOT EXISTS idx_survey_responses_experience ON survey_responses(experience_level);

-- Launch Notifications Indexes
CREATE INDEX IF NOT EXISTS idx_launch_notifications_email ON launch_notifications(email);
CREATE INDEX IF NOT EXISTS idx_launch_notifications_type ON launch_notifications(notification_type);
CREATE INDEX IF NOT EXISTS idx_launch_notifications_status ON launch_notifications(status);

-- User Engagement Indexes
CREATE INDEX IF NOT EXISTS idx_user_engagement_email ON user_engagement(email);
CREATE INDEX IF NOT EXISTS idx_user_engagement_action ON user_engagement(action);
CREATE INDEX IF NOT EXISTS idx_user_engagement_created_at ON user_engagement(created_at);

-- ====================================
-- Functions and Triggers
-- ====================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger for waiting_list updated_at
CREATE TRIGGER update_waiting_list_updated_at 
    BEFORE UPDATE ON waiting_list 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- ====================================
-- Row Level Security (RLS) Policies
-- ====================================

-- Enable RLS on all tables
ALTER TABLE waiting_list ENABLE ROW LEVEL SECURITY;
ALTER TABLE survey_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE launch_notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_engagement ENABLE ROW LEVEL SECURITY;

-- Public read access for application (adjust based on your needs)
CREATE POLICY "Allow public read access" ON waiting_list FOR SELECT USING (true);
CREATE POLICY "Allow public insert access" ON waiting_list FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read access" ON survey_responses FOR SELECT USING (true);
CREATE POLICY "Allow public insert access" ON survey_responses FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read access" ON launch_notifications FOR SELECT USING (true);
CREATE POLICY "Allow public insert access" ON launch_notifications FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read access" ON user_engagement FOR SELECT USING (true);
CREATE POLICY "Allow public insert access" ON user_engagement FOR INSERT WITH CHECK (true);

-- ====================================
-- Sample Analytics Views
-- ====================================

-- Survey Response Analytics View
CREATE OR REPLACE VIEW survey_analytics AS
SELECT 
    experience_level,
    COUNT(*) as response_count,
    COUNT(DISTINCT email) as unique_users,
    UNNEST(failure_reasons) as failure_reason,
    DATE_TRUNC('day', completed_at) as response_date
FROM survey_responses 
WHERE completed_at >= NOW() - INTERVAL '30 days'
GROUP BY experience_level, failure_reason, response_date;

-- Daily Signups View
CREATE OR REPLACE VIEW daily_signups AS
SELECT 
    DATE_TRUNC('day', created_at) as signup_date,
    COUNT(*) as signups,
    source
FROM waiting_list 
WHERE status = 'active'
GROUP BY signup_date, source
ORDER BY signup_date DESC;

-- ====================================
-- Comments for Documentation
-- ====================================

COMMENT ON TABLE waiting_list IS 'Stores email addresses of users who signed up for the EVOLVE book launch waiting list';
COMMENT ON TABLE survey_responses IS 'Stores responses from the quick AI survey about project failures';
COMMENT ON TABLE launch_notifications IS 'Tracks notification emails sent to users about book launch';
COMMENT ON TABLE user_engagement IS 'Tracks user interactions and engagement metrics';

COMMENT ON COLUMN waiting_list.source IS 'Where the user signed up from (evolve_page, homepage, survey, etc.)';
COMMENT ON COLUMN survey_responses.experience_level IS 'User''s self-reported experience level with AI projects';
COMMENT ON COLUMN survey_responses.failure_reasons IS 'Array of reasons user selected for why AI projects fail';