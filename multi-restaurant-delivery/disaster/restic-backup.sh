#!/usr/bin/env bash
export RESTIC_REPOSITORY=s3:s3.amazonaws.com/delivery-backups/restic
export AWS_ACCESS_KEY_ID=...
export AWS_SECRET_ACCESS_KEY=...
restic init
restic backup /etc/ansible /opt/app/config --tag etc-ansible
restic forget --prune --keep-daily 7 --keep-weekly 4 --keep-monthly 6
