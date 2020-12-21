export default class WordRaindrop {
  constructor(target, options) {
    if (target === undefined) {
      throw new Error('target is undefined');
    }
    this.targetElement = typeof target === 'string' ? document.getElementById(target) : target;
    this.options = Object.assign({
      text: '01',
      fontSize: 18,
      fontFamily: 'arial',
      textColor: 'rgba(255, 255, 255, 1)',
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      speed: 8
    }, options);

    window.requestAnimationFrame = this.requestAnimationFrame();
    this.execute();
  }
  execute() {
    const { speed, backgroundColor, text, textColor, fontSize } = this.options;
    const canvas = this.createCanvas();
    const ctx = canvas.getContext('2d');
    const textPositionCol = this.initTextPosition(canvas);
    let count = 0;
    const drawCanvas = () => {
      count++;
      if(count === speed){
        count = 0;
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = textColor;
        for(let i = 0;i < textPositionCol.length;i++) {
          textPositionCol[i]++;
          const textIndex = Math.floor(Math.random() * text.length);
          const textValue = text[textIndex];
          const textX = i * fontSize;
          const textY = textPositionCol[i] * fontSize;
          ctx.fillText(textValue, textX, textY);
          if(textY > canvas.height) {
            if(Math.random() > 0.8) {
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
    return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function(callback) {
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
    const { fontSize, fontFamily } = this.options;
    ctx.font = `${fontSize}px ${fontFamily}`;
    return canvas;
  }
  initTextPosition(canvas) {
    const { fontSize } = this.options;
    const rowNum = canvas.height / fontSize;
    const columnNum = canvas.width / fontSize;
    const textPositionCol = [];
    for(let i = 0;i < columnNum;i++) {
      const rowIndex = Math.floor(Math.random() * rowNum);
      textPositionCol.push(rowIndex);
    }
    return textPositionCol;
  }
}