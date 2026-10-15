import type { Access } from 'payload'

export const adminOnly: Access = ({ req }) => req.user?.role === 'admin'

export const editorsAndUp: Access = ({ req }) =>
  ['admin', 'editor'].includes((req.user?.role as string) ?? '')

export const salesAndUp: Access = ({ req }) =>
  ['admin', 'sales'].includes((req.user?.role as string) ?? '')

export const anyone: Access = () => true

export const authenticated: Access = ({ req }) => !!req.user

export const publishedOrLoggedIn: Access = ({ req }) => {
  if (req.user) return true
  return { _status: { equals: 'published' } }
}

export const publishedOnly: Access = ({ req }) => {
  if (req.user) return true
  return { status: { equals: 'published' } }
}