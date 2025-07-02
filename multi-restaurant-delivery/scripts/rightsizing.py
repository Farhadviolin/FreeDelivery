import boto3, pandas as pd

def analyze_unattached_volumes():
    ec2 = boto3.client('ec2')
    vols = ec2.describe_volumes(Filters=[{'Name':'status','Values':['available']}])['Volumes']
    df = pd.json_normalize(vols)
    df.to_csv('reports/unattached_volumes.csv', index=False)
    print("Unattached volumes report generated.")

if __name__ == "__main__":
    analyze_unattached_volumes()
