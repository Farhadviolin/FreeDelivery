import asyncio, aiohttp, redis

r = redis.Redis()
async def run_campaign():
    users = r.zrangebyscore('user_propensity', 0.8, 1.0)
    async with aiohttp.ClientSession() as session:
        for uid in users:
            # send email via SendGrid API
            await session.post('https://api.sendgrid.com/v3/mail/send', json={
                'personalizations':[{'to':[{'email': get_email(uid)}]}],
                'template_id': 'd-campaign',
            }, headers={'Authorization': f'Bearer {SENDGRID_KEY}'})
