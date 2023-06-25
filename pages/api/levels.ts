
// @ts-ignore
import gameLevels from "@/app/gameLevels";

export default function handler(req, res) {
    const levelNumber = req.query.level;
    // If the requested level doesn't exist, return a 404 status code and an error message
    // @ts-ignore
    if (!gameLevels[levelNumber]) {
        res.status(404).json({ error: `Level ${levelNumber} does not exist` });
        return;
    }

    // Check if this is a POST request
    if (req.method === 'POST') {
        const guess = req.body.guess;

        // If the guess is correct, send a success message
        // Otherwise, send an error message
        // @ts-ignore
        if (guess === gameLevels[levelNumber].password) {
            res.json({ message: 'Correct! You can proceed to the next level.' });
        } else {
            res.json({ error: 'Incorrect password. Please try again.' });
        }
    }
    // Otherwise, assume it's a GET request and send the prompt for the requested level
    else {
        // @ts-ignore
        res.json({ prompt: gameLevels[levelNumber].defense });
    }
}
