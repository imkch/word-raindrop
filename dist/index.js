
(function(l, r) { if (l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (window.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(window.document);
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.WordRaindrop = factory());
}(this, (function () { 'use strict';

  class WordRaindrop {
    constructor(target, options) {
      if (target === undefined) {
        throw new Error('target is undefined');
      }

      this.targetElement = typeof target === 'string' ? document.getElementById(target) : target;
      this.options = Object.assign({
        text: 'qwertyuioplkjhgfdsazxcvbnm',
        fontSize: 18,
        fontFamily: 'arial',
        textColor: 'rgba(255, 255, 255, 1)',
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        speed: 1
      }, options);
      window.requestAnimationFrame = this.requestAnimationFrame();
      this.execute();
    }

    execute() {
      const {
        speed,
        backgroundColor,
        text,
        textColor,
        fontSize
      } = this.options;
      const canvas = this.createCanvas();
      const ctx = canvas.getContext('2d');
      const textPositionCol = this.initTextPosition(canvas);
      let count = 0;

      const drawCanvas = () => {
        count++;

        if (count === speed) {
          count = 0;
          ctx.fillStyle = backgroundColor;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.fillStyle = textColor;

          for (let i = 0; i < textPositionCol.length; i++) {
            textPositionCol[i]++;
            const textIndex = Math.floor(Math.random() * text.length);
            const textValue = text[textIndex];
            const textX = i * fontSize;
            const textY = textPositionCol[i] * fontSize;
            ctx.fillText(textValue, textX, textY);

            if (textY > canvas.height) {
              if (Math.random() > 0.8) {
                textPositionCol[i] = 0;
              }
            }
          }
        }

        window.requestAnimationFrame(drawCanvas);
      };

      drawCanvas();
    }

    requestAnimationFrame() {
      return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (callback) {
        window.setTimeout(callback, 1000 / 60);
      };
    }

    createCanvas() {
      const canvas = document.createElement("canvas");
      this.targetElement.appendChild(canvas);
      const targetWidth = this.targetElement.clientWidth;
      const targetHeight = this.targetElement.clientHeight;
      canvas.width = targetWidth;
      canvas.height = targetHeight;
      const ctx = canvas.getContext('2d');
      const {
        fontSize,
        fontFamily
      } = this.options;
      ctx.font = `${fontSize}px ${fontFamily}`;
      return canvas;
    }

    initTextPosition(canvas) {
      const {
        fontSize
      } = this.options;
      const rowNum = canvas.height / fontSize;
      const columnNum = canvas.width / fontSize;
      const textPositionCol = [];

      for (let i = 0; i < columnNum; i++) {
        const rowIndex = Math.floor(Math.random() * rowNum);
        textPositionCol.push(rowIndex);
      }

      return textPositionCol;
    }

  }

  return WordRaindrop;

})));
