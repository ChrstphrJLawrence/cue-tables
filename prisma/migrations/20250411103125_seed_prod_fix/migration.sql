-- Delete existing conflicting connection (if needed)
DELETE FROM Connection WHERE userId = 'cm9cj99o30000aow03581bpgd';

-- Make sure Password exists
INSERT OR REPLACE INTO Password VALUES (
  '$2b$10$1SX4QdqRU4OcfK3KA.qbY.Kl7w2/1jR1.bWguC4RbLgGFKaOLQq6e', 
  'cm9cj99o30000aow03581bpgd'
);
