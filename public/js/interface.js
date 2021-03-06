/*
Interface.js

Primarily written by Myles Borins

Interface.js is distributed under the terms the MIT or GPL2 Licenses. 
Choose the license that best suits your project. The text of the MIT and GPL 
licenses can be found in the root directory. 

*/

/*global jQuery, window, io */

var iface = iface || {};
var touch = touch || {};
touch.touches = touch.touches || [];

(function ($) {
    'use strict';
    // Set up the socket 
    iface.model = {
        tilt: {
            alpha : 0,
            beta: 0,
            gamma: 0
        }
    };
    
/*    iface.touchdiv = document.getElementById('touch');
    iface.touches = [];
    iface.touchdiv.addEventListener('touchmove', function(event){
        iface.touches = event.targetTouches;
    });*/
    
    iface.socket = io.connect();
    
    iface.socket.on('poll', function(data){
        if (iface.model.alpha !== null && iface.model.alpha !== undefined){
            iface.socket.emit('alpha', iface.model.tilt.alpha);
        }
        if (iface.model.beta !== null && iface.model.beta !== undefined){        
            iface.socket.emit('beta', iface.model.tilt.beta);
        }
        if (iface.model.gamma !== null && iface.model.beta !== undefined){
            iface.socket.emit('gamma', iface.model.tilt.gamma);
        }
        iface.socket.emit('touch', touch.model);
    });
    
    iface.accel = window.addEventListener("deviceorientation", function(event) {
        // process event.alpha, event.beta and event.gamma
        iface.model.tilt.alpha = event.alpha;
        iface.model.tilt.beta = event.beta;
        iface.model.tilt.gamma = event.gamma;
    }, true);
}(jQuery));