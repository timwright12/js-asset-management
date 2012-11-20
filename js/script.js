;(function () {
    
    'use strict';
    
    // check if the connectio and battery are both "good"
    if ( Manage.connection === 'good' && Manage.battery === 'good' ) {

        // now that you know the connection and battery are good, check for retina support
        if( Manage.pixelRatio === 'good' ) {

            alert('We have a 2:1 pixel ratio, and a strong connection');
        
        // a normal pixel ratio
        } else {

            alert('I get it, not 2:1, but load normal image');

        }
        
    // mix up some scenarios
    } else if ( Manage.connection === 'good' && Manage.battery === 'bad' ||  Manage.connection === 'bad' && Manage.battery === 'good') {

        alert('mixed bad of tricks, just load the normal image');

    // check if everything is bad
    } else if ( Manage.connection === 'bad' && Manage.battery === 'bad' ) {

        alert('load a tiny image, we\'re in bad shape');
    
    // create a fallback condition
    } else {

        alert('nothing makes sense to me, so load normal image or fallback to the picturefill');
        
        // using the script loader to pull in picturefill
        Manage.loadScript('js/lib/picturefill.js', function () {
            console.log('using the picturefill now');
        });

    }

})();