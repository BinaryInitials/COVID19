#!/bin/bash

echo "x,y" > data_us.json
echo "x,y" > data_fr.json
echo "x,y" > data_it.json
echo "x,y" > data_ir.json
echo "x,y" > data_sp.json
echo "x,y" > data_jp.json
echo "x,y" > data_ge.json
echo "x,y" > data_sk.json

curl -s "https://en.wikipedia.org/wiki/2020_coronavirus_pandemic_in_the_United_States" | perl -pe 's/></>\n</g' | egrep "(display: inline-block;)|(colspan=\"2\" style=\"padding-left:)" | perl -pe 's/<[^>]+>//g' | perl -pe 's/^$/@/g' | perl -pe 's/\n/|/g' | perl -pe 's/@/\n/g' | egrep '20[0-9]{2}\-[0-9]{2}\-[0-9]{2}' | perl -pe 's/,//g' | perl -pe 's/.*(20[0-9][0-9]\-[0-9][0-9]\-[0-9][0-9])\|([0-9]+)\|.*/\1,\2/g' >> data_us.json
curl -s "https://en.wikipedia.org/wiki/2020_coronavirus_pandemic_in_France" | perl -pe 's/></>\n</g' | egrep "(display: inline-block;)|(colspan=\"2\" style=\"padding-left:)" | perl -pe 's/<[^>]+>//g' | perl -pe 's/^$//g' | perl -pe 's/\n/@/g' | perl -pe 's/\(/\n(/g' | perl -pe 's/,//g' | perl -pe 's/^[^@]+@//g' | egrep "^20" | perl -pe 's/@+/,/g' | perl -pe 's/,$//g' >> data_fr.json
curl -s "https://en.wikipedia.org/wiki/2020_coronavirus_pandemic_in_Spain" | perl -pe 's/></>\n</g' | egrep "(display: inline-block;)|(colspan=\"2\" style=\"padding-left:)" | perl -pe 's/<[^>]+>//g' | perl -pe 's/^$//g' | perl -pe 's/\n/@/g' | perl -pe 's/\(/\n(/g' | perl -pe 's/,//g' | perl -pe 's/^[^@]+@//g' | egrep "^20" | perl -pe 's/@+/,/g' | perl -pe 's/,$//g' >> data_sp.json
curl -s "https://en.wikipedia.org/wiki/2020_coronavirus_pandemic_in_Italy" | perl -pe 's/></>\n</g' | egrep "(display: inline-block;)|(colspan=\"2\" style=\"padding-left:)" | perl -pe 's/<[^>]+>//g' | perl -pe 's/^$//g' | perl -pe 's/\n/@/g' | perl -pe 's/\(/\n(/g' | perl -pe 's/,//g' | perl -pe 's/^[^@]+@//g' | egrep "^20" | perl -pe 's/@+/,/g' | perl -pe 's/,$//g' >> data_it.json
curl -s "https://en.wikipedia.org/wiki/2020_coronavirus_pandemic_in_Iran" | perl -pe 's/></>\n</g' | egrep "(display: inline-block;)|(colspan=\"2\" style=\"padding-left:)" | perl -pe 's/<[^>]+>//g' | perl -pe 's/^$//g' | perl -pe 's/\n/@/g' | perl -pe 's/\(/\n(/g' | perl -pe 's/,//g' | perl -pe 's/^[^@]+@//g' | egrep "^20" | perl -pe 's/@+/,/g' | perl -pe 's/,$//g' >> data_ir.json
curl -s "https://en.wikipedia.org/wiki/2020_coronavirus_pandemic_in_Japan" | perl -pe 's/></>\n</g' | egrep "(display: inline-block;)|(colspan=\"2\" style=\"padding-left:)" | perl -pe 's/<[^>]+>//g' | perl -pe 's/^$//g' | perl -pe 's/\n/@/g' | perl -pe 's/\(/\n(/g' | perl -pe 's/,//g' | perl -pe 's/^[^@]+@//g' | egrep "^20" | perl -pe 's/@+/,/g' | perl -pe 's/,$//g' >> data_jp.json
curl -s "https://en.wikipedia.org/wiki/2020_coronavirus_pandemic_in_Germany" | perl -pe 's/></>\n</g' | egrep "(display: inline-block;)|(colspan=\"2\" style=\"padding-left:)" | perl -pe 's/<[^>]+>//g' | perl -pe 's/^$//g' | perl -pe 's/\n/@/g' | perl -pe 's/\(/\n(/g' | perl -pe 's/,//g' | perl -pe 's/^[^@]+@//g' | egrep "^20" | perl -pe 's/@+/,/g' | perl -pe 's/,$//g' >> data_ge.json
curl -s "https://en.wikipedia.org/wiki/2020_coronavirus_pandemic_in_South_Korea" | perl -pe 's/></>\n</g' | egrep "(display: inline-block;)|(colspan=\"2\" style=\"padding-left:)" | perl -pe 's/<[^>]+>//g' | perl -pe 's/^$//g' | perl -pe 's/\n/@/g' | perl -pe 's/\(/\n(/g' | perl -pe 's/,//g' | perl -pe 's/^[^@]+@//g' | egrep "^20" | perl -pe 's/@+/,/g' | perl -pe 's/,$//g' >> data_sk.json

