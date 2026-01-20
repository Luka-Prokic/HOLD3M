import { useGameStore } from "@/stores/game/useGameStore";
import { FocusCard } from "../cards/FocusCard";
import { JesterFocusCard } from "../cards/JesterFocusCard";
import { WIDTH, HEIGHT } from "@/utils/Dimensions";
import { Card } from "@/stores/types";
import { CenterCardSlider } from "../ui/sliders/CenterCardSlider";

export function FocusedHand() {
    const { currentHand, currentCardIndex, setCurrentCardIndex } = useGameStore();

    if (currentCardIndex === -1) return null;

    return (
        <CenterCardSlider
            data={currentHand}
            card={({ item }: { item: Card }) => <CardItem card={item} />}
            cardWidth={WIDTH}
            sliderWidth={WIDTH}
            cardHeight={HEIGHT}
            selectedIndex={currentCardIndex}
            selectedCardIndex={currentCardIndex}
            initialScrollIndex={currentCardIndex}
            getItemLayout={(_, index) => ({
                length: WIDTH,
                offset: WIDTH * index,
                index,
            })}
            onSelect={(index) => setCurrentCardIndex(index)}
            animationType="album"
            hideDots
        />
    );
}

function CardItem({ card }: { card: Card }) {
    if (card.repetition >= 0) return <FocusCard card={card} />;

    return <JesterFocusCard card={card} />;
}