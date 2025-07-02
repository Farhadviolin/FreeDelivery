from fastapi import APIRouter, HTTPException, Request
from pydantic import BaseModel
from .locales import translate

router = APIRouter()

class PaymentRequest(BaseModel):
    order_id: int
    amount: float
    method: str  # e.g. 'stripe', 'paypal', 'mock'
    currency: str = 'EUR'

class PaymentResponse(BaseModel):
    status: str
    payment_url: str = None
    message: str = None

@router.post('/pay', response_model=PaymentResponse)
def pay(req: PaymentRequest, request: Request):
    lang = request.headers.get('accept-language', 'en').split(',')[0][:2]
    # Mock-Flow: Stripe/PayPal
    if req.method == 'stripe':
        # Hier Stripe-Integration (mock)
        return PaymentResponse(status='pending', payment_url='https://mock.stripe.com/pay/123', message=translate('payment_initiated', lang))
    elif req.method == 'paypal':
        return PaymentResponse(status='pending', payment_url='https://mock.paypal.com/pay/123', message=translate('payment_initiated', lang))
    elif req.method == 'mock':
        return PaymentResponse(status='success', message=translate('payment_success', lang))
    else:
        raise HTTPException(status_code=400, detail=translate('invalid_payment_method', lang))
