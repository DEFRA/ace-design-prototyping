//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

// Mural Board Assistant routes

// Mural service home — branch on OAuth state
router.post('/mural-chat/home', (req, res) => {
  const connected = req.session.data['mural-connected']
  res.redirect(connected === 'true' ? '/mural-chat/select-mural' : '/mural-chat/connect-mural')
})

// OAuth handoff — simulate success/failure
router.post('/mural-chat/connect-mural', (req, res) => {
  if (req.session.data['oauth-action'] === 'success') {
    req.session.data['mural-connected'] = 'true'
    res.redirect('/mural-chat/dashboard')
  } else {
    res.redirect('/mural-chat/connect-error')
  }
})

// Board selection → chat
router.post('/mural-chat/select-mural', (req, res) => {
  res.redirect('/mural-chat/chat')
})

// Chat message → PRG loop (append to session, then redirect back)
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
