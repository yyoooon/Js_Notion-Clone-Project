import request from './request.js';

export const getDocumentList = () =>
  request(`/documents`, {
    method: 'GET',
  });

export const getDocument = postId =>
  request(`/documents/${postId}`, {
    method: 'GET',
  });

export const createDocument = ({ title, parentId }) =>
  request(`/documents`, {
    method: 'POST',
    body: JSON.stringify({
      title: title || '',
      parent: parentId || null,
    }),
  });

export const updateDocument = ({ postId, title, content }) =>
  request(`/documents/${postId}`, {
    method: 'PUT',
    body: JSON.stringify({
      title,
      content,
    }),
  });

export const deleteDocument = postId =>
  request(`/documents/${postId}`, {
    method: 'DELETE',
  });
