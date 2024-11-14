import Card from '@mui/material/Card';
import { CardContent } from '@mui/material';
import { Typography } from '@mui/material';
import { CardType } from '../game/onitama';

interface CardMoveProps {
	card: CardType;
	selectedCard: any;
	handleSelect: (isSelected?: CardType) => void;
}

export default function CardMove({
	card,
	selectedCard,
	handleSelect,
}: CardMoveProps) {
	const handleClick = () => {
		if (selectedCard === card) {
			handleSelect();
		} else {
			handleSelect(card);
		}
	};
	return (
		<Card
			onClick={handleClick}
			sx={{
				cursor: 'pointer',
				backgroundColor: selectedCard === card ? '#90caf9' : '#ffffff',
				border:
					selectedCard === card
						? '2px solid #1976d2'
						: '1px solid #e0e0e0',
				transition: 'background-color 0.3s, border 0.3s',
				maxWidth: 345,
			}}
		>
			<CardContent>
				Nome:
				<Typography gutterBottom variant="h5" component="div">
					{card.name}
				</Typography>
				<Typography variant="body2" sx={{ color: 'text.secondary' }}>
					<div style={{ display: 'flex' }}>
						{card.moves.map((move, modeId) => (
							<div key={modeId}>
								x: {move.x}, y:{move.y}
							</div>
						))}
					</div>
				</Typography>
			</CardContent>
		</Card>
	);
}
