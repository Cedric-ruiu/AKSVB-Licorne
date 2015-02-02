/*! Picturefill - Responsive Images that work today. (and mimic the proposed Picture element with span elements). Author: Scott Jehl, Filament Group, 2012 | License: MIT/GPLv2 */

(function( w ){

	// Enable strict mode
	"use strict";

	w.picturefill_cr = function() {
		var ps = w.document.getElementsByTagName( "span" );

		// Loop the pictures
		for( var i = 0, il = ps.length; i < il; i++ ){
			if( ps[ i ].getAttribute( "data-picture" ) !== null ){

				var sources = ps[ i ].getElementsByTagName( "span" ),
					matches = [];

				// See if which sources match
				for( var j = 0, jl = sources.length; j < jl; j++ ){
					var media = sources[ j ].getAttribute( "data-media" );
					// if there's no media specified, OR w.matchMedia is supported 
					if( !media || ( w.matchMedia && w.matchMedia( media ).matches ) ){
						matches.push( sources[ j ] );
					}
				}

				// Find any existing img element in the picture element
				var picImg = ps[ i ].getElementsByTagName( "div" )[ 0 ];

				if( matches.length ){
					var matchedEl = matches.pop();
					if( !picImg ){
						picImg = w.document.createElement( "div" );
					}
					picImg.className = 'slide-img';
					picImg.style.backgroundImage = 'url('+matchedEl.getAttribute( "data-src" )+')';
					matchedEl.appendChild( picImg );
				}//*/

				else if( picImg ){
					picImg.parentNode.removeChild( picImg );
				}
			}
		}
	};

	// Run on resize and domready (w.load as a fallback)
	if( w.addEventListener ){
		w.addEventListener( "resize", w.picturefill_cr, false );
		w.addEventListener( "DOMContentLoaded", function(){
			w.picturefill_cr();
			// Run once only
			w.removeEventListener( "load", w.picturefill_cr, false );
		}, false );
		w.addEventListener( "load", w.picturefill_cr, false );
	}
	else if( w.attachEvent ){
		w.attachEvent( "onload", w.picturefill_cr );
	}

}( this ));
