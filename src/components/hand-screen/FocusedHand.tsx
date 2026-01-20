import { useGameStore } from "@/stores/game/useGameStore";
import { FocusCard } from "../cards/FocusCard";
import { JesterFocusCard } from "../cards/JesterFocusCard";
import { WIDTH, HEIGHT } from "@/utils/Dimensions";
import { Card } from "@/stores/types";
import { CenterCardSlider } from "../ui/sliders/CenterCardSlider";

export function FocusedHand() {
    const { currentHand, currentCardIndex, setCurrentCardIndex } = useGameStore();

    // Always render 5 cards, fill with jesters if needed
    const cardsToShow = [...currentHand];
    while (cardsToShow.length < 5) {
        cardsToShow.push({ id: "jester", repetition: 0, suit: "hearts" } as Card); // undefined will render jester
    }

    if (currentCardIndex === -1) return null;

    return (
        <CenterCardSlider
            data={cardsToShow}
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
            hideDots
        />
    );
}

function CardItem({ card }: { card: Card }) {
    if (card.id !== "jester") return <FocusCard card={card} />;

    return <JesterFocusCard />;
}