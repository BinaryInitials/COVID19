#!/bin/bash

echo "x,y" > data.json
curl -s "https://en.wikipedia.org/wiki/2020_coronavirus_outbreak_in_the_United_States" | egrep -A1000000 "New cases.# and" | egrep -B1000000 "Sources:" | egrep -v "New cases" | egrep "&#160;" | perl -pe 's/<[^>]+>//g' | perl -pe 's/&.*//g' | awk '{print NR","$0}' >> data.json
