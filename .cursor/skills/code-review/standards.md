# Code Review Standards

## Security Checklist

- [ ] No SQL injection vulnerabilities (use parameterized queries)
- [ ] No XSS vulnerabilities (sanitize user input, escape output)
- [ ] No hardcoded secrets, API keys, or credentials
- [ ] Authentication checks on protected routes
- [ ] Authorization checks for resource access
- [ ] Input validation on all external data
- [ ] Secure token storage (httpOnly cookies, not localStorage)
- [ ] HTTPS enforced for sensitive data

## Performance Checklist

- [ ] No N+1 query patterns
- [ ] Appropriate use of pagination
- [ ] No unnecessary database calls in loops
- [ ] Proper indexing for queried fields
- [ ] Memoization for expensive calculations
- [ ] Lazy loading where appropriate
- [ ] No memory leaks (cleanup subscriptions, listeners)

## Code Quality Checklist

- [ ] Functions are single-purpose and focused
- [ ] No functions longer than 50 lines
- [ ] Clear, descriptive variable/function names
- [ ] No magic numbers (use named constants)
- [ ] Proper error handling with meaningful messages
- [ ] No deeply nested conditionals (max 3 levels)
- [ ] DRY - no duplicated logic
- [ ] SOLID principles followed

## Testing Checklist

- [ ] Unit tests for business logic
- [ ] Edge cases covered
- [ ] Error paths tested
- [ ] Mocks used appropriately
- [ ] Tests are deterministic (no flaky tests)
- [ ] Test names describe behavior

## Documentation Checklist

- [ ] Public APIs have JSDoc/docstrings
- [ ] Complex logic has explanatory comments
- [ ] README updated if needed
- [ ] Breaking changes documented
