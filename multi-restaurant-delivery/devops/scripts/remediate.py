# remediate.py
import os, subprocess, json
from flask import Flask, request
app = Flask(__name__)

@app.route('/remediate', methods=['POST'])
def remediate():
    alert = json.loads(request.data)[0]
    namespace = alert['labels']['namespace']
    pod = alert['labels']['pod']
    # Beispiel: Neustart des Pods
    cmd = ['kubectl', 'delete', 'pod', pod, '-n', namespace]
    subprocess.run(cmd, check=True)
    return '', 204

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8080)
