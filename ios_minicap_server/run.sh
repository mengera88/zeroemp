#!/usr/bin/env bash

set -e

UDID=$(system_profiler SPUSBDataType | sed -n -E -e '/(iPhone|iPad)/,/Serial/s/ *Serial Number: *(.+)/\1/p')
echo $UDID
PORT=12345

#获取PRODUCTTYPE
DEVICEINFO=$(ideviceinfo)
DEVICEINFO=${DEVICEINFO##*ProductType:}
PRODUCTTYPE=${DEVICEINFO%%ProductVersion*}
if [[ ! -n "$PRODUCTTYPE" ]]; then
exit 1
fi

echo $PRODUCTTYPE

#默认iPhone6
RESOLUTION="375x667"

#设备类型对应的机型
iPhone5Series="iPhone5"
iPhone5sSeries="iPhone6"
iPhone6="iPhone7,2"
iPhone6Plus="iPhone7,1"
iPhone6s="iPhone8,1"
iPhone6sPlus="iPhone8,2"
iPhone7="iPhone9,1"
iPhone7Plus="iPhone9,2"
iPad="iPad"

#设置机型对应的分辨率点数
if [[ "$PRODUCTTYPE" =~ "$iPhone6sPlus" ]] || [[ "$PRODUCTTYPE" =~ "$iPhone6Plus" ]] || [[ "$PRODUCTTYPE" =~ "$iPhone7Plus" ]]; then
RESOLUTION="414x736"
elif [[ "$PRODUCTTYPE" =~ "$iPhone6" ]] || [[ "$PRODUCTTYPE" =~ "$iPhone6s" ]] || [[ "$PRODUCTTYPE" =~ "$iPhone7" ]]; then
RESOLUTION="375x667"
elif [[ "$PRODUCTTYPE" =~ "$iPhone5Series" ]] || [[ "$PRODUCTTYPE" =~ "$iPhone5sSeries" ]]; then
RESOLUTION="320x568"
elif [[ "$PRODUCTTYPE" =~ "$iPhone" ]]; then
RESOLUTION="320x480"
elif [[ "$PRODUCTTYPE" =~ "$iPad" ]]; then
RESOLUTION="768x1024"
else
RESOLUTION="FALSE"
fi

echo $RESOLUTION

if [[ $RESOLUTION != "FALSE" ]]; then
./build/ios_minicap \
    --udid $UDID \
    --port $PORT \
    --resolution $RESOLUTION
else
echo "Device not supported!"
fi
