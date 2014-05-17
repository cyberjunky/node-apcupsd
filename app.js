/*

   App to poll an APC UPS (via apcupsd) and publish interesting values to MQTT.
   Published under MIT license by Ron Klinkien <ron@cyberjunky.nl>
   Copyright (C) 2014 The Netherlands

*/

'use strict';
var mqttbroker = { address: 'localhost', port: '1883' };
var topic = 'ups'; // topic basename
var devicename = 'YourUPS'; // default, will be overwritten with upsname value
var pollint = 10000; // poll every 10 seconds, only changed values will be published

var exec = require('child_process').exec;
var mqtt = require('mqtt');
var mclient = mqtt.createClient(mqttbroker.port, mqttbroker.address);
var curvalues = {}; // holds current values

function executeCmd(cmd, callback) {

    exec(cmd, function (err, stdout, stderror) {
      // console.log('stdout: %s', output);
      if (err) {
        callback(err);
      } 
      else if (stderror) {
        callback(stderror);
      }
      else {
        if (stdout) {
          callback(null,stdout);
        } 
        else {
          callback(null, null);
        }
      }
    });
}

function poll() {

    var wanted = ['upsname', 'serialno', 'status', 'linev', 'linefreq', 'loadpct', 'battv', 'bcharge'];

    executeCmd('apcaccess', function(err, response) {
      if (err) {
        console.error(err);
      }
      else {
        // console.log(response);
        var lines = response.trim().split("\n");
 
        // loop over every line
        lines.forEach(function (line) {
          // assign values
          var stats = line.split(' : ');
          var label = stats[0].toLowerCase();
          var value = stats[1];

          // remove surrounding spaces
          label = label.replace(/(^\s+|\s+$)/g, '');
          // if found as wanted value, store it
          if (wanted.indexOf(label) > -1) {
            value = value.replace(/(^\s+|\s+$)/g, '');
            if (label == 'upsname') {
              devicename = value;
            }
            // check if value is known, if not store and publish value
            if (curvalues[label] != value) {
              curvalues[label] = value;
              // console.log(value+" changed!");
              // publish value
              mclient.publish(topic+'/'+devicename+'/'+label, value, {retain: true});
              if (err) throw err;
            }
          }
        });
      }
      // console.log(curvalues);
      setTimeout(poll, pollint);
    })
}

// start plugin
function main() {

    console.log('Started APCUPSD monitor');
    poll();
}
main();
