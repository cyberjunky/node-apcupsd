node-apcupsd
============

Node.js code for publishing APC UPS info (from apcupsd) to MQTT broker

Install apcupsd
<pre>
$ sudo apt-get install apcupsd
</pre>

Configure
<pre>
$ sudo vi /etc/default/apcupsd
ISCONFIGURED=yes

$ sudo vi /etc/apcupsd/apcupsd.conf
In case of USB connected UPS:
UPSNAME SmartUPS
UPSCABLE usb
## set ups type to usb ##
UPSTYPE usb
DEVICE

$ sudo service apcupsd restart
$ sudo chkconfig apcupsd on
</pre>

Test
<pre>
$ apcaccess

APC      : 001,045,1093
DATE     : 2014-05-16 07:51:20 +0200
HOSTNAME : host
VERSION  : 3.14.10 (13 September 2011) debian
UPSNAME  : SmartUPS
CABLE    : USB Cable
DRIVER   : USB UPS Driver
UPSMODE  : Stand Alone
STARTTIME: 2014-05-16 07:50:11 +0200
MODEL    : Back-UPS CS 650
STATUS   : ONLINE
LINEV    : 228.0 Volts
LOADPCT  : 22.0 Percent Load Capacity
BCHARGE  : 100.0 Percent
TIMELEFT : 39.0 Minutes
MBATTCHG : 5 Percent
MINTIMEL : 3 Minutes
MAXTIME  : 0 Seconds
OUTPUTV  : 230.0 Volts
...
</pre>

Install node-apcupsd
<pre>
$ git clone
</pre>
Install required libs
<pre>
npm install
</pre>
Change MQTT broker address and/or topic
<pre>
vi app.js
</pre>
Run
<pre>
node app.js
</pre>
