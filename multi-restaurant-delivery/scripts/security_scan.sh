#!/bin/bash
trivy fs --exit-code 1 --severity HIGH,CRITICAL .
dependency-check.sh --project myapp --scan ./src
