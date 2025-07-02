# healing_operator.py
import kopf, kubernetes
@kopf.on.startup()
def configure(settings: kopf.OperatorSettings, **_):
    settings.posting.level = 'INFO'

@kopf.timer('pod', labels={'app':'delivery'}, interval=300)
def heal_pods(namespace, logger, **_):
    v1 = kubernetes.client.CoreV1Api()
    pods = v1.list_namespaced_pod(namespace)
    for pod in pods.items:
        if pod.status.container_statuses[0].restart_count > 5:
            logger.info(f"Healing pod {pod.metadata.name}")
            v1.delete_namespaced_pod(pod.metadata.name, namespace)
