export const CHANGE_USERNAME = 'chat/changeUsername'

export const changeUsername = (newUsername) => ({
  type: CHANGE_USERNAME,
  newUsername
})
