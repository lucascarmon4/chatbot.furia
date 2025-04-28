import responsesData from "../data/responses.json";

type Estatisticas = {
    [key: string]: string;
};
  
interface Responses {
    proximo_jogo: string;
    resultado: string;
    estatisticas: Estatisticas;
    noticias: string[];
    curiosidades: string[];
    motivacional: string[];
}

const responses = responsesData as Responses;

const getRandom = (array: string[]) => {
    return array[Math.floor(Math.random() * array.length)];
};

export function getBotResponse(userInput: string): string {
    const normalized = userInput
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");


    if (normalized.includes("proximo jogo")) {
        return responses.proximo_jogo;
    }

    if (normalized.includes("resultado")) {
        return responses.resultado;
    }

    if (normalized.includes("estatisticas")) {
        const players = Object.keys(responses.estatisticas);
      
        for (const player of players) {
            if (normalized.includes(player)) {
                return responses.estatisticas[player];
            }
        }
      
        // Se nenhum jogador específico foi mencionado,
        // monta uma lista de todos os jogadores
        const allStats = players.map((player) => `• ${responses.estatisticas[player]}`).join("\n");
        
        return `📊 Estatísticas da equipe:\n${allStats}`;
    }

    if (normalized.includes("noticias")) {
        return getRandom(responses.noticias);
    }

    if (normalized.includes("curiosidades")) {
        return getRandom(responses.curiosidades);
    }

    if (normalized.includes("motivacional")) {
        return getRandom(responses.motivacional);
    }

  return "Desculpe, não entendi. Tente: 'próximo jogo', 'estatísticas do FalleN', 'curiosidades', 'notícias', 'motivacional' ou 'quiz'.";
}
