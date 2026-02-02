import { useGameStore } from "@/stores/game/gameStore";
import { FocusCard } from "../cards/FocusCard";
import { JesterFocusCard } from "../cards/JesterFocusCard";
import { WIDTH } from "@/utils/Dimensions";
import { Card } from "@/stores/game/types";
import { CenterCardSlider } from "../ui/sliders/CenterCardSlider";
import { useAnimationStore } from "@/stores/animation/animationStore";

export function FocusedHand() {
    const { currentHand, currentCardIndex, setCurrentCardIndex } = useGameStore();
    const { handAnimationPosition } = useAnimationStore();


    const cardHeight = (WIDTH - 32) * 1.4 + 64;

    if (currentCardIndex === -1) return null;

    return (
        <CenterCardSlider
            data={currentHand}
            card={({ item }: { item: Card }) => <CardItem card={item} />}
            cardWidth={WIDTH}
            sliderWidth={WIDTH}
            cardHeight={cardHeight}
            sliderHeight={cardHeight}
            selectedIndex={currentCardIndex}
            initialScrollIndex={currentCardIndex}
            getItemLayout={(_, index) => ({
                length: WIDTH,
                offset: WIDTH * index,
                index,
            })}
            onSelect={(index) => setCurrentCardIndex(index)}
            animationType="album"
            hideDots
            cardStyle={{ paddingBottom: 64 }}
            disableScroll={handAnimationPosition === "focus"}
        />
    );
}

function CardItem({ card }: { card: Card }) {
    if (card.repetition >= 0) return <FocusCard card={card} />;

    return <JesterFocusCard card={card} />;
}