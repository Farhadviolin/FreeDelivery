from tfhe import fhe

client_key, eval_key = fhe.keygen()
ct1 = fhe.encrypt( client_key, 5 )
ct2 = fhe.encrypt( client_key, 7 )
ct_sum = fhe.add( eval_key, ct1, ct2 )
print("Sum:", fhe.decrypt(client_key, ct_sum))  # 12
