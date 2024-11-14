import React from 'react';
import Piece from './Piece';
import { CellType } from '../game/onitama';
import './Board.css';

interface CellProps {
	cell: CellType;
	selectedCard: any;
	selectedPiece: any;
	playerTurn: number;
	isAvMove: boolean;
	handleSelect: (selected?: CellType) => void;
	makeMove: (destinatio: CellType) => void;
}

const Cell = ({
	cell,
	selectedCard,
	selectedPiece,
	playerTurn,
	isAvMove,
	handleSelect,
	makeMove,
}: CellProps) => {
	const handleClick = () => {
		// TODO: Melhorar o bug de quando seleciona uma peça ele continua com a peça marcada quando desseleciona a carta
		if (selectedCard.name) {
			if (cell.piece) {
				if (cell.piece.team === playerTurn) {
					if (selectedPiece === cell) {
						handleSelect();
					} else {
						handleSelect(cell);
					}
				} else if (isAvMove) {
					makeMove(cell);
				}
			} else if (isAvMove) {
				makeMove(cell);
			}
		}
	};
	return (
		<div
			className="cell"
			style={{
				background: isAvMove ? '#775C91' : cell.color,
				border:
					selectedPiece === cell
						? '1px solid #1976d2'
						: '1px solid #8e8649',
			}}
			onClick={handleClick}
		>
			{cell.piece ? <Piece {...cell.piece} /> : null}
		</div>
	);
};
export default Cell;
