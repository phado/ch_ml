
import psycopg2
import dotenv
import os


dotenv_file = dotenv.find_dotenv()
dotenv.load_dotenv(dotenv_file)


database_host = os.getenv("POSTGRES_DB_IP")
database_port = os.getenv("POSTGRES_DB_PORT")
database_user = os.getenv("POSTGRES_DB_USER")
database_pw = os.getenv("POSTGRES_DB_PASSWORD")
database_database = os.getenv("POSTGRES_DB_DATABASE")

maria_database_host = os.getenv("MARIA_DB_IP")
maria_database_port = os.getenv("MARIA_DB_PORT")
maria_database_user = os.getenv("MARIA_DB_USER")
maria_database_pw = os.getenv("MARIA_DB_PASSWORD")




class Databases():
    def __init__(self):
        self.db = psycopg2.connect(host=database_host, dbname=database_database,user=database_user,password=database_pw,port=database_port)
        self.cursor = self.db.cursor()

    def __del__(self):
        self.db.close()
        self.cursor.close()

    def execute(self,query,args={}):
        self.cursor.execute(query,args)
        row = self.cursor.fetchall()
        return row

    def commit(self):
        self.cursor.commit()
        

class CRUD(Databases):
    def insertDB(self,sql):
        # sql = " INSERT INTO {schema}.{table}({colum}) VALUES ('{data}') ;".format(schema=schema,table=table,colum=colum,data=data)
        try:
            self.cursor.execute(sql)
            self.db.commit()
        except Exception as e :
            print(" insert DB err ",e)
        # finally:
        #     self.cursor.close()
        #     self.db.close()
    
    def readDB(self,sql):
        # sql = " SELECT {colum} from {schema}.{table}".format(colum=colum,schema=schema,table=table)
        try:
            self.cursor.execute(sql)
            result = self.cursor.fetchall()
        except Exception as e :
            result = (" read DB err",e)
        # finally:
        #     self.cursor.close()
        #     self.db.close()
        
        return result

    def updateDB(self,sql):
        # sql = " UPDATE {schema}.{table} SET {colum}='{value}' WHERE {colum}='{condition}' ".format(schema=schema    , table=table , colum=colum ,value=value,condition=condition )
        try :
            self.cursor.execute(sql)
            self.db.commit()
        except Exception as e :
            print(" update DB err",e)
        # finally:
        #     self.cursor.close()
        #     self.db.close()

    def deleteDB(self,sql):
        # sql = " delete from {schema}.{table} where {condition} ; ".format(schema=schema,table=table,  condition=condition)
        try :
            self.cursor.execute(sql)
            self.db.commit()
        except Exception as e:
            print( "delete DB err", e)
        # finally:
        #     self.cursor.close()
        #     self.db.close()
        
class Maria_Databases():
    def __init__(self):
        self.db = psycopg2.connect(host=maria_database_host, user=maria_database_user,password=maria_database_pw,port=maria_database_port)
        self.cursor = self.db.cursor()

    def __del__(self):
        self.db.close()
        self.cursor.close()

    def execute(self,query,args={}):
        self.cursor.execute(query,args)
        row = self.cursor.fetchall()
        return row

    def commit(self):
        self.cursor.commit()
        

class Maria_CRUD(Maria_Databases):
    def insertDB(self,sql):
        # sql = " INSERT INTO {schema}.{table}({colum}) VALUES ('{data}') ;".format(schema=schema,table=table,colum=colum,data=data)
        try:
            self.cursor.execute(sql)
            self.db.commit()
        except Exception as e :
            print(" insert DB err ",e)
        finally:
            if self.cursor: self.cursor.close()
            if self.db: self.db.close()
    
    def readDB(self,sql):
        # sql = " SELECT {colum} from {schema}.{table}".format(colum=colum,schema=schema,table=table)
        try:
            self.cursor.execute(sql)
            result = self.cursor.fetchall()
        except Exception as e :
            result = (" read DB err",e)
        finally:
            if self.cursor: self.cursor.close()
            if self.db: self.db.close()
        
        return result

    def updateDB(self,sql):
        # sql = " UPDATE {schema}.{table} SET {colum}='{value}' WHERE {colum}='{condition}' ".format(schema=schema    , table=table , colum=colum ,value=value,condition=condition )
        try :
            self.cursor.execute(sql)
            self.db.commit()
        except Exception as e :
            print(" update DB err",e)
        finally:
            if self.cursor: self.cursor.close()
            if self.db: self.db.close()

    def deleteDB(self,sql):
        # sql = " delete from {schema}.{table} where {condition} ; ".format(schema=schema,table=table,  condition=condition)
        try :
            self.cursor.execute(sql)
            self.db.commit()
        except Exception as e:
            print( "delete DB err", e)
        finally:
            if self.cursor: self.cursor.close()
            if self.db: self.db.close()
            
