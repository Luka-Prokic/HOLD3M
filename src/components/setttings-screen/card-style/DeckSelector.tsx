import { QueenButton } from "@/components/ui/buttons/QueenButton";
import { CenterCardSlider } from "@/components/ui/sliders/CenterCardSlider";
import { IText } from "@/components/ui/texts/IText";
import { useSettingsStore } from "@/stores/settings/settingsStore";

export default function DeckSelector() {
    const { decks } = useSettingsStore();

    return (
        <CenterCardSlider
            data={decks}
            card={({ item }) => <CardDeckItem name={item} />}
            cardHeight={64}
            cardWidth={128}
            animationType="flat"
            hideDots
        />
    );
}

function CardDeckItem({ name }: { name: string }) {
    const { setCardDeck, cardDeck } = useSettingsStore();

    return (
        <QueenButton onPress={() => setCardDeck(name)} themeType={cardDeck === name ? "tint" : "theme"}>
            <IText text={name} />
        </QueenButton>
    );
}