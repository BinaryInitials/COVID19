#!/bin/bash

ip=$1
curl -s "http://ip-api.com/"$ip | egrep "isp|countryCode|regionName|city|lon|lat" \
 | perl -pe 's/,//g' | perl -pe 's/.*://g' | perl -pe 's/^ //g' | perl -pe 's/"//g' | perl -pe 's/\n/|/g' \
 | awk -F\| '{print "<a style=\"text-decoration:none; color:green\" href=\"https://www.google.com/maps/place/"$4","$5"\"target=\"_blank\">"$3", "$2", "$1"</a> using <font color=\"#00CC77\">"$6"</font>"}' \
 | sed 's/\x1b\[[0-9;]*m//g' | perl -pe 's/\n//g'
