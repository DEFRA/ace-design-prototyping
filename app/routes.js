//
// For guidance on how to create routes see:
// https://prototype-kit.service.gov.uk/docs/create-routes
//

const govukPrototypeKit = require('govuk-prototype-kit')
const router = govukPrototypeKit.requests.setupRouter()

require('./routes/mural-chat/auth')(router)
require('./routes/mural-chat/request')(router)
require('./routes/mural-chat/approve')(router)
require('./routes/mural-chat/chat')(router)

