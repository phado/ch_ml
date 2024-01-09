
from airflow import DAG
from datetime import datetime, timedelta
from airflow.contrib.operators.kubernetes_pod_operator import KubernetesPodOperator
from airflow.operators.dummy_operator import DummyOperator
from kubernetes.client import models as k8s
#from airflow.providers.cncf.kubernetes.backcompat.volume import Volume
#from airflow.providers.cncf.kubernetes.backcompat.volume_mount import VolumeMount

default_args = {
    'owner': KG000-,
    'depends_on_past': False,
    'start_date': datetime.utcnow(),
    'email': ['airflow@example.com'],
    'email_on_failure': False,
    'email_on_retry': False,
    'retries': 0,
    'retry_delay': timedelta(minutes=3)
}

pvc_name = "airflow-pipeline-pvc"
volume_mount_path = "/mnt"


dag = DAG( KG000-MB01-sddfww-5 , default_args=default_args, schedule_interval=timedelta(minutes=5))

first_task = DummyOperator(task_id='first-task', dag=dag)

node_affinity = {
    'nodeAffinity': {
        'requiredDuringSchedulingIgnoredDuringExecution': {
            'nodeSelectorTerms': [{
                'matchExpressions': [{
                    'key': 'kubernetes.io/hostname',
                    'operator': 'In',
                    'values': ['deep-learning01']
                }]
            }]
        }
    }
}
second_task = KubernetesPodOperator(
    namespace='airflow',
    image="ultralytics/yolov5:mlflow",
    cmds=["bash", "-c"],
    arguments=[
        'python train.py --img 640         --batch 8         --epochs 10         --data /usr/src/app/data/coco128.yaml          --cfg ./models/yolov5s.yaml         --weights yolov5s.pt          --name KG000-MB01-sddfww-5         --project /mnt/train         --mlip "http://172.25.0.15:31101"         
    ],
    labels={"foo": "bar"},
    name="python-k8s-task",
    task_id="python-task",
    get_logs=True,
 #   volumes=[volume],
 #   volume_mounts=[volume_mount],
    affinity=node_affinity,
    dag=dag
)


first_task >> second_task
