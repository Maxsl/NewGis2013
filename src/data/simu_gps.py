# -- coding:utf-8 --

#----------------------------------------------------------------------------#
#��ȡgps��¼���͵�das������
#----------------------------------------------------------------------------#

import socket,traceback,os,os.path,sys,time,struct,base64,gzip,array,threading,datetime

svcaddr=('localhost',58663)

#gps�ļ��ж���gps·��
def data_gpslog():		
	while True:
		try:
			sock = socket.socket()
			print 'dest host:',str(svcaddr)
			sock.connect(svcaddr)
			print 'connected with das server!',str(svcaddr)
			sock_ok = True
			file = open('gpslog2.txt')
			lines = file.readlines()
			for line in lines:
				sock.sendall(line)
				time.sleep(1.5)
			#return 
		except:
			traceback.print_exc()
			print 'socket invalid,retry..'			
			time.sleep(3)


data_gpslog()
#data_gpslog()