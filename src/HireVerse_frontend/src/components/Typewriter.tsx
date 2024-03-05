import {useState, useEffect} from 'react';

const useTypewriter = (texts: string[], speed = 50) => {
    const [displayText, setDisplayText] = useState('');

    useEffect(() => {
        let isTyping = true;
        let isDeleting = false;
        let i = -1;
        let counter = 0;
        let objectiveWord = texts[0];

        const getDifferentRandomWord = (initialWord: string) => {
            let wordIdx: number;
            do {
                wordIdx = Math.floor(Math.random() * texts.length);

            } while (texts[wordIdx] === initialWord)

            console.log(`wordIdx: ${wordIdx}, initialWord: ${initialWord}`);
            return texts[wordIdx];
        }

        const typingInterval = setInterval(() => {
            if (isTyping) {
                i++;
                setDisplayText(prevText => prevText + objectiveWord.charAt(i));
            }

            if (isDeleting) {
                setDisplayText(prevText => prevText.substring(0, prevText.length - 1));
                i--;
            }

            // console.log(`i: ${i}, isTyping: ${isTyping}, isDeleting: ${isDeleting}, counter: ${counter}, objectiveWord: ${objectiveWord}`)

            if (!isTyping && !isDeleting) {
                counter++;
                if (counter === 10 && i === objectiveWord.length) {
                    isDeleting = true;
                    counter = 0;
                    console.log("Called")
                    objectiveWord = getDifferentRandomWord(objectiveWord);
                }
                if (counter === 10 && i === -1) {
                    isTyping = true;
                    counter = 0;
                }
            } else {
                if (i === objectiveWord.length) {
                    isTyping = false;
                    isDeleting = false;
                } else if (i === -1) {
                    isTyping = true;
                    isDeleting = false;
                }
            }

        }, speed);

        return () => {
            clearInterval(typingInterval);
        };
    }, [texts, speed]);

    return displayText;
};

const Typewriter = ({texts, speed}: { texts: string[], speed: number }) => {
    const displayText = useTypewriter(texts, speed);

    return (
        <div className="inline-flex flex-row place-items-center">
            <span>
                {displayText}
            </span>
            <span className="input-cursor"></span>
        </div>
    );
};

export default Typewriter;