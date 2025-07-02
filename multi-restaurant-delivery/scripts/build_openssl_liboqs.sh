#!/usr/bin/env bash
git clone --branch OQS-OpenSSL_3_1_0 https://github.com/open-quantum-safe/openssl.git
cd openssl
./config enable-oqs \
  --prefix=/usr/local/openssl-oqs \
  enable-tls1_3 enable-tests
make -j$(nproc)
make install
