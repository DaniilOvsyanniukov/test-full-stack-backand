const { Tree } = require('../db/familyModel')

const listFamily = async (userId) => {
  const members = await Tree.find({ owner: userId })
  return members
}

const getFamilyId = async (memberId) => {
  const member = await Tree.find({ _id: memberId })
  if (Object.keys(member).length === 0) { return undefined }
  return member
}

const removeFamily = async (memberId) => {
  const member = await getFamilyId(memberId)
  if (!member) { return undefined }
  await Tree.findByIdAndRemove(memberId)
  return member
}

const addFamily = async (body) => {
  console.log(body)
  const { name, age, parents, owner } = body
  const tree = new Tree({ name, age, parents, owner })
  await tree.save()
  return body
}

const updateFamily = async (memberId, body, Id) => {
  const member = await getFamilyId(memberId, Id)
  if (!member) { return undefined }
  const { name, age, parents, owner } = body
  await Tree.findByIdAndUpdate(memberId, { $set: { name, age, parents, owner } })
  return body
}

module.exports = {
  listFamily,
  getFamilyId,
  removeFamily,
  addFamily,
  updateFamily,
}
