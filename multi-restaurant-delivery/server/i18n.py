from fastapi import Request
from starlette.middleware.base import BaseHTTPMiddleware
import babel.support

class LocaleMiddleware(BaseHTTPMiddleware):
    async def dispatch(self, request: Request, call_next):
        lang = request.headers.get('Accept-Language','de').split(',')[0]
        translations = babel.support.Translations.load('locales', [lang], domain='messages')
        request.state.translations = translations
        return await call_next(request)
