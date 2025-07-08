# Database Deployment Guide

This guide covers how to deploy and maintain your database schema across environments while ensuring compatibility with future updates.

## Quick Setup (First Time)

### 1. Install Additional Dependencies
```bash
npm install tsx --save-dev
```

### 2. Set Up Environment Variables
```env
# .env.local
DATABASE_URL="postgresql://postgres:[password]@[project-ref].supabase.co:5432/postgres?pgbouncer=true&connection_limit=1"
DIRECT_URL="postgresql://postgres:[password]@[project-ref].supabase.co:5432/postgres"
NEXT_PUBLIC_SUPABASE_URL="https://[project-ref].supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="[your-anon-key]"
```

### 3. Initial Database Setup
```bash
# Option A: Run SQL directly in Supabase Dashboard
# Copy db/schema.sql and run in SQL Editor

# Option B: Use Prisma to push schema
npm run db:push

# Generate Prisma client
npm run db:generate
```

## Development Workflow

### Making Schema Changes

1. **Update Prisma Schema** (`prisma/schema.prisma`)
2. **Push to Development Database**:
   ```bash
   npm run db:push
   ```
3. **Test Your Changes**
4. **Create Migration for Production**:
   ```bash
   npm run db:migrate -- --name "descriptive_name"
   ```

### Working with Migrations

```bash
# Create new migration
npm run db:migrate -- --name "add_user_preferences"

# Apply migrations to production
npm run db:migrate:deploy

# Reset database (dev only!)
npx prisma migrate reset

# View your data
npm run db:studio
```

## Production Deployment

### Environment Setup

1. **Production Database URLs**:
   - Use connection pooling URL for `DATABASE_URL`
   - Use direct connection URL for `DIRECT_URL`

2. **Deploy Migrations**:
   ```bash
   npm run db:migrate:deploy
   ```

3. **Verify Deployment**:
   ```bash
   npx prisma db pull
   ```

## Compatibility Strategy

### For Future Updates

1. **Backward Compatible Changes**:
   - Adding new tables ✅
   - Adding nullable columns ✅
   - Adding indexes ✅
   - Creating new views ✅

2. **Breaking Changes** (requires coordination):
   - Renaming columns ⚠️
   - Dropping tables ⚠️
   - Changing data types ⚠️
   - Adding non-nullable columns ⚠️

### Migration Best Practices

1. **Always Test First**:
   ```bash
   # Test on development
   npm run db:push
   
   # If good, create production migration
   npm run db:migrate -- --name "feature_name"
   ```

2. **Use Descriptive Migration Names**:
   ```bash
   # Good
   npm run db:migrate -- --name "add_user_preferences_table"
   
   # Bad
   npm run db:migrate -- --name "update"
   ```

3. **Keep Manual SQL Migrations**:
   - Store complex migrations in `db/migrations/`
   - Document what they do and when to run them

### Rollback Strategy

1. **Prisma Migrations**:
   ```bash
   # View migration history
   npx prisma migrate status
   
   # Mark migration as rolled back
   npx prisma migrate resolve --rolled-back [migration_name]
   ```

2. **Manual Rollbacks**:
   - Keep rollback SQL scripts in `db/rollbacks/`
   - Test rollback procedures regularly

## Monitoring and Maintenance

### Performance Monitoring

1. **Query Performance**:
   - Use Supabase Dashboard > Logs
   - Monitor slow queries
   - Add indexes as needed

2. **Database Size**:
   - Monitor table sizes
   - Set up alerts for rapid growth
   - Plan archiving strategy

### Regular Maintenance

1. **Weekly Tasks**:
   - Review query performance
   - Check error logs
   - Verify backup integrity

2. **Monthly Tasks**:
   - Analyze query patterns
   - Optimize indexes
   - Clean up old data if needed

3. **Quarterly Tasks**:
   - Review and update schemas
   - Performance audit
   - Security review

## Backup and Recovery

### Automated Backups
- Supabase provides automatic backups
- Configure backup retention policy
- Test recovery procedures

### Manual Exports
```bash
# Export schema
pg_dump -s $DATABASE_URL > backup_schema.sql

# Export data
pg_dump -a $DATABASE_URL > backup_data.sql

# Full backup
pg_dump $DATABASE_URL > full_backup.sql
```

### Recovery Testing
```bash
# Test restore on development database
psql $DEV_DATABASE_URL < backup.sql
```

## Security Considerations

### Access Control
- Use least privilege principle
- Separate dev/staging/prod access
- Regular access audits

### Data Protection
- Enable RLS (Row Level Security)
- Encrypt sensitive data
- Log access patterns

### Compliance
- GDPR compliance for EU users
- Data retention policies
- User data deletion procedures

## Troubleshooting

### Common Issues

1. **Migration Conflicts**:
   ```bash
   # Reset migrations (dev only)
   npx prisma migrate reset
   
   # Or resolve manually
   npx prisma migrate resolve --applied [migration_name]
   ```

2. **Schema Drift**:
   ```bash
   # Pull current schema
   npx prisma db pull
   
   # Generate new client
   npm run db:generate
   ```

3. **Connection Issues**:
   ```bash
   # Test connection
   npx prisma db ping
   
   # Check environment variables
   echo $DATABASE_URL
   ```

### Support Resources

- [Prisma Documentation](https://www.prisma.io/docs)
- [Supabase Documentation](https://supabase.com/docs)
- Project issue tracker for database-specific problems

## Future-Proofing Checklist

- [ ] All migrations are version controlled
- [ ] Environment variables are documented
- [ ] Rollback procedures are tested
- [ ] Performance baselines are established
- [ ] Monitoring is set up
- [ ] Backup/recovery is tested
- [ ] Team has access to necessary tools
- [ ] Documentation is up to date