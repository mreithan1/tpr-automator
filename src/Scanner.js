import React, { useEffect } from 'react';
import Quagga from 'quagga';

function Scanner(props){
    const onDetected = props;
    
    useEffect(() => {
        Quagga.init({
            'inputStream' : {
                'type' : 'LiveStream',
                'constraints' : {
                    'width' : { 'min' : 450 },
                    'height' : { 'min' : 300 },
                    'facingMode' : 'environment',
                    'aspectRatio' : { 'min' : 1, 'max' : 2},
                    'target' : '#scannerWindow'
                }
            },
            'locator' : {
                'patchSize' : 'medium',
                'halfSample' : true
            },
            'numOfWorkers' : 2,
            'frequency' : 10,
            'decoder' : {
                'readers' : [
                    'upc_reader'
                ]
            },
            'locate' : true
        },
        error => {
            if (error) {
                console.log("Internal server error!", error);
            }
            Quagga.start();
            return () => {
                Quagga.stop();
            };
        });
        
        Quagga.onProcessed(result => {
            var drawingCtx = Quagga.canvas.ctx.overlay,
            drawingCanvas = Quagga.canvas.dom.overlay;
            
            if (result) {
                if (result.boxes) {
                    drawingCtx.clearRect(
                            0,
                            0,
                            Number(drawingCanvas.getAttribute('width')),
                            Number(drawingCanvas.getAttribute('height'))
                            );
                    result.boxes.filter(function(id) {
                        return id !== result.box;
                    }).forEach(function (id) {
                        Quagga.ImageDebug.drawPath(
                                id,
                                { x : 0, y : 1 },
                                drawingCtx,
                                {
                                    color : "#0F0",
                                    lineWidth : 2
                                }
                        );
                    });
                }
                
                if (result.box) {
                    Quagga.ImageDebug.drawPath(
                            result.box,
                            { x : 0, y : 1 },
                            drawingCtx,
                            {
                                color : '#00F'
                            }
                    );
                }
                
                if (result.codeResult && result.codeResult.code) {
                    Quagga.ImageDebug.drawPath(
                            result.line,
                            { x : 'x', y : 'y'},
                            drawingCtx,
                            {
                                color : '#F00'
                            }
                        );
                
                
                }
            }
        });
        
        Quagga.onDetected(detected);
    }, []);
    
    const detected = res => {
        onDetected(res.codeResult.code);
    };
    
    return (
        <div id="scannerWindow" classname="scannerCam" />
    );
}

export default Scanner