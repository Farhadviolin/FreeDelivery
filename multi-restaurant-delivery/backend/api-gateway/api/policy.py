# Simple Policy Engine (Demo, erweiterbar)
from typing import Dict

# Example: user_policies[username] = {"role": "admin", "tenant": "tenant1"}
user_policies: Dict[str, Dict] = {}

def has_role(user, role):
    return user and user.get("role") == role

def has_tenant(user, tenant):
    return user and user.get("tenant") == tenant

def can_access(user, resource_tenant):
    # Only allow access if user is in same tenant (multi-tenancy)
    return has_tenant(user, resource_tenant) or has_role(user, "admin")
