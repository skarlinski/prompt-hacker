
// @ts-ignore
import gameLevels from "@/app/gameLevels";
import { NextResponse } from 'next/server'

// @ts-ignore
export default async function handler(req, res) {

    // If the requested level doesn't exist, return a 404 status code and an error message
    // @ts-ignore

    // Check if this is a POST request
    const urlParams = new URLSearchParams(new URL(req.url).search)
    const guess = urlParams.get('guess');
    const levelNumber = urlParams.get('level');

    if (guess ) {
        // If the guess is correct, send a success message
        // Otherwise, send an error message
        // @ts-ignore
        if (guess.toLowerCase() === gameLevels[levelNumber].password.toLowerCase()) {
            // @ts-ignore
            return  NextResponse.json({ message: 'Correct! Taking you to level ' + (parseInt(levelNumber, 10) + 1) }, { status: 200 });
        } else {
            // @ts-ignore
            return  NextResponse.json({ error: 'Incorrect password. Please try again.' }, {status: 400})
        }
    }
    else {
        // @ts-ignore
        return  NextResponse.json({ prompt: gameLevels[levelNumber].defense }, { status: 200 });
    }
}
export const runtime = 'edge';