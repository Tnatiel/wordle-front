

export const handleEndGame = (word: string, currentGuess: string[], currentRow: number) => {
    if (currentGuess.join('') === word) {
        setTimeout(() => {
            alert('win')
        }, 200);
        return ;
    } 
    if (currentRow > 5) {
        setTimeout(() => {
            alert('Lose')
        }, 200);
        return ;
    } 
}