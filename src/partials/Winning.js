import { SVG_NS } from '../settings';

export default class Winning {
    constructor (x, y, size) {
      this.x = x;
      this.y = y;
      this.size = size;
    }
    
    render(svg){
        let text = document.createElementNS(SVG_NS, 'text');
            text.setAttributeNS(null, 'x', this.x);
            text.setAttributeNS(null, 'y', this.y);
            text.setAttributeNS(null, 'font-family', '"Silkscreen Web", monotype');
            text.setAttributeNS(null, 'font-size', this.size);
            text.setAttributeNS(null, 'fill', 'pink');
            text.textContent = 'You Win!';
            svg.appendChild(text);
    }
  }