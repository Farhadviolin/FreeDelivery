from flask import Flask, request
from selenium import webdriver

app = Flask(__name__)

@app.route('/cobrowse/start', methods=['POST'])
def start():
    session_id = request.json['sessionId']
    driver = webdriver.Chrome()
    driver.get('https://app.delivery.com')
    # expose WebSocket to push DOM differences
    return {'status':'started','sessionId':session_id}
