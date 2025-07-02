# carbon_calc.py
import pandas as pd

df = pd.read_csv('usage_metrics.csv')  # columns: timestamp, kWh
carbon_factor = 0.5  # kg CO2 per kWh
df['co2_kg'] = df['kWh'] * carbon_factor
monthly = df.resample('M', on='timestamp').sum()
print(monthly[['kWh','co2_kg']])
