# Policy-Engine mit OPA/Casbin (statt Demo)
from fastapi import APIRouter, Depends, HTTPException
from casbin import Enforcer
import os

router = APIRouter()

model_conf = os.path.join(os.path.dirname(__file__), "model.conf")
policy_csv = os.path.join(os.path.dirname(__file__), "policy.csv")
enforcer = Enforcer(model_conf, policy_csv)

@router.get("/policy/check")
def check_policy(user: str, obj: str, act: str):
    if enforcer.enforce(user, obj, act):
        return {"allowed": True}
    raise HTTPException(status_code=403, detail="Forbidden")
