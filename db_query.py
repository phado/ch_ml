from common_management import make_response_json, success_message_json, fail_message_json
import postgres_curd
import db_conn

def aifflowdata(usr_id, usr_pwd):
    """
    회원 로그인
    :param mariadb_pool:
    :param usr_id:
    :param usr_pwd:
    :return:
    """
    try:
        db = postgres_curd.CRUD()
        # print(db.readDB(sql="select m.run_uuid, m.value,  r.status, r.start_time, r.end_time  from metrics as m inner join runs as r on m.run_uuid =r.run_uuid inner join experiments as e on r.experiment_id = e.experiment_id  where m.key  = 'mAP.5-.95' and e.name = 'yolov5';"))
        result_data=db.readDB(sql=f"select r.experiment_id ,r.name,m.run_uuid, r.start_time, m.value from metrics as m inner join runs as r on m.run_uuid =r.run_uuid inner join experiments as e on r.experiment_id = e.experiment_id  where m.key  = 'mAP.5-.95' and e.name ='yolov5';")

        print(result_data)
        print(f"http://210.178.0.65:31101/#/experiments/{result_data[0][0]}/runs/{result_data[0][2]}")
    except Exception as e:
        print(e)
        json_result = fail_message_json(e)
        

    return json_result



def db_ds_get_list(mariadb_pool):
    """
    데이터셋 목록 조회
    전체 조회
    group by tpd.ds_idx;"
    부분 조회
    where tpd.ds_idx={ds_idx} group by tpd.ds_idx;"
    output
    data[0] = 데이터셋 인덱스 
    data[1] = 데이터셋 이름
    data[2] = 타입(ex: [화재,끼임] )
    data[3] = 생성 시간
    data[4] = 수정 시간
    data[5] = 다운로드 시간
    """
    try:
        json_result = make_response_json([])

        connection = mariadb_pool.get_connection()
        cursor = connection.cursor()

        query = f"select tpd.ds_idx,tpd.ds_name, \
                GROUP_CONCAT(tdt.ds_type_name) as `ds_type_names`,\
                tpd.ds_create_date , tpd.ds_modify_date, tpd.ds_cnt_download\
                from tb_prj_dataset tpd\
                inner join tb_ds_state tds on tpd.ds_stat_idx  = tds.ds_stat_idx\
                inner join tb_ds_type_map tdtm on tdtm.ds_idx = tpd.ds_idx\
                inner join tb_ds_type tdt on tdtm.ds_type_idx =tdt.ds_type_idx\
                group by tpd.ds_idx ;"
                # where tpd.ds_idx={ds_idx} group by tpd.ds_idx;"

        cursor.execute(query)

        json_result['data'] = cursor.fetchall()

        json_result = success_message_json(json_result)
    except Exception as e:
        print(e)
        json_result = fail_message_json(json_result)

    finally:
        if cursor: cursor.close()
        if connection: connection.close()

        return json_result
    
def db_ds_get_detail(mariadb_pool, ds_idx):
    """
    데이터셋 상세정보 조회
    ds_idx
    """
    try:
        json_result = make_response_json([])

        connection = mariadb_pool.get_connection()
        cursor = connection.cursor()

        query = f"select tpd.ds_idx,GROUP_CONCAT(tdt.ds_type_name) as `ds_type_names`,\
                tpd.ds_create_date, tpd.ds_modify_date, tpd.ds_cnt_download ,tpd.ds_description\
                from tb_prj_dataset tpd\
                inner join tb_ds_state tds on tpd.ds_stat_idx  = tds.ds_stat_idx\
                inner join tb_ds_type_map tdtm on tdtm.ds_idx = tpd.ds_idx\
                inner join tb_ds_type tdt on tdtm.ds_type_idx =tdt.ds_type_idx\
                where tpd.ds_idx={ds_idx} group by tpd.ds_idx;"

        cursor.execute(query)

        json_result['data'] = cursor.fetchall()

        json_result = success_message_json(json_result)
    except Exception as e:
        print(e)
        json_result = fail_message_json(json_result)

    finally:
        if cursor: cursor.close()
        if connection: connection.close()

        return json_result
    
