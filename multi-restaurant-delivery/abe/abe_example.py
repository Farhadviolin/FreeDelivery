from openabe import OpenABE

# Setup authority and users
abe = OpenABE()
# Define policy e.g. "role:admin AND dept:finance"
policy = 'role:admin AND dept:finance'
public_params = abe.setup_policy(policy)
ciphertext = abe.encrypt(public_params, b"Sensitive Data", policy)
# Decryption using user keys matching policy
plaintext = abe.decrypt(public_params, ciphertext, user_secret_keys)
print(plaintext)
