/*
    Author: Tim Wright, Fresh Tilled Soil 2012
    License: MIT/GPLv2
*/

// declare the Manage namespace
var Manage = Manage || {};

Manage = {
  
    getVendorPrefix : function () {
        
        /*
            This method was modified from: http://lea.verou.me/2009/02/find-the-vendor-prefix-of-the-current-browser/
        */
        
        if('result' in arguments.callee) { 
            return arguments.callee.result;
        }
        
        var regex = /^(Moz|Webkit|Khtml|O|ms|Icab)(?=[A-Z])/,
            theScript = document.getElementsByTagName('script')[0];
        
        for(var prop in theScript.style) {
    
            if(regex.test(prop)) {
                // test is faster than match, so it's better to perform
                // that on the lot and match only when necessary
                return arguments.callee.result = prop.match(regex)[0];
            }

        } // end for loop

        // Nothing found so far?
        // prop in style returns the correct value, so we'll have to test for the precence of a specific property
        if('WebkitOpacity' in theScript.style) { 
            return arguments.callee.result = 'Webkit';
        }
        
        if('KhtmlOpacity' in theScript.style) { 
            return arguments.callee.result = 'Khtml';
        }
    
        return arguments.callee.result = '';
    },
    
    loadScript : function(path, callback ) {
        
       'use strict';
    
        var script = document.createElement('script');
    
        if (script.addEventListener) {
    
            script.addEventListener('load', function () {
    
                if (typeof(callback) === 'function') {
    
                    callback.call(this);
    
                }
    
            }, false);
    
        } else {
    
            script.onreadystatechange = function () {
    
                if (script.readyState === 'loaded' || script.readyState === 'complete') {
    
                    if (typeof(callback) === 'function') {
    
                        callback.call(this);
    
                    } // end check
    
                    script.onreadystatechange = null;
                }
    
            };
        } // end if/else
    
        script.src = path;
        document.getElementsByTagName('head')[0].appendChild(script);
        
    }, // end loadScript
    
    checkBattery : function () {
    
        'use strict';
    
        // check support
        if( navigator.battery ) {

            var battery = navigator.battery,
                isCharging = battery.charging,
                chargingTime = battery.chargingTime,
                level = battery.level, // 0 - 1 returned
                dischargingTime = battery.dischargingTime;

            if(level > .25 || isCharging === true) {

                return 'good';

            } else {

                return 'bad';

            }

        } else {

            return 'unknown';

        }
    }, // end checkBattery
    
    checkConnection : function () {

        'use strict';

        var vendorPrefix = Manage.getVendorPrefix().toLowerCase(), // the connection prefix is lowercase
            connectionString = vendorPrefix + 'Connection';

        // check support
        if ( navigator[connectionString] ) {

            var connection = navigator[connectionString],
                bandwidth = connection.bandwidth, // 0 is offline and "infinity" is unknown, 3 seems pretty good
                metered = connection.metered; // true/false

            if(bandwidth === Infinity) { // "Infinity" is a number, weird right?

                return 'good';

            } else if ( bandwidth >= 3 ) {

                return 'good';

            } else if ( bandwidth === 0 ) {
    
                return 'offline';

            } else {

                return 'unknown';
                
            }

        } else {
    
            return 'unknown';

        }

    }, // end checkConnection
    
    checkPixels : function () {

        'use strict';
        
        // devicePixelRatio is surprisingly well-supported
        if( window.devicePixelRatio > 1 ) {

            return 'good'; // retina

        } else {

            return 'bad'; // normal
        }

    } // end checkPixels

}; // End Manage namespace

/*
    Set up the API
*/
var Manage = {
    'connection' : Manage.checkConnection(),
    'battery' : Manage.checkBattery(),
    'pixelRatio' : Manage.checkPixels()
};