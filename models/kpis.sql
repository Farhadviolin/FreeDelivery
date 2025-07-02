with orders as (
  select
    date_trunc('day', created_at) as day,
    count(*) as total_orders,
    sum(total_amount) as revenue
  from {{ ref('orders') }}
  group by 1
)

select
  day,
  total_orders,
  revenue,
  lag(total_orders) over (order by day) as prev_orders,
  round(100.0 * (total_orders - prev_orders) / prev_orders, 2) as pct_change_orders
from orders
