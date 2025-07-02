#!/usr/bin/env bash
git tag v1.0-final
docker image tag registry.delivery.com/* registry.archive.delivery.com/project-final/
aws s3 sync ./docs s3://delivery-project-archive/docs --acl private
aws s3 cp scripts/archive_project.sh s3://delivery-project-archive/scripts/
echo "Projekt archiviert unter s3://delivery-project-archive/"
