#!/bin/bash
# build-openssl-pqc.sh
set -e

git clone https://github.com/open-quantum-safe/openssl.git || true
cd openssl
./config enable-oqs --prefix=/opt/openssl-pqc
make -j$(nproc)
sudo make install