def db_ds_create(mariadb_pool, ds_name,ds_path,ds_description,company_idx,ds_type_idx):
    """
    데이터셋 생성
    ds_name 데이터셋 이름
    ds_path 데이터셋 경로[]
    ds_description 데이터셋 설명
    company_idx 실증 기업명
    ds_type_idx 데이터 타입
    """
    try:
        json_result = make_response_json([])

        connection = mariadb_pool.get_connection()
        cursor = connection.cursor()

        query = f"INSERT INTO tb_prj_dataset (ds_name, ds_path, ds_description, company_idx)\
            VALUES ('{ds_name}','{ds_path}','{ds_description}',{company_idx});"

        cursor.execute(query)
        query = f"SELECT LAST_INSERT_ID();"

        cursor.execute(query)
        data = cursor.fetchall()
        '''
        맵핑 테이블 에서 배열의 갯수만큼 아래 ds_type_idx가 맵핑 되어야함
        for 문 활용해 처리 예정
        '''
        query = f"INSERT INTO tb_ds_type_map\
                ( ds_idx, ds_type_idx)\
                VALUES('{data[0][0]}', '{ds_type_idx}');"
        cursor.execute(query)
        connection.commit()

        json_result = success_message_json(json_result)
    except Exception as e:
        print(e)
        json_result = fail_message_json(json_result)

    finally:
        if cursor: cursor.close()
        if connection: connection.close()

        return json_result

def db_ds_delete(mariadb_pool, ds_idx):
    """
    데이터셋 삭제
    ds_idx 데이터셋 idx
    """
    try:
        json_result = make_response_json([])

        connection = mariadb_pool.get_connection()
        cursor = connection.cursor()

        query = f"DELETE FROM tb_prj_dataset\
                WHERE ds_idx={ds_idx};"

        cursor.execute(query)
        connection.commit()

        json_result = success_message_json(json_result)
    except Exception as e:
        print(e)
        json_result = fail_message_json(json_result)

    finally:
        if cursor: cursor.close()
        if connection: connection.close()

        return json_result
    
"""
   학습데이터셋 관리
"""
def db_train_list(mariadb_pool):
    """
    학습 프로젝트 목록조회
    company_idx
    부분 조회
    where tpt.company_idx = {company_idx} ;"
    """
    try:
        json_result = make_response_json([])

        connection = mariadb_pool.get_connection()
        cursor = connection.cursor()

        query = f"select tpt.tr_idx ,tpt.tr_name ,ta.algo_name ,tts.tr_stat_nm_kr, tts.tr_stat_idx,\
                tpt.tr_create_date ,tpt.tr_map ,tpt.tr_deploy_cycle, tpt.tr_last_deploy_date, tpt.tr_description\
                from tb_prj_training tpt\
                left join tb_tr_state tts on tpt.tr_stat_idx =tts.tr_stat_idx \
                left join tb_algorithm ta on tpt.algo_idx =ta.algo_idx;"

        cursor.execute(query)
        json_result['data'] = cursor.fetchall()

        json_result = success_message_json(json_result)
    except Exception as e:
        print(e)
        json_result = fail_message_json(json_result)

    finally:
        if cursor: cursor.close()
        if connection: connection.close()

        return json_result
    
def db_train_detail(mariadb_pool, tr_idx):
    """
    학습 프로젝트 상세 정보 표시
    tr_idx
    """
    try:
        json_result = make_response_json([])

        connection = mariadb_pool.get_connection()
        cursor = connection.cursor()

        query = f"select trm.md_idx , trm.md_create_date ,\
                GROUP_CONCAT(distinct tdt.ds_type_name) as ds_type_names , trm.md_map , trm.md_mlflow\
                from tb_res_model trm\
                inner join tb_md_ds_map tmdm on trm.md_idx =tmdm.md_idx\
                inner join tb_prj_dataset tpd on tmdm.ds_idx = tpd.ds_idx\
                inner join tb_ds_type_map tdtm on tpd.ds_idx = tdtm.ds_idx\
                inner join tb_ds_type tdt on tdtm.ds_type_idx = tdt.ds_type_idx\
                where trm.tr_idx ={tr_idx} group by trm.md_idx;"

        cursor.execute(query)
        json_result['data'] = cursor.fetchall()

        json_result = success_message_json(json_result)
    except Exception as e:
        print(e)
        json_result = fail_message_json(json_result)

    finally:
        if cursor: cursor.close()
        if connection: connection.close()

        return json_result
    
def db_train_create(mariadb_pool,tr_name,tr_name_air,company_idx,tr_deploy_cycle,tr_description,ds_idx):
    """
    데이터셋 목록 조회
    tr_name  :학습 프로젝트 이름
    tr_name_air : airflow 경로
    company_idx : 회사 idx
    tr_deploy_cycle :학습 주기
    tr_description : 설명
    ds_idx : 데이터셋 
    """
    try:
        json_result = make_response_json([])

        connection = mariadb_pool.get_connection()
        cursor = connection.cursor()

        query = f"INSERT INTO tb_prj_training\
                ( tr_name, tr_name_air, company_idx, tr_deploy_cycle, tr_description)\
                VALUES('{tr_name}','{tr_name_air}','{company_idx}','{tr_deploy_cycle}','{tr_description}');"
                
        cursor.execute(query)
        query = f"SELECT LAST_INSERT_ID();"

        cursor.execute(query)
        data = cursor.fetchall()
        print(data)
                
        '''
        맵핑 테이블 에서 배열의 갯수만큼 아래 ds_type_idx가 맵핑 되어야함
        for 문 활용해 처리 예정
        # '''
        query = f"INSERT INTO tb_ds_tr_map\
                (tr_idx, ds_idx)\
                VALUES({data[0][0]}, {ds_idx});"
                
        cursor.execute(query)
        
        
        # """ 
        # 생성만 하는것 추후 airflow, mlflow주소등 데이터를 업데이트해야함 
        # """
                
        connection.commit()

        json_result = success_message_json(json_result)
    except Exception as e:
        print(e)
        json_result = fail_message_json(json_result)

    finally:
        if cursor: cursor.close()
        if connection: connection.close()

        return json_result

