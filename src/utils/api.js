const API_END_POINT = 'https://kdt.roto.codes';

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'x-username': 'yoon',
      },
    });

    if (res.ok) {
      return await res.json();
    }
    throw new Error('API 호출 오류');
  } catch (e) {
    console.log(e.message);
  }
};

// 전체 다큐먼트 불러오기
// await request(`/documents`, {
//     method: 'GET',
//   });

// // 특정 다큐먼트 불러오기
// await request(`/documents/${postId}`, {
//       method: 'GET',
//     });

// // 생성
// await request(`/documents`, {
//   method: 'POST',
//   body: JSON.stringify({
//     title,
//     parent,
//   }),
// });

// 수정
// await request(`/documents/${postId}`, {
//   method: 'PUT',
//   body: JSON.stringify({
//     title,
//     content,
//   }),
// });

// 삭제 - 부모 삭제하면 자식들이 다 루트가 됨
// await request(`/documents/${postId}`, {
//   method: 'DELETE',
// });
