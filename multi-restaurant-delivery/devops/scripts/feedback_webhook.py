# feedback_webhook.py
from flask import Flask, request
import jira, os

app = Flask(__name__)
jira_client = jira.JIRA(server='https://jira.company.com', token_auth=os.environ.get('JIRA_TOKEN'))

@app.route('/feedback', methods=['POST'])
def feedback():
    data = request.json
    jira_client.create_issue(project='DEL', summary=data['subject'], description=data['message'], issuetype={'name':'Feedback'})
    return '', 201

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=8083)
