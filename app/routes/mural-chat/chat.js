module.exports = function (router) {
  // PRG loop — append user message and simulated reply to session, then redirect
  router.post('/mural-chat/chat', (req, res) => {
    const messages = req.session.data['chat-messages'] || []
    const userMsg = req.session.data['chat-input']
    if (userMsg && userMsg.trim()) {
      messages.push({ role: 'user', text: userMsg })
      messages.push({ role: 'agent', text: 'This is a simulated response about your Mural board. In a real implementation, this would use the Mural MCP to read the board and generate a contextual AI response.' })
      req.session.data['chat-messages'] = messages
      req.session.data['chat-input'] = ''
    }
    res.redirect('/mural-chat/chat')
  })
}
