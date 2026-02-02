import { FocusCard } from "../cards/FocusCard";
import { JesterFocusCard } from "../cards/JesterFocusCard";
import { WIDTH } from "@/utils/Dimensions";
import { Card, Hand } from "@/stores/game/types";
import { CenterCardSlider } from "../ui/sliders/CenterCardSlider";

interface PreviewHandProps {
    hand: Hand;
    selectedCardIndex?: number;
    setSelectedCardIndex?: (index: number) => void;
}

export function PreviewHand({ hand, selectedCardIndex, setSelectedCardIndex }: PreviewHandProps) {
    const cardHeight = (WIDTH - 32) * 1.4 + 64;

    if (selectedCardIndex === -1) return null;

    return (
        <CenterCardSlider
            data={hand.cards}
            card={({ item }: { item: Card }) => <CardItem card={item} />}
            cardWidth={WIDTH}
            sliderWidth={WIDTH}
            cardHeight={cardHeight}
            sliderHeight={cardHeight}
            selectedIndex={selectedCardIndex}
            initialScrollIndex={selectedCardIndex}
            getItemLayout={(_, index) => ({
                length: WIDTH,
                offset: WIDTH * index,
                index,
            })}
            onSelect={(index) => setSelectedCardIndex?.(index)}
            animationType="album"
            hideDots
            cardStyle={{ paddingBottom: 64 }}
        />
    );
}

function CardItem({ card }: { card: Card }) {
    if (card.repetition >= 0) return <FocusCard card={card} />;

    return <JesterFocusCard card={card} />;
}