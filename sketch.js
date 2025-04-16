const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');

const settings = {
  dimensions: [ 2048, 2048 ]
};

const sketch = () => {
  // Local state
  const count = 45;

  const createGrid = () => {
    const points = [];
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);

        points.push([u,v]);
      }
    }

    return points;
  }

  const points = createGrid();

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0,0,width,height);

    const margin = 100;

    let min_width = margin;
    let max_width = width - margin;
    let min_height = margin;
    let max_height = height - margin;

    points.forEach(([u,v]) => {
      const x = lerp(min_width, max_width, u);
      const y = lerp(min_height, max_height, v);

      context.beginPath();
      context.arc(x,y,60,0,Math.PI * 2, false);
      context.strokeStyle = 'black';
      context.lineWidth = 2;
      context.stroke();
    });
  };
};

canvasSketch(sketch, settings);
