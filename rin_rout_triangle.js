const canvasSketch = require('canvas-sketch');

const settings = {
  dimensions: [ 2048, 2048 ]
};

const LINE_WIDTH = 10;

const palette = {
  a: '#1e579c',
  b: '#0098db',
  c: '#0ce6f2',
}

const TRIANGLE_COLOR = palette.c;
const RIN_COLOR = palette.b;
const ROUT_COLOR = palette.b;

const sketch = () => {
  return ({ context, width, height }) => {
    // Clear background
    context.fillStyle = 'black';
    context.fillRect(0, 0, width, height);
    
    // Set up drawing parameters
    const centerX = width / 2;
    const centerY = height / 2.4;
    const triangleSize = Math.min(width, height) * 0.6;
    
    // Draw triangle
    context.beginPath();
    context.moveTo(centerX, centerY - triangleSize / 2); // Top vertex
    context.lineTo(centerX + triangleSize / 2, centerY + triangleSize / 2); // Bottom right
    context.lineTo(centerX - triangleSize / 2, centerY + triangleSize / 2); // Bottom left
    context.closePath();
    
    // Draw triangle outline
    context.strokeStyle = TRIANGLE_COLOR;
    context.lineWidth = LINE_WIDTH;
    context.stroke();
    
    // Calculate triangle properties
    const a = triangleSize; // Base
    const b = Math.sqrt(Math.pow(triangleSize / 2, 2) + Math.pow(triangleSize, 2)); // Right side
    const c = b; // Left side (isosceles triangle)
    
    // Calculate semi-perimeter
    const s = (a + b + c) / 2;
    
    // Calculate area using Heron's formula
    const area = Math.sqrt(s * (s - a) * (s - b) * (s - c));
    
    // Calculate inradius (r) - radius of inscribed circle
    const inradius = area / s;
    
    // Calculate circumradius (R) - radius of circumscribed circle
    const circumradius = (a * b * c) / (4 * area);
    
    // Calculate Rin/Rout ratio
    const rinRoutRatio = inradius / circumradius;
    
    // Calculate the centroid of the triangle
    const centroidX = (centerX + (centerX + triangleSize / 2) + (centerX - triangleSize / 2)) / 3;
    const centroidY = (centerY - triangleSize / 2 + (centerY + triangleSize / 2) + (centerY + triangleSize / 2)) / 3;
    
    // Draw the centroid
    // context.beginPath();
    // context.arc(centroidX, centroidY, 10, 0, Math.PI * 2);
    // context.fillStyle = 'green';
    // context.fill();
    
    // Draw inradius (inner circle)
    context.beginPath();
    context.arc(centerX, centroidY + 30, inradius, 0, Math.PI * 2);
    context.strokeStyle = RIN_COLOR;
    context.lineWidth = LINE_WIDTH;
    context.stroke();
    
    // Draw circumradius (outer circle)
    context.beginPath();
    context.arc(centerX, centroidY - 51, circumradius, 0, Math.PI * 2);
    context.strokeStyle = ROUT_COLOR;
    context.lineWidth = LINE_WIDTH;
    context.stroke();
    
    // Display Rin/Rout ratio
    context.font = '24px Arial';
    context.fillStyle = 'black';
    context.textAlign = 'center';
    context.fillText(`Rin/Rout Ratio: ${rinRoutRatio.toFixed(4)}`, centerX, height - 50);
  };
};

canvasSketch(sketch, settings);
