import sys
import os

commandType = sys.argv[1]
endpointURL = "http://slalomstalls.herokuapp.com/stall"

headers = {"Content-type":"application/json", "Accept":"application/json"}
open1_cmd = "curl -v -H \"Accept: application/json\" -H \"Content-type: application/json\" -X POST -d '{\"floor\": \"51\",\"bathroom\": \"Men\",\"stallName\": \"stall 1\",\"occupied\": false}' " + endpointURL
close1_cmd = "curl -v -H \"Accept: application/json\" -H \"Content-type: application/json\" -X POST -d '{\"floor\": \"51\",\"bathroom\": \"Men\",\"stallName\": \"stall 1\",\"occupied\": true}' " + endpointURL
open2_cmd = "curl -v -H \"Accept: application/json\" -H \"Content-type: application/json\" -X POST -d '{\"floor\": \"51\",\"bathroom\": \"Men\",\"stallName\": \"stall 2\",\"occupied\": false}' " + endpointURL
close2_cmd = "curl -v -H \"Accept: application/json\" -H \"Content-type: application/json\" -X POST -d '{\"floor\": \"51\",\"bathroom\": \"Men\",\"stallName\": \"stall 2\",\"occupied\": true}' " + endpointURL

if commandType == "open1":
	os.system(open1_cmd)
elif commandType == "open2":
	os.system(open2_cmd)
elif commandType == "close1":
	os.system(close1_cmd)
elif commandType == "close2":
	os.system(close2_cmd)