const API_END_POINT = "https://kdt.roto.codes"; // 반복되는 URL은 상수로 빼주는 것이 좋다

export const request = async (url, options = {}) => {
  try {
    const res = await fetch(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "x-username": "yoon",
      },
    }); // 다음 주소는 인자로 받는다

    if (res.ok) {
      // 중요!!
      return await res.json();
    }
    throw new Error("API 호출 오류");
  } catch (e) {
    alert(e.message);
  }
};

//전체 다큐먼트 불러오기
export const getAllDocumentsData = async () => {
  return await request(`/documents`, {
    method: "GET",
  });
};

// 특정 다큐먼트 불러오기
export const getDocumentsData = async (postId) => {
  return await request(`/documents/${postId}`, {
    method: "GET",
  });
};

//생성
export const createDocumentData = async (title, parent) => {
  return await request(`/documents`, {
    method: "POST",
    body: JSON.stringify({
      title,
      parent,
    }),
  });
};

//수정
export const updateDocumentsData = async (postId, title, content) => {
  await request(`/documents/${postId}`, {
    method: "PUT",
    body: JSON.stringify({
      title,
      content,
    }),
  });
};

//삭제 - 부모 삭제하면 자식들이 다 루트가 됨
export const deleteDocumentsData = async (postId) => {
  await request(`/documents/${postId}`, {
    method: "DELETE",
  });
};
