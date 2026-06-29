/*==========================================================
    PARTICLES.JS
    Enterprise Portfolio

    Purpose
    --------------------------------------------
    • Lightweight Background Particles
    • Optional Enhancement
==========================================================*/

"use strict";

const Particles = (() => {

    let canvas;
    let context;

    let width;
    let height;

    let animationFrame;

    const particles = [];

    const SETTINGS = {

        count:40,

        speed:.4,

        size:2,

        color:"rgba(59,130,246,.20)"

    };

    /*======================================================
    INIT
    ======================================================*/

    function init(){

        canvas=document.getElementById("particles");

        if(!canvas) return;

        context=canvas.getContext("2d");

        resize();

        createParticles();

        window.addEventListener(

            "resize",

            resize

        );

        animate();

    }

    /*======================================================
    RESIZE
    ======================================================*/

    function resize(){

        width=window.innerWidth;

        height=window.innerHeight;

        canvas.width=width;

        canvas.height=height;

    }

    /*======================================================
    CREATE PARTICLES
    ======================================================*/

    function createParticles(){

        particles.length=0;

        for(let i=0;i<SETTINGS.count;i++){

            particles.push({

                x:Math.random()*width,

                y:Math.random()*height,

                radius:Math.random()*SETTINGS.size+1,

                speedY:

                    Math.random()*SETTINGS.speed+.1

            });

        }

    }

    /*======================================================
    DRAW
    ======================================================*/

    function draw(){

        context.clearRect(

            0,

            0,

            width,

            height

        );

        context.fillStyle=SETTINGS.color;

        particles.forEach(particle=>{

            context.beginPath();

            context.arc(

                particle.x,

                particle.y,

                particle.radius,

                0,

                Math.PI*2

            );

            context.fill();

        });

    }

    /*======================================================
    UPDATE
    ======================================================*/

    function update(){

        particles.forEach(particle=>{

            particle.y+=particle.speedY;

            if(particle.y>height){

                particle.y=0;

                particle.x=Math.random()*width;

            }

        });

    }

    /*======================================================
    ANIMATION LOOP
    ======================================================*/

    function animate(){

        draw();

        update();

        animationFrame=

            requestAnimationFrame(animate);

    }

    /*======================================================
    DESTROY
    ======================================================*/

    function destroy(){

        cancelAnimationFrame(

            animationFrame

        );

    }

    /*======================================================
    PUBLIC API
    ======================================================*/

    return{

        init,

        destroy

    };

})();