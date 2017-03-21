/**
 * Created by Zyingying on 2017/3/14 0014.
 */
var config = require('./config.json');

var Monitor = require('page-monitor');
var url = config.website;
var monitor = new Monitor(url);

var version1 = 1489485363996,
    version2 = 1489485560769;

monitor.diff(version1, version2, function(code){
    console.log(monitor.log.info); // diff result
    console.log('[DONE] exit [' + code + ']');
});