def db_train_delete(mariadb_pool, tr_idx):
    """
    학습 프로젝트 삭제
    tr_idx 학습 idx
    """
    try:
        json_result = make_response_json([])

        connection = mariadb_pool.get_connection()
        cursor = connection.cursor()

        query = f"DELETE FROM tb_prj_training\
                WHERE tr_idx = {tr_idx};"

        cursor.execute(query)
        connection.commit()

        json_result = success_message_json(json_result)
    except Exception as e:
        print(e)
        json_result = fail_message_json(json_result)

    finally:
        if cursor: cursor.close()
        if connection: connection.close()

        return json_result
    
def db_deploy_list(mariadb_pool):
    """
    배포 화면 리스트 
    data[i][0] = 서비스 idx
    data[i][1] = 서비스 이름
    data[i][2] = 타입
    data[i][3] = 상태
    data[i][4] = 생성시간
    data[i][5] = 수정일
    
    
    """
    try:
        json_result = make_response_json([])

        connection = mariadb_pool.get_connection()
        cursor = connection.cursor()

        query = f"select ts.svc_idx, ts.svc_name ,tst.svc_type_name ,tss.svc_stat_nm_kr, ts.svc_create_date ,ts.svc_modifiy_date\
                from tb_service ts\
                left join tb_svc_state tss on ts.svc_stat_idx  = tss.svc_stat_idx\
                left join tb_svc_type tst on ts.svc_type_idx = tst.svc_type_idx;"
                # where ts.company_idx = {company_idx};"

        cursor.execute(query)
        json_result['data'] = cursor.fetchall()
        connection.commit()

        json_result = success_message_json(json_result)
        
    except Exception as e:
        print(e)
        json_result = fail_message_json(json_result)

    finally:
        if cursor: cursor.close()
        if connection: connection.close()

        return json_result
    
def db_deploy_detail(mariadb_pool, svc_idx):
    """
    배포 서비스 상세정보
    svc_idx
    data[i][0]서비스 명
    data[i][1]재해유형 타입
    data[i][2]재해유형 이름
    data[i][3]모델 idx
    data[i][4]모델 이름
    data[i][5]cctv
    """
    try:
        json_result = make_response_json([])

        connection = mariadb_pool.get_connection()
        cursor = connection.cursor()

        query = f"SELECT ts.svc_name, tst.svc_type_idx, tst.svc_type_name,trm.md_idx ,trm.md_name ,ts.svc_cctv\
                from tb_service ts\
                left join tb_svc_type tst on ts.svc_type_idx = tst.svc_type_idx\
                left join tb_res_model trm on ts.md_idx = trm.md_idx\
                where ts.svc_idx = {svc_idx} ;"

        cursor.execute(query)
        json_result['data'] = cursor.fetchall()
        connection.commit()

        json_result = success_message_json(json_result)
    except Exception as e:
        print(e)
        json_result = fail_message_json(json_result)

    finally:
        if cursor: cursor.close()
        if connection: connection.close()

        return json_result
    
    
def db_cctv_list(mariadb_pool):
    """
    카메라 리스트 정보
    data[0]=기업코드
    data[1]=기업이름
    data[2]=공장이름
    data[3]=공장코드
    data[4]=레드존이름
    data[5]=레드존코드
    data[6]=cctv이름
    data[7]=cctv url
    data[8]=cctv 원본

    """
    try:
        json_result = make_response_json([])

        connection = mariadb_pool.get_connection()
        cursor = connection.cursor()

        query = f"SELECT \
                E.cp_code, E.cp_name, D.wp_name, D.wp_code, B.rz_name, B.rz_code, C.cctv_name, C.cctv_url, C.cctv_url_raw, C.cctv_description, A.rz_cctv_idx, C.cctv_idx, B.rz_idx\
                FROM tbl_rel_redzone_cctv AS A \
                LEFT JOIN tbl_info_redzone AS B ON B.rz_idx = A.rz_idx \
                LEFT JOIN tbl_info_cctv AS C ON C.cctv_idx = A.cctv_idx \
                LEFT JOIN tbl_info_work_place AS D ON D.wp_idx = B.wp_idx \
                LEFT JOIN tbl_info_company AS E ON E.cp_idx = D.cp_idx;"

        cursor.execute(query)
        json_result['data'] = cursor.fetchall()
        connection.commit()

        json_result = success_message_json(json_result)
    except Exception as e:
        print(e)
        json_result = fail_message_json(json_result)

    finally:
        if cursor: cursor.close()
        if connection: connection.close()

        return json_result
    
