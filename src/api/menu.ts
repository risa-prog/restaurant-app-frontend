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

export const deleteMenu = async (menuId: number) => {
  const res = await fetch(`/api/menus/${menuId}`, {
    method: "DELETE",
  });

  let json: any = {};
  try {
    json = await res.json();
  } catch {}

  if (!res.ok) {
    console.error("deleteMenu", {
      status: res.status,
      body: json,
    });
    throw new Error("メニューの削除に失敗しました");
  }

  return json;
};
