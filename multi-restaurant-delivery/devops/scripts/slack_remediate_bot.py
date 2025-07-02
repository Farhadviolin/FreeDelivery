# slack_remediate_bot.py
import os, json
from flask import Flask, request
import requests

SLACK_TOKEN = os.environ.get('SLACK_BOT_TOKEN')
SLACK_CHANNEL = os.environ.get('SLACK_CHANNEL', '#ops-alerts')

app = Flask(__name__)

@app.route('/slack/alert', methods=['POST'])
def slack_alert():
    alert = json.loads(request.data)[0]
    msg = f"*Self-Healing Alert*: Pod `{alert['labels']['pod']}` in `{alert['labels']['namespace']}` needs remediation."
    requests.post('https://slack.com/api/chat.postMessage',
        headers={'Authorization': f'Bearer {SLACK_TOKEN}'},
        json={'channel': SLACK_CHANNEL, 'text': msg})
    return '', 204

@app.route('/slack/command', methods=['POST'])
def slack_command():
    data = request.form
    if data.get('command') == '/heal':
        pod = data.get('text')
        # Trigger remediation (could call remediate.py endpoint)
        requests.post('https://functions.delivery.com/remediate',
                      json=[{'labels': {'namespace': 'delivery', 'pod': pod}}])
        return f'Remediation triggered for pod {pod}', 200
    return '', 400

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8081)
