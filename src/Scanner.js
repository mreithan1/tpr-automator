import React, { Component } from 'react';
import Quagga from 'quagga';
import "./assets/scanner.css"
import 'bootstrap/dist/css/bootstrap.css';
import {
    Button
} from 'reactstrap';

class Scanner extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            barcodeResult : 0,
            renderVideo: true
        };
        
        this.destroyVideo = this.destroyVideo.bind(this);
        this.detected = this.detected.bind(this);
    }
    
    componentDidMount(){
        
        Quagga.init({
            'inputStream' : {
                "type" : "LiveStream",
//                'target' : 'scannerWindow',
                'constraints' : {
                    'width' : { 'min' : 450 },
                    'height' : { 'min' : 300 },
                    'facingMode' : 'environment',
                    'aspectRatio' : { 'min' : 1, 'max' : 2}
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
                                color : "#00F",
                                lineWidth : 2
                            }
                    );
                }
                
                if (result.codeResult && result.codeResult.code) {
                    Quagga.ImageDebug.drawPath(
                            result.line,
                            { x : 'x', y : 'y'},
                            drawingCtx,
                            {
                                color : "#F00",
                                lineWidth : 3
                            }
                        );
                
                
                }
            }
        });
        
        Quagga.onDetected(this.detected);
    };
    
    destroyVideo(){
        this.setState({ renderVideo : false });
    }
    
    detected(res) {
        this.setState({ barcodeResult : res.codeResult.code });
        console.log("Barcode detected: ", this.state.barcodeResult);
        Quagga.stop();
        this.destroyVideo();
        this.props.onChange(res.codeResult.code);
    };
    
    
    render(){
        var doVideoRender = this.state.renderVideo;
        return (
                <div>
                    { doVideoRender ? (
                            <div id="interactive" className="viewport">
                                <video className="videoCamera" autoPlay="true" preload="auto" src="" muted="true" playsInLine="true"></video>
                                <canvas className="drawingBuffer"></canvas>
                            </div>
                    ) : null}
                    <p>{this.state.barcodeResult}</p>
                </div>
        );
    }
}

export default Scanner