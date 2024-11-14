import React from 'react';
import Cell from './Cell';
import { CellType } from '../game/onitama';
import './Board.css';

interface BoardProps {
	board: CellType[][];
	selectedCard: any;
	selectedPiece: any;
	playerTurn: number;
	avMoves: number[][];
	resetMoves: () => void;
	handleSelect: (selected?: CellType) => void;
	makeMove: (destinatio: CellType) => void;
}

const Board = ({
	board,
	selectedCard,
	selectedPiece,
	playerTurn,
	avMoves,
	resetMoves,
	handleSelect,
	makeMove,
}: BoardProps) => {
	if (selectedCard.moves && selectedPiece.color && avMoves.length === 0) {
		resetMoves();
	}
	return (
		<div className="board">
			{Object.values(board).map((row, rowId) => (
				<div key={rowId} className="board-row">
					{row.map((cell, colId) => (
						<Cell
							key={colId}
							cell={cell}
							selectedCard={selectedCard}
							selectedPiece={selectedPiece}
							playerTurn={playerTurn}
							isAvMove={
								(avMoves || []).findIndex(
									(move) =>
										move[0] === rowId && move[1] === colId
								) !== -1
							}
							handleSelect={handleSelect}
							makeMove={makeMove}
						/>
					))}
				</div>
			))}
		</div>
	);
};
export default Board;
