import { NextRequest, NextResponse } from 'next/server';
import { getFlags } from '../utils/flags';

export async function middleware(req: NextRequest) {
  const flags = await getFlags();
  const res = NextResponse.next();
  res.cookies.set('newCheckout', flags.newCheckout.toString());
  return res;
}
