/**
 * @typedef {Object} Scp
 * @property {number} id
 * @property {string} [itemNumber]
 * @property {string} [objectClass]
 * @property {string} [containmentProcedures]
 * @property {string} [description]
 */

const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const URL_API = 'https://apiscp.azurewebsites.net/api/Scp/';


module.exports = {
    data: new SlashCommandBuilder()
        .setName("scp")
        .setDescription("Informe um número de SCP e receba as informações dele")
        .addStringOption(option =>
            option.setName("número")
                .setDescription("Digite o número do SCP")
                .setRequired(true)
        ),

    async execute(interaction) {
        const scpNumber = interaction.options.getString('número');
        try {
            //fazendo requisição para a api de SCP        
            /**
             * @type {Scp}
             */
            const scp = await getScp(scpNumber);

            const scpEmbed = new EmbedBuilder()
                .setTitle(`SCP-${scp.itemNumber}\nClasse do Objeto: ${scp.objectClass}`)
                .setColor(0x0099FF)
                .setURL(`http://scp-pt-br.wikidot.com/scp-${scpNumber}`)
                .addFields(
                    {
                        name: "Procedimentos de contenção: ", value: scp.containmentProcedures
                    }   
                )
                .setDescription(`${scp.description}`)

            await interaction.reply({ embeds: [scpEmbed] });
        } catch (error) {

            await interaction.reply('Ocorreu um erro ao buscar as informações do SCP. Por favor, entre em contato com o desenvolvedor.');

        }
    }
}


/**
 * 
 * @returns string
 */
async function getScp(scpNumber) {
    const scpData = await fetch(`${URL_API}/${scpNumber}`, {
        method: "GET"
    });
    if (scpData.status == 204) {
        interecation.reply("Não foi possível encontrar o SCP entre em contato com o desenvolvedor do bot");
    }
    const scpJson = await scpData.json();
    return scpJson;
}