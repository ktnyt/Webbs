#!/usr/bin/env python 
import sys, os

# Get and parse a query string
query_string_key = 'QUERY_STRING'
if query_string_key in os.environ:
    query = cgi.parse_qs(os.environ[query_string_key])
else:
    query = {}
    
ID = ""
message_key = 'ID'
if message_key in query:
    ID = cgi.escape(query[message_key][0])

#Run Scripts
os.system("perl ./results/guest/"+ ID + "/merge_ecd_msec.pl result.txt" )

