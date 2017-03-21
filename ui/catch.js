/**
 * Created by Zyingying on 2017/3/14 0014.
 */
var config = require('./config.json');
var Monitor = require('page-monitor');
var url = config.website;

var monitor = new Monitor(url);
monitor.capture(function(code){
    console.log(monitor.log); // from phantom
    console.log('done, exit [' + code + ']');
});

