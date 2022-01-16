import { LoseDialog } from "./LoseDialog"
import { WinDialog } from "./WinDialog"




export const GameDialog = ({isWon, isLost}: {isWon: boolean, isLost: boolean}) => {
    return (
        <>
            {isWon && <WinDialog />}
            {isLost && <LoseDialog />}
        </>
    )
}