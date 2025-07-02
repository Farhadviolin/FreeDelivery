import boto3
macie = boto3.client('macie2')
response = macie.create_classification_job(
    jobType='ONE_TIME',
    s3JobDefinition={'bucketDefinitions':[{'accountId':'123','buckets':['delivery-data']}], 'scoping':{}},
    name='pii-scan-20250701'
)
print(response)
