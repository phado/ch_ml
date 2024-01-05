import json
import yaml

# 파일 생성에 필요한 변수 정리
name = 'dddd'


# data.yaml 파일 생성

# pretrained 모델 생성

# data/hyps/hyp.scratch-low.yaml 파일 생성



#파이썬 파일 생성 하는 곳

file_content = """
    cmds=['""" + name + """'],
    arguments=[
        'python train.py --img {{ dag_run.conf.train_img | d("640") }} \
        --batch {{ dag_run.conf.train_batch | d("2") }} \
        --epochs {{ dag_run.conf.train_epochs | d("1") }} \
        --data /usr/src/app/data/coco128.yaml  \
        --cfg ./models/yolov5s.yaml \
        --weights yolov5s.pt  \
        --name mask_yolo_result \
        --project /mnt/train \
        --mlip {{ dag_run.conf.mlflow_ip | d("http://172.25.0.15:31101")}} \
        #--minioip {{ dag_run.conf.minio_ip | d("http://211.46.241.212:9900")}} \
        #--minioid {{ dag_run.conf.minio_id | d("minio")}} \
        #--miniopw {{ dag_run.conf.minio_pw | d("minio123")}}'
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

file_path = "dag.py"

with open(file_path, "w") as file:
    file.write(file_content)

print(f"File '{file_path}' created successfully.")