def db_acc_result(mariadb_pool):
    """
    재해 로그 정보
    data[0]=기업이름
    data[1]=공장이름 
    data[2]=레드존
    data[3]=재해유형
    data[4]=스냅샷
    data[5]=발생시간
    """
    try:
        json_result = make_response_json([])

        connection = mariadb_pool.get_connection()
        cursor = connection.cursor()

        query = f"SELECT tic2.cp_name ,tiwp.wp_name ,tir.rz_name, tia.acc_name1, TO_BASE64(ttar.cctv_sanpshot),ttar.acc_detection_time \
                FROM tbl_trend_analysis_result AS ttar\
                LEFT JOIN tbl_rel_redzone_accident AS trra ON trra.rz_acc_idx  = ttar.rz_acc_idx\
                LEFT JOIN tbl_info_accident AS tia ON trra.acc_idx   = tia.acc_idx \
                LEFT JOIN tbl_info_redzone AS tir ON trra.acc_idx  = tir.rz_idx \
                LEFT JOIN tbl_info_work_place AS tiwp ON tir.wp_idx  = tiwp.wp_idx\
                LEFT JOIN tbl_info_company AS tic2 ON tiwp.cp_idx  = tic2.cp_idx \
                LEFT JOIN tbl_rel_redzone_cctv AS trrc ON ttar.rz_cctv_idx = trrc.rz_cctv_idx\
                LEFT JOIN tbl_info_cctv AS tic ON trrc.cctv_idx = tic.cctv_idx \
                LEFT JOIN tbl_rel_redzone_sensor_data AS trrsd ON ttar.rz_sen_dt_idx  = trrsd.rz_sen_dt_idx \
                LEFT JOIN tbl_info_sensor_data AS tisd ON trrsd.sen_dt_idx =tisd.sen_dt_idx \
                LEFT JOIN tbl_rel_redzone_sensor AS trrs ON trrsd.rz_sen_idx  = trrs.rz_sen_idx \
                LEFT JOIN tbl_info_sensor  AS tis ON trrs.sen_idx  = tis.sen_idx LIMIT 300;"

        cursor.execute(query)
        json_result['data'] = cursor.fetchall()
        connection.commit()

        json_result = success_message_json(json_result)
    except Exception as e:
        print(e)
        json_result = fail_message_json(json_result)

    finally:
        if cursor: cursor.close()
        if connection: connection.close()

        return json_result



def db_agency_result(mariadb_pool):
    """
    기업 리스트 정보
    data[0]=기업이름
    data[1]=공장이름
    data[2]=레드존
    data[3]=재해유형
    data[4]=스냅샷
    data[5]=발생시간
    """
    try:
        json_result = make_response_json([])

        connection = mariadb_pool.get_connection()
        cursor = connection.cursor()

        query = f"SELECT cp_name from tbl_info_company;"

        cursor.execute(query)
        json_result['data'] = cursor.fetchall()
        connection.commit()

        json_result = success_message_json(json_result)
    except Exception as e:
        print(e)
        json_result = fail_message_json(json_result)

    finally:
        if cursor: cursor.close()
        if connection: connection.close()

        return json_result




if __name__ == "__main__":
    import db_conn

    mariadb_pool = db_conn.get_pool_conn()
    mariadb_pool_origin = db_conn.get_pool_conn_origin()
    # print(db_ds_create(mariadb_pool,'asdjjjjj','/temp/data','ds_description','1','3'))
    # print(db_ds_get_list(mariadb_pool))
    # print(db_ds_get_detail(mariadb_pool,1))
    # print(db_ds_delete(mariadb_pool,27))
    # print(db_train_list(mariadb_pool))
    # print(db_train_detail(mariadb_pool,1))
    # print(db_train_create(mariadb_pool,1))
    # print(db_train_create(mariadb_pool,'sample test1','tr_name_airaaa','1','20',"descrition",'1'))
    # print(db_train_delete(mariadb_pool,'3'))
    # print(db_deploy_list(mariadb_pool))
    # print(db_deploy_detail(mariadb_pool,'0'))
    # print(db_acc_result(mariadb_pool_origin))
    # print(db_cctv_list(mariadb_pool_origin))
    
    
    
    
    
    
    # mariadb_pool, ds_name,ds_path,ds_description,company_idx,ds_idx,ds_type_idx
