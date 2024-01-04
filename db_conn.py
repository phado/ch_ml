"""
DB 커넥션 관리
"""
import mysql.connector.pooling
import dotenv
import os

dotenv_file = dotenv.find_dotenv()
dotenv.load_dotenv(dotenv_file)

def get_pool_conn():
    config = {
        'user':  'root'
        , 'password': 'root'
        , 'host':  '210.178.0.64'
        , 'port': '31401'
        , 'database': 'isamp_prj'
                }
    # Mariadb 커넥션 풀 설정
    mariadb_pool = mysql.connector.pooling.MySQLConnectionPool(pool_name="mypool", pool_size=5, **config)
    return mariadb_pool


def get_pool_conn_origin():
    config = {
        'user':  'root'
        , 'password': 'root'
        , 'host':  '210.178.0.64'
        , 'port': '31401'
        , 'database': 'isamp'
                }
    # Mariadb 커넥션 풀 설정
    mariadb_pool = mysql.connector.pooling.MySQLConnectionPool(pool_name="mypool_origin", pool_size=5, **config)
    return mariadb_pool