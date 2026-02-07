import { Card } from "@/stores/game/types";
import { getCardRankLetterFromRep } from "@/utils/getCardRank";

/* Hearts */
import Hearts2 from "./face/hearts_2.svg";
import Hearts3 from "./face/hearts_3.svg";
import Hearts4 from "./face/hearts_4.svg";
import Hearts5 from "./face/hearts_5.svg";
import Hearts6 from "./face/hearts_6.svg";
import Hearts7 from "./face/hearts_7.svg";
import Hearts8 from "./face/hearts_8.svg";
import Hearts9 from "./face/hearts_9.svg";
import Hearts10 from "./face/hearts_10.svg";
import HeartsJ from "./face/hearts_jack.svg";
import HeartsQ from "./face/hearts_queen.svg";
import HeartsK from "./face/hearts_king.svg";
import HeartsA from "./face/hearts_ace.svg";
/* Diamonds */
import Diamonds2 from "./face/diamonds_2.svg";
import Diamonds3 from "./face/diamonds_3.svg";
import Diamonds4 from "./face/diamonds_4.svg";
import Diamonds5 from "./face/diamonds_5.svg";
import Diamonds6 from "./face/diamonds_6.svg";
import Diamonds7 from "./face/diamonds_7.svg";
import Diamonds8 from "./face/diamonds_8.svg";
import Diamonds9 from "./face/diamonds_9.svg";
import Diamonds10 from "./face/diamonds_10.svg";
import DiamondsJ from "./face/diamonds_jack.svg";
import DiamondsQ from "./face/diamonds_queen.svg";
import DiamondsK from "./face/diamonds_king.svg";
import DiamondsA from "./face/diamonds_ace.svg";

/* Clubs */
import Clubs2 from "./face/clubs_2.svg";
import Clubs3 from "./face/clubs_3.svg";
import Clubs4 from "./face/clubs_4.svg";
import Clubs5 from "./face/clubs_5.svg";
import Clubs6 from "./face/clubs_6.svg";
import Clubs7 from "./face/clubs_7.svg";
import Clubs8 from "./face/clubs_8.svg";
import Clubs9 from "./face/clubs_9.svg";
import Clubs10 from "./face/clubs_10.svg";
import ClubsJ from "./face/clubs_jack.svg";
import ClubsQ from "./face/clubs_queen.svg";
import ClubsK from "./face/clubs_king.svg";
import ClubsA from "./face/clubs_ace.svg";

/* Spades */
import Spades2 from "./face/spades_2.svg";
import Spades3 from "./face/spades_3.svg";
import Spades4 from "./face/spades_4.svg";
import Spades5 from "./face/spades_5.svg";
import Spades6 from "./face/spades_6.svg";
import Spades7 from "./face/spades_7.svg";
import Spades8 from "./face/spades_8.svg";
import Spades9 from "./face/spades_9.svg";
import Spades10 from "./face/spades_10.svg";
import SpadesJ from "./face/spades_jack.svg";
import SpadesQ from "./face/spades_queen.svg";
import SpadesK from "./face/spades_king.svg";
import SpadesA from "./face/spades_ace.svg";

/* Jokers */
import JokerRed from "./face/joker_red.svg";
import JokerBlack from "./face/joker_black.svg";

const CARD_FACE_SVG_MAP: Record<string, React.FC<any>> = {
    hearts2: Hearts2,
    hearts3: Hearts3,
    hearts4: Hearts4,
    hearts5: Hearts5,
    hearts6: Hearts6,
    hearts7: Hearts7,
    hearts8: Hearts8,
    hearts9: Hearts9,
    hearts10: Hearts10,
    heartsJ: HeartsJ,
    heartsQ: HeartsQ,
    heartsK: HeartsK,
    heartsA: HeartsA,

    diamonds2: Diamonds2,
    diamonds3: Diamonds3,
    diamonds4: Diamonds4,
    diamonds5: Diamonds5,
    diamonds6: Diamonds6,
    diamonds7: Diamonds7,
    diamonds8: Diamonds8,
    diamonds9: Diamonds9,
    diamonds10: Diamonds10,
    diamondsJ: DiamondsJ,
    diamondsQ: DiamondsQ,
    diamondsK: DiamondsK,
    diamondsA: DiamondsA,

    clubs2: Clubs2,
    clubs3: Clubs3,
    clubs4: Clubs4,
    clubs5: Clubs5,
    clubs6: Clubs6,
    clubs7: Clubs7,
    clubs8: Clubs8,
    clubs9: Clubs9,
    clubs10: Clubs10,
    clubsJ: ClubsJ,
    clubsQ: ClubsQ,
    clubsK: ClubsK,
    clubsA: ClubsA,

    spades2: Spades2,
    spades3: Spades3,
    spades4: Spades4,
    spades5: Spades5,
    spades6: Spades6,
    spades7: Spades7,
    spades8: Spades8,
    spades9: Spades9,
    spades10: Spades10,
    spadesJ: SpadesJ,
    spadesQ: SpadesQ,
    spadesK: SpadesK,
    spadesA: SpadesA,

    heartsX: JokerRed,
    diamondsX: JokerRed,
    clubsX: JokerBlack,
    spadesX: JokerBlack,
};

interface ClassicCardFaceProps {
    card: Card;
    width: number;
    height: number;
}

export function ClassicCardFace({ card, width, height }: ClassicCardFaceProps) {
    const rankLetter = getCardRankLetterFromRep(card.repetition);
    const key = `${card.suit}${rankLetter}`;

    const Face = CARD_FACE_SVG_MAP[key];
    if (!Face) return null;


    return (
        <Face
            width={width}
            height={height}
            viewBox={`0 0 ${234} ${333}`}
            fill="transparent"
        />
    )
}