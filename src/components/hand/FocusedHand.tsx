import { useGameStore } from "@/stores/game/useGameStore";
import { FocusCard } from "../cards/FocusCard";
import { JesterFocusCard } from "../cards/JesterFocusCard";
import { WIDTH } from "@/utils/Dimensions";
import { Card } from "@/stores/types";
import { CenterCardSlider } from "../ui/sliders/CenterCardSlider";
import { Pressable } from "react-native";
import { CardScreenBackground } from "../ui/backgrounds/CardScreenBackground";
import Animated, { FadeIn, FadeOut } from "react-native-reanimated";

export function FocusedHand() {
    const { currentHand, currentCardIndex, setCurrentCardIndex, clearSelection } = useGameStore();

    const cardHeight = (WIDTH - 48) * 1.4;

    // Always render 5 cards, fill with jesters if needed
    const cardsToShow = [...currentHand];
    while (cardsToShow.length < 5) {
        cardsToShow.push({ id: "jester", repetition: 0, suit: "hearts" } as Card); // undefined will render jester
    }

    function handleBgPress() {
        clearSelection();
    }

    return (
        <Animated.View entering={FadeIn} exiting={FadeOut}>
            <Pressable onPress={handleBgPress} style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <CardScreenBackground />
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
            </Pressable>
        </Animated.View>


    );
}

function CardItem({ card }: { card: Card }) {
    if (card.id !== "jester") return <FocusCard card={card} />;

    return <JesterFocusCard />;
}