import { useGameStore } from "@/stores/game/useGameStore";
import { InputCard } from "../cards/InputCard";
import { JesterInputCard } from "../cards/JesterInputCard";
import { WIDTH } from "@/utils/Dimensions";
import { Card } from "@/stores/types";
import { CenterCardSlider } from "../ui/sliders/CenterCardSlider";

export function FocusedHand() {
    const { currentHand, currentCardIndex, setCurrentCardIndex } = useGameStore();

    const cardHeight = (WIDTH - 48) * 1.4;

    // Always render 5 cards, fill with jesters if needed
    const cardsToShow = [...currentHand];
    while (cardsToShow.length < 5) {
        cardsToShow.push({ id: "jester", repetition: 0, suit: "hearts" } as Card); // undefined will render jester
    }

    return (
        <CenterCardSlider
            data={cardsToShow}
            card={({ item }: { item: Card }) => <CardItem card={item} />}
            cardWidth={WIDTH}
            sliderWidth={WIDTH}
            cardHeight={cardHeight}
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
    if (card.id !== "jester") return <InputCard card={card} />;

    return <JesterInputCard />;
}