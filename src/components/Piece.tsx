import { PieceType } from '../game/onitama';
import kingW from '../icons/kingW.png';
import kingB from '../icons/kingB.png';
import pawnW from '../icons/pawnW.png';
import pawnB from '../icons/pawnB.png';
import './Board.css';
const Piece = (piece: PieceType) => {
	return (
		<div>
			<img
				style={imageStyles}
				src={
					piece.team === 0
						? piece.role === 'rei'
							? kingB
							: pawnB
						: piece.role === 'rei'
						? kingW
						: pawnW
				}
				alt=""
			/>
		</div>
	);
};
const imageStyles = {
	width: 45,
	height: 45,
	padding: 4,
	borderRadius: 6,
	boxShadow:
		'1px 3px 3px rgba(9, 30, 66, 0.25),0px 0px 1px rgba(9, 30, 66, 0.31)',
	'&:hover': {
		backgroundColor: 'rgba(168, 168, 168, 0.25)',
	},
};
export default Piece;
