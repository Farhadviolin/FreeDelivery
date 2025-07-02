# mpc_share.py
import mpyc.runtime as mpc

secint = mpc.SecInt(32)
values = [10, 20, 30]
sec_vals = [secint(v) for v in values]
total = mpc.run(mpc.sum(sec_vals))
print(total)  # 60, securely computed
