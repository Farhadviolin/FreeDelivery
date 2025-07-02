#!/usr/bin/env bash
circom zk/proof.circom --r1cs --wasm
snarkjs groth16 setup proof.r1cs pot12_final.ptau circuit_0000.zkey
snarkjs groth16 prove circuit_0000.zkey witness.wtns proof.json public.json
