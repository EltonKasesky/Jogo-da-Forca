import listFruits from "../data/data.js";
import input from 'readline-sync';

//Função para escolher uma palavra aleatória da lista de frutas
const getRandomWord = () => {
    return listFruits[Math.floor(Math.random() * listFruits.length)];
};

//Função para obter o comprimento da palavra escolhida
const getWordLength = (word) => {
    return word.length;
};

//Função para ocultar a palavra escolhida, exibindo apenas a primeira letra e substituindo as outras por sublinhados
const getHiddenWord = (word) => {
    const firstLetter = word[0];
    const underline = "_".repeat(word.length - 1);
    return firstLetter + underline;
};

//Função para exibir a mensagem de boas-vindas ao jogo, mostrando o número de letras na palavra
const showWelcomeMessage = (wordLength) => {
    console.log(`------------JOGO DA FORCA------------`);
    console.log(`Nome da fruta com ${wordLength} letras:`);
};

//Função para obter a letra inserida pelo usuário
const getInputLetter = () => {
    return input.question(`Digite uma letra: `).trim().toLowerCase();
};

//Função para verificar se a entrada do usuário é uma única letra válida
const isValidInput = (input) => {
    return input.length === 1 && /[a-z]/.test(input);
};

//Função para atualizar a palavra oculta com a letra inserida pelo usuário, se estiver correta
const updateHiddenWord = (hiddenWord, letterInputed, chosenWord) => {
    return hiddenWord.split('').map((char, index) => { //Divide a palavra oculta em uma matriz de caracteres
        if (chosenWord[index] === letterInputed) { //Verifica se a letra da palavra escolhida na posição atual é igual à letra inserida pelo jogador
            return letterInputed; //Se for igual, retorna a letra inserida
        }
        return char; //Caso contrário, mantem o caractere da palavra oculta na posição atual
    }).join(''); //Junta os caracteres de volta em uma string
};

//Função para lidar com a entrada do usuário e atualizar a palavra oculta
const handleInput = (chosenWord, hiddenWord, letterInputed, remainingAttempts) => {
    let newHiddenWord = hiddenWord;
    let newRemainingAttempts = remainingAttempts;

    if (!chosenWord.includes(letterInputed)) {
        console.log(`A letra ${letterInputed} não está na palavra. Tentativas restantes: ${remainingAttempts - 1}`);
        newRemainingAttempts--;
    } else {
        newHiddenWord = updateHiddenWord(hiddenWord, letterInputed, chosenWord);
    }

    return { newHiddenWord, newRemainingAttempts };
};

//Função para executar o loop principal do jogo
const runGameLoop = (chosenWord, hiddenWord, remainingAttempts) => {
    while (remainingAttempts > 0) {
        console.log(`Fruta: ${hiddenWord}`);
        const inputedLetter = getInputLetter();

        //Verifica se a entrada do jogador é válida
        if (!isValidInput(inputedLetter)) {
            console.log(`Por favor, digite uma única letra válida.`);
            continue;
        }

        //Atualiza a palavra oculta e o número de tentativas restantes com a entrada do jogador
        const { newHiddenWord, newRemainingAttempts } = handleInput(chosenWord, hiddenWord, inputedLetter, remainingAttempts);

        //Atualiza as variáveis para a próxima iteração
        hiddenWord = newHiddenWord;
        remainingAttempts = newRemainingAttempts;

        if (hiddenWord === chosenWord) {
            console.log(`Parabéns! Você adivinhou a palavra: ${chosenWord}`);
            return; //Encerra o jogo
        }
    }

    console.log(`Você excedeu o número máximo de tentativas. A palavra correta era: ${chosenWord}`);
};

//Função principal que inicia o jogo
const playGame = () => {
    const chosenWord = getRandomWord();
    const wordLength = getWordLength(chosenWord);
    let hiddenWord = getHiddenWord(chosenWord);

    showWelcomeMessage(wordLength);

    const maxAttempts = 3; //Define o número máximo de tentativas
    runGameLoop(chosenWord, hiddenWord, maxAttempts);
};

export default playGame;