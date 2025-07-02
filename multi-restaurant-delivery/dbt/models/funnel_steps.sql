with events as (
  select user_id, event_name, timestamp
  from {{ source('segment','events') }}
)
select
  user_id,
  max(case when event_name='impression' then timestamp end) as impression_time,
  max(case when event_name='add_to_cart' then timestamp end) as cart_time,
  max(case when event_name='purchase' then timestamp end) as purchase_time
from events
group by user_id;
