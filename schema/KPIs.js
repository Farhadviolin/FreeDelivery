cube(`KPIs`, {
  sql: `select * from public.kpis`,

  measures: {
    totalOrders: { sql: `total_orders`, type: `sum` },
    totalRevenue: { sql: `revenue`, type: `sum` }
  },
  dimensions: {
    day: { sql: `day`, type: `time` }
  }
});
