#!/bin/bash

url=$1
filename=$2
echo "x,y" > $filename
curl -s $url | perl -pe 's/></>\n</g' | egrep "(display: *inline-block)|(colspan=\"2\" style=\"padding-left)" | perl -pe 's/<[^>]+>//g' | perl -pe 's/,//g' | perl -pe 's/\n/@/g' | perl -pe 's/\(/\n/g' | perl -pe 's/.*\)//g' | perl -pe 's/^@+//g' | perl -pe 's/@+/,/g' | perl -pe 's/,$//g' | egrep -v "^$" | egrep "^20" >> $filename