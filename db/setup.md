# Database Setup Guide

This guide walks you through setting up the database for the EVOLVE project using Supabase + Prisma.

## Prerequisites

1. **Supabase Project**: Create a new blank Supabase project
2. **Environment Variables**: Set up your database connection
3. **Prisma CLI**: Install Prisma CLI if not already installed

## Setup Steps

### 1. Install Dependencies

```bash
npm install prisma @prisma/client
npm install -D prisma
```

### 2. Environment Configuration

Create/update your `.env.local` file:

```env
# Supabase Database URLs
DATABASE_URL="postgresql://postgres:[password]@[project-ref].supabase.co:5432/postgres"
DIRECT_URL="postgresql://postgres:[password]@[project-ref].supabase.co:5432/postgres"

# Supabase Client
NEXT_PUBLIC_SUPABASE_URL="https://[project-ref].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[your-anon-key]"
```

### 3. Database Schema Setup

Choose one of these approaches:

#### Option A: Direct SQL (Recommended for initial setup)

1. Open Supabase Dashboard → SQL Editor
2. Copy and paste the contents of `db/schema.sql`
3. Run the query

#### Option B: Prisma Migrations

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database (for prototyping)
npx prisma db push

# OR create and run migrations (for production)
npx prisma migrate dev --name initial_setup
```

### 4. Verify Setup

```bash
# Check database connection
npx prisma db pull

# Browse your data
npx prisma studio
```

## Migration Strategy

### For Development
Use `prisma db push` for rapid prototyping:
```bash
npx prisma db push
```

### For Production
Use proper migrations:
```bash
# Create a new migration
npx prisma migrate dev --name add_new_feature

# Deploy to production
npx prisma migrate deploy
```

### Manual SQL Migrations
For complex changes, use the `db/migrations/` folder:

1. Create a new numbered migration file
2. Run it manually in Supabase SQL Editor
3. Update Prisma schema accordingly
4. Run `npx prisma db pull` to sync

## Database Tables

### Core Tables

1. **waiting_list** - Email signups for book launch
2. **survey_responses** - AI project survey data
3. **launch_notifications** - Email notification tracking
4. **user_engagement** - User interaction analytics

### Indexes

All tables include optimized indexes for:
- Email lookups
- Time-based queries
- Status filtering
- Analytics queries

## Analytics Queries

### Top Survey Response Patterns
```sql
SELECT 
    experience_level,
    UNNEST(failure_reasons) as failure_reason,
    COUNT(*) as count
FROM survey_responses 
GROUP BY experience_level, failure_reason
ORDER BY count DESC;
```

### Daily Signup Trends
```sql
SELECT 
    DATE_TRUNC('day', created_at) as date,
    COUNT(*) as signups,
    source
FROM waiting_list 
WHERE created_at >= NOW() - INTERVAL '30 days'
GROUP BY date, source
ORDER BY date DESC;
```

### User Engagement Funnel
```sql
SELECT 
    action,
    COUNT(*) as occurrences,
    COUNT(DISTINCT email) as unique_users
FROM user_engagement 
WHERE created_at >= NOW() - INTERVAL '7 days'
GROUP BY action
ORDER BY occurrences DESC;
```

## Security Notes

- Row Level Security (RLS) is enabled on all tables
- Public access is configured for application use
- Consider adding user authentication for admin operations
- IP addresses are stored for analytics but should comply with privacy laws

## Backup Strategy

1. **Supabase Automatic Backups** - Enabled by default
2. **Manual Exports** - Use `pg_dump` for additional backups
3. **Migration History** - Keep all migration files in version control

## Monitoring

Monitor these metrics:
- Database size growth
- Query performance (use Supabase Dashboard)
- Connection pool usage
- Failed insertions (check logs)

## Troubleshooting

### Connection Issues
```bash
# Test connection
npx prisma db ping
```

### Schema Sync Issues
```bash
# Reset and sync from database
npx prisma db pull
npx prisma generate
```

### Migration Conflicts
```bash
# Reset migrations (dev only!)
npx prisma migrate reset
```