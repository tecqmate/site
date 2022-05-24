#!/bin/bash

set -ef

cd $(dirname $0)

xmls=$(find ../src -type f -name '*.xml')

for xf in $xmls
do
  hf=$(echo $xf | sed 's/.xml/.html/;s/src\///')
  ./xsltproc $xf -o $hf
done
