'use server';
import fetch from 'node-fetch';

export async function getMenuByUser(userId: string) {
  const res = await fetch(`${process.env.PERSONAL_API}/personal/${userId}`);
  const { strategy } = await res.json();
  const MenuComp = strategy === 'high_propensity_recs' 
    ? (await import('./HighPropensityMenu')).default
    : (await import('./StandardMenu')).default;
  return MenuComp;
}
