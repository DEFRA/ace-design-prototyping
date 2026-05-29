module.exports = function (router) {
  router.post('/mural-chat/home', (req, res) => {
    const connected = req.session.data['mural-connected']
    res.redirect(connected === 'true' ? '/mural-chat/select-mural' : '/mural-chat/connect-mural')
  })

  router.post('/mural-chat/connect-mural', (req, res) => {
    if (req.session.data['oauth-action'] === 'success') {
      req.session.data['mural-connected'] = 'true'
      res.redirect('/mural-chat/dashboard')
    } else {
      res.redirect('/mural-chat/connect-error')
    }
  })

  router.post('/mural-chat/select-mural', (req, res) => {
    res.redirect('/mural-chat/chat')
  })

  router.post('/mural-chat/add-board', (req, res) => {
    const name = (req.session.data['new-board-name'] || '').trim()
    if (!name) {
      return res.redirect('/mural-chat/add-board')
    }

    const boards = req.session.data['mural-boards'] || []
    const id = 'board-' + Date.now()
    const hint = (req.session.data['new-board-hint'] || '').trim()

    boards.push({ id, name, hint: hint || undefined })
    req.session.data['mural-boards'] = boards

    // Clear the form fields
    req.session.data['new-board-name'] = ''
    req.session.data['new-board-hint'] = ''

    res.redirect('/mural-chat/select-mural')
  })
}
