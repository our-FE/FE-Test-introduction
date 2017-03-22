/**
 * Created by Zyingying on 2017/3/14 0014.
 */
var config = require('./config.json');

var Monitor = require('page-monitor');
var url = config.website;
var monitor = new Monitor(url);

var version1 = 1490199679985,
    version2 = 1490200007195;

monitor.diff(version1, version2, function(code){
    console.log(monitor.log.info); // diff result
    console.log('[DONE] exit [' + code + ']');
});