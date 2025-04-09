const mineflayer = require('mineflayer');

// Create a bot to connect to the Minecraft server
const bot = mineflayer.createBot({
    host: 'localhost', // Replace with your server's IP or hostname
    port: 25565,       // Replace with your server's port
    username: 'ItemGiverBot' // Replace with the bot's username
});

// Event listener for when the bot successfully logs in
bot.on('login', () => {
    console.log('Bot has logged in to the server!');
});

// Function to give all players an item every 20 ticks (1 second)
function giveItemsToPlayers() {
    const itemName = 'diamond'; // Replace with the desired item
    const itemCount = 1;        // Number of items to give

    const players = Object.keys(bot.players);
    players.forEach(playerName => {
        const player = bot.players[playerName];
        if (player && player.entity) {
            bot.chat(`/give ${playerName} ${itemName} ${itemCount}`, (err) => {
                if (err) {
                    console.error(`Failed to give item to ${playerName}:`, err);
                }
            });
        }
    });
}

// Run the function every 20 ticks (1 second)
setInterval(giveItemsToPlayers, 1000);

// Handle errors
bot.on('error', (err) => {
    console.error('An error occurred:', err);
});

bot.on('end', () => {
    console.log('Bot has disconnected from the server.');
});