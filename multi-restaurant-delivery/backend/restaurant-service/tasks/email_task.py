import redis
from rq import Queue, Worker, Connection

def send_email(to, subject, body):
    print(f"Sending email to {to}: {subject} - {body}")
    # send email logic

if __name__ == '__main__':
    redis_conn = redis.Redis(host='redis', port=6379)
    q = Queue('tasks', connection=redis_conn)
    with Connection(redis_conn):
        worker = Worker([q], name='py-worker')
        worker.work()
