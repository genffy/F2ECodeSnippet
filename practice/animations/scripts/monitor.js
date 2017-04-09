$(function(){
    // Stats.js
    var stats = new Stats();
    stats.setMode(0); // 0: fps, 1: ms
    // Align top-right
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.right = '0px';
    stats.domElement.style.top = '0px';
    document.body.appendChild( stats.domElement );

    // Matrix
    var $win = $(window),
        $doc = $(document),
        prefix = ['Webkit', 'Moz', 'O', 'Ms'],
        detector = $('<div>')[0],
        transform,
        perspective,

        canvasInfo = {

            screenHeight: 0,
            matrixSize: 0,
            perspective: 0
        },

        els = {
            space: $('#space'),
            matrix: $('#matrix'),
            boxTmpl: $('#box-template'),
            boxCountSelect: $('#box-count-change')
        };

    function ucFirst(str) {
        return str.charAt(0).toUpperCase() + str.substr(1);
    }
    for( var i=0,l=prefix.length; i<l; i++ ) {
        if ( detector.style[prefix[i]+'Transform'] !== undefined ) {
            transform = prefix[i]+'Transform';
        }
        if ( detector.style[prefix[i]+'Perspective'] !== undefined ) {
            perspective = prefix[i]+'Perspective';
        }
    }


    function newBox( size ){
        return updateBox( $( els.boxTmpl.html() ), size );
    };

    function updateBox( box, size ){
        return box.width( size )
            .height( size )
            .find('.front').css( transform, 'translateZ( '+ size/2 +'px)').end()
            .find('.back').css( transform, 'translateZ(-'+ size/2 +'px)').end()
            .find('.top').css( transform, 'translateY(-'+ size/2 +'px) rotateX(-90deg)').end()
            .find('.bottom').css( transform, 'translateY( '+ size/2 +'px) rotateX(-90deg)').end()
            .find('.left').css( transform, 'translateX(-'+ size/2 +'px) rotateY(-90deg)').end()
            .find('.right').css( transform, 'translateX( '+ size/2 +'px) rotateY(-90deg)').end();
    }

    function updateCanvasInfo(){
        canvasInfo.screenWidth = window.innerWidth;
        canvasInfo.screenHeight = window.innerHeight;
        canvasInfo.spaceSize = ( canvasInfo.screenWidth < canvasInfo.screenHeight ? canvasInfo.screenWidth : canvasInfo.screenHeight ) * 0.8;
        canvasInfo.matrixSize = canvasInfo.spaceSize / 2;
        canvasInfo.perspective = canvasInfo.spaceSize * 2;


        els.space.css({
            'left': '50%',
            'top': '50%',
            'margin-left': canvasInfo.matrixSize / -2,
            'margin-top': canvasInfo.matrixSize / -2,
            'height': canvasInfo.matrixSize,
            'width': canvasInfo.matrixSize
        });
        els.space.css( perspective,  canvasInfo.perspective );
    }

    var _rotateX = 0;
    var _rotateY = 0;
    function rotateMatrix( rotateX, rotateY ){
        stats.update();

        _rotateX = ( _rotateX || 0 ) + rotateX;
        _rotateY = ( _rotateY || 0 ) + rotateY;
        els.matrix.css( transform, 'rotateX('+ _rotateX +'deg) rotateY('+ _rotateY +'deg)');
    }

    function renderBox( boxTotal ){
        var boxCountPerSide = Math.pow(boxTotal, 1/3);
        var _overflow = boxCountPerSide % 1;
        if ( _overflow != 0 ) {
            boxCountPerSide = parseInt(boxCountPerSide + 1);
        }

        var boxSize = canvasInfo.matrixSize / boxCountPerSide;
        var x,y,z,xo,yo,zo;
        els.matrix.html('');
        for ( y = boxCountPerSide - 1; y >=0 ; y-- ) {
            for ( z = 0; z < boxCountPerSide; z++ ) {
                for ( x = 0; x < boxCountPerSide; x++ ) {
                    xo = x*boxSize;
                    yo = y*boxSize;
                    zo = z*boxSize - (canvasInfo.matrixSize-boxSize)/2;
                    if ( zo < 1 && zo > -1 ) { zo = 0; }
                    newBox( boxSize ).css('-webkit-transform', 'translateX( '+ xo +'px) translateY( '+ yo +'px) translateZ( '+ zo +'px)').appendTo( els.matrix );
                    if ( --boxTotal == 0 ) { return ; }
                }
            }
        }
    }

    function bindRotate(){
        var startX = 0;
        var startY = 0;
        var isMobile = /(iPhone|iPad|Android)/.test( navigator.userAgent );
        var startEvent = isMobile ? 'touchstart' : 'mousedown';
        var movingEvent = isMobile ? 'touchmove' : 'mousemove';
        var endEvent = isMobile ? 'touchend' : 'mouseup';

        function rotateStart( e ){
            if ( isMobile ) {
                e = e.originalEvent.touches[0];
            }
            startX = e.pageX;
            startY = e.pageY;
            $doc.bind( movingEvent, rotateMoving );
            $doc.bind( endEvent, rotateEnd );
        }

        function rotateMoving( e ){
            if ( isMobile ) {
                e = e.originalEvent.touches[0];
            }
            var offsetX = e.pageX - startX;
            var offsetY = e.pageY - startY;
            startX = e.pageX;
            startY = e.pageY;
            rotateMatrix( -1 * 180 * offsetY / canvasInfo.spaceSize, 180 * offsetX / canvasInfo.spaceSize );
            return false;
        }

        function rotateEnd(){
            $doc.unbind( movingEvent, rotateMoving );
            $doc.unbind( endEvent, rotateEnd );
        }

        $doc.bind( startEvent, rotateStart );
    }

    function bindResize(){
        var delay;
        $win.resize(function(){
            clearTimeout(delay);
            delay = setTimeout(function(){
                updateCanvasInfo();
                renderBox( els.boxCountSelect.val() );
            }, 300);
        });
    }

    function bindSetBoxCount(){
        var maxOptCount = 343;
        var html = '';
        for (var i = 1; i < maxOptCount + 1; i++) {
            html += '<option value="'+ i +'">'+ i +'</option>';
        }
        els.boxCountSelect.html( html ).change(function(){
            renderBox( this.value );
        });
    }

    var settedFPS;
    var settedSpeed = 0.5;
    var autoPlayRequest;
    var autoPlayTimeout;
    var skipFrame = 0;
    var paused = false;
    var resumeFunc;
    function autoPlay( _settedFPS ){
        var skippedFrames = 0;

        stopAutoPlay();
        if ( _settedFPS ) {
            setAutoPlayFPS( _settedFPS );
        }

        if ( settedFPS ) {
            function tmo(){
                if ( !skipFrame ) {
                    rotateMatrix( 0, (skippedFrames + 1) * settedSpeed * 60 / settedFPS );
                    skippedFrames = 0;
                }
                else {
                    if ( !skippedFrames ) {
                        skippedFrames = skipFrame;
                    }
                    skipFrame--;
                }
                clearTimeout(autoPlayTimeout);
                if ( paused ) {
                    resumeFunc = tmo;
                }
                else {
                    autoPlayTimeout = setTimeout(tmo, 1000 / settedFPS);
                }

            }
            autoPlayTimeout = setTimeout(tmo, 1000 / settedFPS);
        }
        else {
            function loop() {
                rotateMatrix( 0, settedSpeed );
                if ( paused ) {
                    resumeFunc = loop;
                }
                else {
                    autoPlayRequest = requestAnimationFrame(loop);
                }
            }
            loop();
        }
        return _settedFPS ? ('Auto Play with FPS: '+ settedFPS) : 'Start auto-play.';
    }

    function stopAutoPlay(){
        settedFPS = null;
        cancelAnimationFrame( autoPlayRequest );
        clearTimeout(autoPlayTimeout);
        return 'Auto-play stoped.';
    }

    function setAutoPlayFPS( fps ){
        if ( fps ) {
            if ( fps > 60 ) {
                fps = 60;
            }
            else if ( fps < 1 ) {
                fps = 1;
            }
        }
        settedFPS = fps;
    }

    function setAutoPlatSpeed( spd ){
        if ( spd ) {
            settedSpeed = spd;
        }
        else {
            settedSpeed = 0.5;
        }
        return spd ? ('Speed has been set to '+ spd +'.') : 'Speed has benn reset.';
    }

    function interrupt( _skipFrame ){
        skipFrame = _skipFrame;
    }

    var playTimeout;
    function play( speed, fps ){
        clearTimeout(playTimeout);
        function tmo(){
            rotateMatrix( 0, speed );
            clearTimeout(playTimeout);
            playTimeout = setTimeout(tmo, 1000 / fps);
        }
        playTimeout = setTimeout(tmo, 1000 / fps);
        return 'Play with FPS:'+ fps +' & Speed:'+ speed;
    }

    function stopPlay() {
        clearTimeout(playTimeout);
        return 'Stopped.';
    }

    function transitionAnimate( x, y ){
        els.matrix.addClass('transition');
        rotateMatrix( x, y );
        setTimeout(function(){
            els.matrix.removeClass('transition')
        }, 2000);
    }

    function cssAnimate(  ){
        els.matrix.addClass('css-animate');
        setTimeout(function(){
            els.matrix.removeClass('css-animate')
        }, 2000);
    }

    function pause(){
        paused = true;
    }

    function resume(){
        paused = false;
        if ( resumeFunc ) {
            resumeFunc();
            resumeFunc = null;
        }
    }

    function bindPause(){
        function checkPause(){
            (
                location.hash == '#pause' || parent.location.hash == '#pause'
            ) ? pause() : resume();
        }
        $win.on('hashchange', checkPause);
        $(parent).on('hashchange', checkPause);
        checkPause();
    }

    window.rotateMatrix = rotateMatrix;
    window.autoPlay = autoPlay;
    window.stopAutoPlay = stopAutoPlay;
    window.setAutoPlayFPS = setAutoPlayFPS;
    window.setAutoPlatSpeed = setAutoPlatSpeed;
    window.play = play;
    window.stopPlay = stopPlay;
    window.pause = pause;
    window.resume = resume;
    window.interrupt = interrupt;
    window.transitionAnimate = transitionAnimate;
    window.cssAnimate = cssAnimate;

    function main(){
        bindRotate();
        bindResize();
        bindSetBoxCount();
        updateCanvasInfo();

        renderBox( els.boxCountSelect.val() );
        bindPause();

        rotateMatrix(-25, 0);

        var lowfpsModeReg = /\bmode=lowfps\b/i;
        var jumpframeModeReg = /\bmode=jumpframe\b/i;
        if (
            lowfpsModeReg.test( location.search )
            || lowfpsModeReg.test(parent.location.search)
        ) {
            autoPlay(15);
        }
        else if (
            jumpframeModeReg.test( location.search )
            || jumpframeModeReg.test(parent.location.search)
        ) {
            autoPlay(60);
            setInterval(function(){
                interrupt(10);
            }, 4000);
        }
        else {
            autoPlay();
        }
    }

    main();
    $('.btn').click(function(){
        var $that = $(this), val = $that.val()
        window.location.search = 'mode='+val
    });
    if(/\bshow=false\b/.test(location.search)){
        $('.option').hide()
    }else{
        $('.option').show()
    }

});