import React, { useState } from 'react';
import './App.css';
import Board from './components/Board';
import gameState, { CellType, MoveType } from './game/onitama';
import CardMove from './components/Card';
import { CardType } from './game/onitama';
import { Typography } from '@mui/material';

const game = new gameState();

function App() {
	const [board, setBoard] = useState(game.board);
	const [selectedCard, setSelectCard] = useState<CardType | {}>({});
	const [selectedPiece, setSelectPiece] = useState({});
	const [availableMoves, setAvaMoves] = useState<any[]>([]);

	const makeMove = (destination: CellType) => {
		if ('moves' in selectedCard) {
			let xinit: number | null = null;
			let yinit: number | null = null;
			let ydestin: number | null = null;
			let xdestin: number | null = null;
			let moveId: number;
			board.forEach((row, x) => {
				row.forEach((cell, y) => {
					if (cell === selectedPiece) {
						xinit = x;
						yinit = y;
					}
					if (cell === destination) {
						xdestin = x;
						ydestin = y;
					}
				});
			});
			if (
				xinit !== null &&
				yinit !== null &&
				xdestin !== null &&
				ydestin !== null &&
				xinit
			) {
				let x: number = xdestin - xinit;
				let y: number = ydestin - yinit;
				moveId = selectedCard.moves.findIndex(
					(move) => move.x === x && move.y === y
				);
				if (moveId !== -1) {
					game.movePiece(selectedCard, moveId, xinit, yinit);
					setBoard(game.board);
					setSelectCard({});
					setSelectPiece({});
					setAvaMoves([]);
				}
			} else {
				console.error(
					'As posições iniciais ou de destino não foram encontradas.'
				);
			}
		}
	};

	const resetMoves = () => {
		if ('moves' in selectedCard) {
			let listMoves: any[] = [];
			board.forEach((row, x) => {
				row.forEach((cell, y) => {
					if (cell === selectedPiece) {
						selectedCard.moves.forEach((move: MoveType) => {
							let xaxis = x + move.x;
							let yaxis = y + move.y;
							if (
								xaxis > -1 &&
								xaxis < 5 &&
								yaxis > -1 &&
								yaxis < 5
							) {
								if (
									board[xaxis][yaxis].piece?.team !==
									game.playerTurn
								) {
									listMoves.push([xaxis, yaxis]);
								}
							}
						});
					}
				});
			});
			if (listMoves.length > 0) {
				setAvaMoves(listMoves);
			}
		}
	};

	const handleSelectCard = (selected?: CardType) => {
		if (game.winnerTeam === -1) {
			if (selected) {
				setSelectCard(selected);
			} else {
				setSelectCard({});
				setSelectPiece({});
			}
			setAvaMoves([]);
		}
	};

	const handleSelectPiece = (selected?: CellType) => {
		if (selected) {
			setSelectPiece(selected);
		} else {
			setSelectPiece({});
		}
		setAvaMoves([]);
	};

	return (
		<div className="App">
			{game.winnerTeam === -1 ? null : (
				<Typography>
					{game.winnerTeam === 0
						? 'As Pretas venceram'
						: 'As Brancas venceram'}
				</Typography>
			)}
			<div
				style={{
					alignItems: 'center',
					display: 'flex',
					justifyContent: 'center',
					paddingTop: '5%',
				}}
			>
				<Board
					board={board}
					selectedCard={selectedCard}
					selectedPiece={selectedPiece}
					playerTurn={game.playerTurn}
					avMoves={availableMoves}
					resetMoves={resetMoves}
					handleSelect={handleSelectPiece}
					makeMove={makeMove}
				/>
			</div>
			<div
				style={{
					alignItems: 'center',
					display: 'flex',
					justifyContent: 'center',
				}}
			>
				<div style={{ display: 'flex', gap: '5%', padding: '4%' }}>
					{game.availbCards[game.playerTurn].map((card, cardId) => (
						<CardMove
							card={card}
							selectedCard={selectedCard}
							handleSelect={handleSelectCard}
							key={`${cardId}-${card.name}`}
						/>
					))}
				</div>
			</div>
		</div>
	);
}

export default App;
