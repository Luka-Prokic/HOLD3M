import { useSettingsStore } from "@/stores/settings/settingsStore";
import { ClassicCardFace } from "../../../assets/decks/classic/ClassicCardFace";
import { Card } from "@/stores/game/types";



interface CardFaceProps {
    card: Card;
    width: number;
    height: number;
}

export function CardFace({ card, width, height }: CardFaceProps) {
    const { cardDeck } = useSettingsStore();

    switch (cardDeck) {
        case "classic":
            return <ClassicCardFace card={card} width={width} height={height} />;
        default:
            return null;
    }
}