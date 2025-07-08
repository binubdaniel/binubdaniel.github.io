-- Migration 001: Initial Setup for EVOLVE Early Access Program
-- Created: 2025-01-08
-- Description: Sets up core tables for waiting list, surveys, and user engagement

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ====================================
-- Create Tables
-- ====================================

-- Waiting List Table
CREATE TABLE waiting_list (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) NOT NULL UNIQUE,
    source VARCHAR(50) DEFAULT 'evolve_page',
    metadata JSONB DEFAULT '{}',
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'unsubscribed', 'bounced')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Survey Responses Table
CREATE TABLE survey_responses (
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
CREATE TABLE launch_notifications (
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
CREATE TABLE user_engagement (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255),
    session_id UUID,
    action VARCHAR(100) NOT NULL,
    page_url TEXT,
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ====================================
-- Create Indexes
-- ====================================

-- Waiting List Indexes
CREATE INDEX idx_waiting_list_email ON waiting_list(email);
CREATE INDEX idx_waiting_list_created_at ON waiting_list(created_at);
CREATE INDEX idx_waiting_list_status ON waiting_list(status);

-- Survey Responses Indexes
CREATE INDEX idx_survey_responses_session_id ON survey_responses(session_id);
CREATE INDEX idx_survey_responses_email ON survey_responses(email);
CREATE INDEX idx_survey_responses_completed_at ON survey_responses(completed_at);

-- Launch Notifications Indexes
CREATE INDEX idx_launch_notifications_email ON launch_notifications(email);
CREATE INDEX idx_launch_notifications_type ON launch_notifications(notification_type);

-- User Engagement Indexes
CREATE INDEX idx_user_engagement_email ON user_engagement(email);
CREATE INDEX idx_user_engagement_action ON user_engagement(action);
CREATE INDEX idx_user_engagement_created_at ON user_engagement(created_at);

-- ====================================
-- Create Functions and Triggers
-- ====================================

-- Updated at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to waiting_list
CREATE TRIGGER update_waiting_list_updated_at 
    BEFORE UPDATE ON waiting_list 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();