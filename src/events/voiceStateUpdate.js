module.exports = {
    name: "voiceStateUpdate",
    async execute(oldState, newState) {
        if (newState.channelId === "947832425025769512") {
            await newState.guild.channels.create(`🎗️・${newState.member.displayName}`, {
                type: "GUILD_VOICE",
                parent: "947832380280950855",
                permissionOverwrites: [
                    {
                        id: newState.member.id,
                        allow: ['MANAGE_CHANNELS']
                    }
                ]
            }).then(vc => {
                newState.member.voice.setChannel(vc).catch(() => {});
            })
        }
        if (
            oldState.channel?.parentId === "947832380280950855" &&
            oldState.channel.id !== "947832425025769512" &&
            oldState.channel.members.size === 0
          ) {
            await oldState.channel.delete().catch(() => {});
          }
        
    } 
}