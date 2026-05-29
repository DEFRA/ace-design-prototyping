module.exports = function (router) {
  // Admin check
  router.post('/mural-chat/request-mural', (req, res) => {
    const isAdmin = req.session.data['is-admin']
    res.redirect(isAdmin === 'yes' ? '/mural-chat/request-board-details' : '/mural-chat/request-not-admin')
  })

  // Store board details and go to check answers
  router.post('/mural-chat/request-board-details', (req, res) => {
    res.redirect('/mural-chat/request-check-answers')
  })

  // Simulate Mural API cross-reference
  router.post('/mural-chat/request-check-answers', (req, res) => {
    const apiCheck = req.session.data['api-check']

    if (apiCheck === 'pass') {
      const requests = req.session.data['pending-requests'] || []
      const today = new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })

      requests.push({
        id: 'req-' + Date.now(),
        boardName: req.session.data['board-name'] || req.session.data['board-id'] || 'Unknown board',
        workspaceId: req.session.data['workspace-id'] || '',
        boardId: req.session.data['board-id'] || '',
        requestedBy: req.session.data['iao-email'] || 'Service administrator',
        dateSubmitted: today
      })

      req.session.data['pending-requests'] = requests
      res.redirect('/mural-chat/request-confirmation')
    } else {
      res.redirect('/mural-chat/request-access-error')
    }
  })
}
