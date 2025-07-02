select session_id, user_id, started_at, ended_at, revenue from {{ ref('raw_sessions') }}
