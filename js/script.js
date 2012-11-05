;(function () {
    
    'use strict';
    
    if ( Manage.connection === 'good' && Manage.battery === 'good' ) {

        // now that you know the connection and battery are good, check for retina support
        if( Manage.pixelRatio === 'good' ) {

            alert('We have retina, and a strong connection');

        } else {

            alert('I get it, not retina, but load normal image');

        }

    } else if ( Manage.connection === 'good' && Manage.battery === 'bad' ||  Manage.connection === 'bad' && Manage.battery === 'good') {

        alert('mixed bad of tricks, just load the normal image');

    } else if ( Manage.connection === 'bad' && Manage.battery === 'bad' ) {

        alert('load a tiny image, we\'re in bad shape');

    } else {

        alert('nothing makes sense to me, so load normal image or fallback to the picturefill');

        Manage.loadScript('js/lib/picturefill.js', function () {
            console.log('using the picturefill now');
        });

    }

})();