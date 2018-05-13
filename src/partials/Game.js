import Winning from './Winning';
import Score from './Score';
import Ball from './Ball';
import Paddle from './Paddle';
import Board from './Board';
import { SVG_NS, KEYS } from '../settings';

export default class Game {

	constructor(element, width, height) {
		this.element = element;
		this.width = width;
		this.height = height;
		this.gameElement = document.getElementById(this.element);

		this.board = new Board(this.width, this.height);


		this.ball1 = new Ball(8, this.width, this.height);
		this.ball2 = new Ball(8, this.width, this.height);


		this.score1 = new Score(this.width / 2 - 50, 30, 30);
		this.score2 = new Score(this.width / 2 + 25, 30, 30);
		this.winning = new Winning(this.width/2 - 90, 150, 40);

		this.paddleWidth = 8;
		this.paddleHeight = 56;
		this.boardGap = 10;
		
		this.pause = false;

		 

		document.addEventListener('keydown', event => {
			if (event.key == KEYS.spaceBar) {
				this.pause = !this.pause;
			}
		});

		this.player1 = new Paddle(
			this.height,
			this.width,
			this.paddleWidth,
			this.paddleHeight,
			this.boardGap,
			((this.height - this.paddleHeight) / 2),
			KEYS.w,
			KEYS.s,
			KEYS.d,
			KEYS.a,
			'player1'
		);
		this.player2 = new Paddle(
			this.height,
			this.width,
			this.paddleWidth,
			this.paddleHeight,
			(this.width - this.boardGap - this.paddleWidth),
			((this.height - this.paddleHeight) / 2),
			KEYS.up,
			KEYS.down,
			KEYS.right,
			KEYS.left,
			'player2'
		);
	}
	render() {
			if (this.pause) {
				return;
			}
			this.gameElement.innerHTML = '';
			let svg = document.createElementNS(SVG_NS, 'svg');
			svg.setAttributeNS(null, 'width', this.width);
			svg.setAttributeNS(null, 'height', this.height);
			svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`);
			this.gameElement.appendChild(svg);
			this.board.render(svg);
			// players
			this.player1.render(svg);
			this.player2.render(svg);
			// balls
			this.ball1.render(svg, this.player1, this.player2);
			this.ball2.render(svg, this.player1, this.player2);
			// the score
			this.score1.render(svg, this.player1.score);
			this.score2.render(svg, this.player2.score);
			if(this.player1.score === 10 || this.player2.score === 10) {
				this.winning.render(svg);
				this.pause = true; 
		}
	}
}