module.exports = function (router) {
  // Branch on approve/reject decision
  router.post('/mural-chat/approve-review', (req, res) => {
    const decision = req.session.data['approve-decision']
    res.redirect(decision === 'approve' ? '/mural-chat/approve-upload-form' : '/mural-chat/approve-reject-reason')
  })

  // Upload audit form → confirmation
  router.post('/mural-chat/approve-upload-form', (req, res) => {
    res.redirect('/mural-chat/approve-confirmation')
  })

  // Rejection reason → confirmation
  router.post('/mural-chat/approve-reject-reason', (req, res) => {
    res.redirect('/mural-chat/approve-confirmation')
  })
}
