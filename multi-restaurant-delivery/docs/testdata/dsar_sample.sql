INSERT INTO dsar_requests (subject_id, request_type, status) VALUES
  ('user1', 'access', 'pending'),
  ('user2', 'deletion', 'completed');

INSERT INTO dsar_audit (request_id, action, details) VALUES
  (1, 'created', '{"by": "user1"}'),
  (2, 'completed', '{"by": "admin"}');
