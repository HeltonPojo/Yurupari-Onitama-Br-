export function getDefaultCards(): Card[] {
	let cards = [
		{
			name: 'Arara',
			moves: [
				{ x: 1, y: 1 },
				{ x: 1, y: -1 },
				{ x: -1, y: 2 },
				{ x: -1, y: -2 },
			],
			id: 0,
		},
		{
			name: 'Tatu',
			moves: [
				{ x: 1, y: 1 },
				{ x: 0, y: 2 },
				{ x: -1, y: -1 },
			],
			id: 1,
		},
		{
			name: 'Tamandua',
			moves: [
				{ x: 0, y: 1 },
				{ x: 0, y: -1 },
				{ x: -1, y: 1 },
				{ x: -1, y: -1 },
			],
			id: 2,
		},
		{
			name: 'Onça',
			moves: [
				{ x: 1, y: 0 },
				{ x: -2, y: 0 },
			],
			id: 3,
		},
		{
			name: 'Quati',
			moves: [
				{ x: 1, y: 1 },
				{ x: 1, y: -1 },
				{ x: -1, y: 1 },
				{ x: -1, y: -1 },
			],
			id: 4,
		},
	];

	return cards;
}

interface Piece {
	team: number;
	role: string;
}
interface Cell {
	piece?: Piece;
	color: string;
}
interface Move {
	x: number;
	y: number;
}
interface Card {
	name: string;
	moves: Move[];
	id: number;
}
class gameState {
	board: Cell[][];
	availbCards: Card[][];
	playerTurn: number = 1;
	standCard: Card;
	winnerTeam: number;

	constructor() {
		let gameCards = getDefaultCards();
		this.standCard = gameCards[4];
		this.availbCards = [];
		this.board = [];
		this.winnerTeam = -1;

		let hand: Card[] = [];
		gameCards.forEach((card) => {
			if (hand.length < 2) {
				hand.push(card);
			} else {
				this.availbCards.push(hand);
				hand = [];
				hand.push(card);
			}
		});
		for (let i = 0; i < 5; i++) {
			let line: Cell[] = [];
			for (let j = 0; j < 5; j++) {
				let cell: Cell = {
					color:
						i % 2 === j % 2
							? 'linear-gradient(45deg, #8e8649 ,#6e5009)'
							: 'linear-gradient(45deg, #316936,#6dac86 )',
				};
				if (i === 0) {
					if (j !== 2) {
						cell.piece = { team: 0, role: 'soldado' };
					} else {
						cell.piece = { team: 0, role: 'rei' };
					}
				} else if (i === 4) {
					if (j !== 2) {
						cell.piece = { team: 1, role: 'soldado' };
					} else {
						cell.piece = { team: 1, role: 'rei' };
					}
				}
				line.push(cell);
			}
			this.board.push(line);
		}
	}
	// Checa se o movimento é valido ou se ele está indo para não está indo para cima de alguma peça aliada ou para fora do tabuleiro
	checkValidMove(
		card: Card,
		move: number,
		initialX: number,
		initialY: number
	) {
		try {
			let cellInit: Cell = this.board[initialX][initialY];
			let moves = card.moves[move];
			let cellFinal: Cell =
				this.board[initialX + moves.x][initialY + moves.y];

			if (!cellInit.piece || cellInit.piece.team !== this.playerTurn) {
				console.log('Movimento invalido');
				return false;
			}

			if (cellFinal.piece && cellFinal.piece.team === this.playerTurn) {
				console.log('Movimento invalido');
				return false;
			}
			return true;
		} catch (e) {
			console.log('Movimento invalido');
			return false;
		}
	}
	// Dada a posição inicial da peça ele pega o objeto de peça e move ela para a celula de dentinho
	movePiece(card: Card, move: number, initialX: number, initialY: number) {
		if (this.checkValidMove(card, move, initialX, initialY)) {
			let cellInit: Cell = this.board[initialX][initialY];
			let moves = card.moves[move];
			if (
				this.board[initialX + moves.x][initialY + moves.y].piece
					?.role === 'rei'
			) {
				this.winnerTeam = this.playerTurn;
			}
			this.board[initialX + moves.x][initialY + moves.y].piece =
				cellInit.piece;
			this.board[initialX][initialY] = {
				color: this.board[initialX][initialY].color,
			};
			this.rotateCards(card);
			this.rotateBoard();
			this.switchTeam();
		}
	}
	// Realiza o serviço de rotação das cartas conforme os usuarios as utilizam
	rotateCards(usedCard: Card) {
		let index = this.availbCards[this.playerTurn].indexOf(usedCard);
		if (index > -1) {
			this.availbCards[this.playerTurn].splice(index, 1);
			this.availbCards[this.playerTurn].push(this.standCard);
			this.standCard = usedCard;
		}
	}
	// Gira a board
	rotateBoard() {
		const N = this.board.length;
		let matrixResult: Cell[][] = new Array(N)
			.fill(null)
			.map(() => new Array(N));

		for (let i = 0; i < N; i++) {
			for (let j = 0; j < N; j++) {
				matrixResult[N - i - 1][N - j - 1] = this.board[i][j];
			}
		}
		this.board = matrixResult;
	}

	// troca a os objetos de lugar
	switchTeam() {
		this.playerTurn = this.playerTurn === 0 ? 1 : 0;
	}
}

export type { Piece as PieceType };
export type { Cell as CellType };
export type { Move as MoveType };
export type { Card as CardType };
export default gameState;
