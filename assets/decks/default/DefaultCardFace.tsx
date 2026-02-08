import { Card } from "@/stores/game/types";
import { getCardRankLetterFromRep } from "@/utils/getCardRank";

/* Hearts */
import Hearts2 from "./face/HEART-2.svg";
import Hearts3 from "./face/HEART-3.svg";
import Hearts4 from "./face/HEART-4.svg";
import Hearts5 from "./face/HEART-5.svg";
import Hearts6 from "./face/HEART-6.svg";
import Hearts7 from "./face/HEART-7.svg";
import Hearts8 from "./face/HEART-8.svg";
import Hearts9 from "./face/HEART-9.svg";
import Hearts10 from "./face/HEART-10.svg";
import HeartsJ from "./face/HEART-11-JACK.svg";
import HeartsQ from "./face/HEART-12-QUEEN.svg";
import HeartsK from "./face/HEART-13-KING.svg";
import HeartsA from "./face/HEART-1.svg";

/* Diamonds */
import Diamonds2 from "./face/DIAMOND-2.svg";
import Diamonds3 from "./face/DIAMOND-3.svg";
import Diamonds4 from "./face/DIAMOND-4.svg";
import Diamonds5 from "./face/DIAMOND-5.svg";
import Diamonds6 from "./face/DIAMOND-6.svg";
import Diamonds7 from "./face/DIAMOND-7.svg";
import Diamonds8 from "./face/DIAMOND-8.svg";
import Diamonds9 from "./face/DIAMOND-9.svg";
import Diamonds10 from "./face/DIAMOND-10.svg";
import DiamondsJ from "./face/DIAMOND-11-JACK.svg";
import DiamondsQ from "./face/DIAMOND-12-QUEEN.svg";
import DiamondsK from "./face/DIAMOND-13-KING.svg";
import DiamondsA from "./face/DIAMOND-1.svg";

/* Clubs */
import Clubs2 from "./face/CLUB-2.svg";
import Clubs3 from "./face/CLUB-3.svg";
import Clubs4 from "./face/CLUB-4.svg";
import Clubs5 from "./face/CLUB-5.svg";
import Clubs6 from "./face/CLUB-6.svg";
import Clubs7 from "./face/CLUB-7.svg";
import Clubs8 from "./face/CLUB-8.svg";
import Clubs9 from "./face/CLUB-9.svg";
import Clubs10 from "./face/CLUB-10.svg";
import ClubsJ from "./face/CLUB-11-JACK.svg";
import ClubsQ from "./face/CLUB-12-QUEEN.svg";
import ClubsK from "./face/CLUB-13-KING.svg";
import ClubsA from "./face/CLUB-1.svg";

/* Spades */
import Spades2 from "./face/SPADE-2.svg";
import Spades3 from "./face/SPADE-3.svg";
import Spades4 from "./face/SPADE-4.svg";
import Spades5 from "./face/SPADE-5.svg";
import Spades6 from "./face/SPADE-6.svg";
import Spades7 from "./face/SPADE-7.svg";
import Spades8 from "./face/SPADE-8.svg";
import Spades9 from "./face/SPADE-9.svg";
import Spades10 from "./face/SPADE-10.svg";
import SpadesJ from "./face/SPADE-11-JACK.svg";
import SpadesQ from "./face/SPADE-12-QUEEN.svg";
import SpadesK from "./face/SPADE-13-KING.svg";
import SpadesA from "./face/SPADE-1.svg";

/* Jokers */
import JokerRed from "./face/JOKER-3.svg";
import JokerBlack from "./face/JOKER-2.svg";

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

interface DefaultCardFaceProps {
    card: Card;
    width: number;
    height: number;
}

export function DefaultCardFace({ card, width, height }: DefaultCardFaceProps) {
    const rankLetter = getCardRankLetterFromRep(card.repetition);
    const key = `${card.suit}${rankLetter}`;

    const Face = CARD_FACE_SVG_MAP[key];
    if (!Face) return null;


    return (
        <Face
            width={width}
            height={height}
            fill="transparent"
        />
    )
}