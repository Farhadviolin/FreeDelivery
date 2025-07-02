# secure_sum.py
from phe import paillier

public_key, private_key = paillier.generate_paillier_keypair()
encrypted_vals = [public_key.encrypt(v) for v in [10,20,30]]
total_encrypted = encrypted_vals[0] + encrypted_vals[1] + encrypted_vals[2]
total = private_key.decrypt(total_encrypted)
print(f"Sum: {total}")  # 60
