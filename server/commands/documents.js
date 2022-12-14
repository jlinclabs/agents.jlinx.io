import { v4 as uuid } from 'uuid'
import { MissingArgumentError } from 'app-shared/server/errors.js'

export async function create({ name, value }, context){
  if (!value) throw new MissingArgumentError('value', value)
  return context.commands.documents.update({ id: uuid(), name, value })
}

export async function update({ id, name, value }, context){
  context.requireLoggedIn()
  if (!id) throw new MissingArgumentError('id', id)
  if (typeof value === 'undefined')
    throw new MissingArgumentError('value', value)
  // todo enforce userId permissions
  await context.prisma.documentEvent.create({
    data: {
      documentId: id,
      name,
      value,
      userId: context.userId,
    },
  })
  const doc = await context.queries.documents.getOne({ id })
  if (!doc) throw new Error(`failed to create new doc`)
  return doc
}

export async function destroy({ id }, context){
  return context.commands.documents.update({ id, value: null })
}