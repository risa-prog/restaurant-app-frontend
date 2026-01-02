interface GetMenusParams {
  is_active?: boolean;
  sort?: "created_at_desc";
}

export const getMenus = async (params?: GetMenusParams) => {
  const query = new URLSearchParams();

  if (params?.is_active) {
    query.append("is_active", "1");
  }

  if (params?.sort === "created_at_desc") {
    query.append("sort", params.sort);
  }

  const res = await fetch(`/api/menus?${query.toString()}`);

  let json: any = {};
  try {
    json = await res.json();
  } catch {}

  if (!res.ok) {
    console.error("getMenus error", {
      status: res.status,
      body: json,
    });
    throw new Error("メニューの取得に失敗しました");
  }

  return json.data;
};

export const showMenu = async (menuId: string) => { 
  const res = await fetch(`/api/menus/${menuId}`);

  let json: any = {};
  try { 
    json = await res.json();
  } catch {
    throw new Error("メニューの取得に失敗しました");
  };

  if (!res.ok) { 
    console.error('showMenu', {
      status: res.status,
      body: json,
    });

    if (res.status === 404) { 
      throw new Error("メニューが見つかりません");
    }

    throw new Error("メニューの取得に失敗しました");
  }

  return json.data;
}

export const deleteMenu = async (menuId: string) => {
  const token = localStorage.getItem('token');
  const res = await fetch(`/api/menus/${menuId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  let json: any = {};
  try {
    json = await res.json();
  } catch {
     throw new Error("メニューの削除に失敗しました");
   };

  if (!res.ok) {
    console.error("deleteMenu", {
      status: res.status,
      body: json,
    });
    throw new Error("メニューの削除に失敗しました");
  }

  return json;
};
