import json
import yaml

prj_info = {'prj_name' : 'dsdfdd', 'model_name' : 'sddfww' , 'prj_key' : 5 }

mx_cell_mapper = {'43': {'type': 'Image-Data', 'data': {'image1SelectedValue': '카테1', 'image2SelectedValue': '서브카테3', 'image1InputValue': 'dfdfdfdfd'}}, '44': {'type': 'Object-Detection', 'data': {'weights': 'ddgf', 'cfg': 'dssd', 'data-class': 'dssd', 'hyp': '51', 'epochs': ' 30', 'batch-size': '', 'imgsz': 'ddgf', 'resume': 'dssd', 'optimizer': 'dssd', 'label-smoothing': '', 'freeze': ' epochs'}}, '48': {'type': 'Image-Data', 'data': {'image1SelectedValue': '카테2', 'image2SelectedValue': '서브카테2', 'image1InputValue': '2'}}, '50': {'type': 'Image-Data', 'data': {'image1SelectedValue': '카테3', 'image2SelectedValue': '서브카테3', 'image1InputValue': '3'}}}

mx_arrow_mapper = {'47': {'id': '47', 'MxObjId': 'mxCell#29', 'source': '43', 'target': '44'}, '49': {'id': '49', 'MxObjId': 'mxCell#32', 'source': '48', 'target': '44'}, '51': {'id': '51', 'MxObjId': 'mxCell#34', 'source': '50', 'target': '44'}}

# 파일 생성에 필요한 변수 정리



# data.yaml 파일 생성

# pretrained 모델 생성

# data/hyps/hyp.scratch-low.yaml 파일 생성



#파이썬 파일 생성 하는 곳

file_content = """
from airflow import DAG
from datetime import datetime, timedelta
from airflow.contrib.operators.kubernetes_pod_operator import KubernetesPodOperator
from airflow.operators.dummy_operator import DummyOperator
from kubernetes.client import models as k8s
#from airflow.providers.cncf.kubernetes.backcompat.volume import Volume
#from airflow.providers.cncf.kubernetes.backcompat.volume_mount import VolumeMount

default_args = {
    'owner': '""" +'KG000'+ """',
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


dag = DAG( '"""+'KG000-'+ 'MB01-' + prj_info['model_name']+ '-' + str(prj_info['prj_key']) + """' , default_args=default_args, schedule_interval=timedelta(minutes=5))

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
        'python train.py --img 640 \
        --batch 8 \
        --epochs 10 \
        --data /usr/src/app/data/coco128.yaml  \
        --cfg ./models/yolov5s.yaml \
        --weights yolov5s.pt  \
        --name """ +'KG000-'+ 'MB01-' + prj_info['model_name']+ '-' + str(prj_info['prj_key']) + """ \
        --project /mnt/train \
        --mlip "http://172.25.0.15:31101" '
        
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
"""

file_path = 'airflow-'+prj_info['model_name']+ '-' + str(prj_info['prj_key'])+".py"

with open(file_path, "w") as file:
    file.write(file_content)

# print(f"File '{file_path}' created successfully.")