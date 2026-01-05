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
  }

  if (!res.ok) {
    console.error("showMenu", {
      status: res.status,
      body: json,
    });

    if (res.status === 404) {
      throw new Error("メニューが見つかりません");
    }

    throw new Error("メニューの取得に失敗しました");
  }

  return json.data;
};

export const createMenu = async (
  name: string,
  price: number,
  isActive: boolean,
  description?: string,
  image?: File | null
) => {
  const token = localStorage.getItem("token");

  const formData = new FormData();
  formData.append("name", name);
  formData.append("price", String(price));
  formData.append("is_active", isActive ? "1" : "0");

  if (description) { 
    formData.append("description", description);
  }

  if (image) { 
    formData.append("image", image);
  }

  const res = await fetch("/api/menus", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  let json: any = {};
  try {
    json = await res.json();
  } catch {
   throw {
     status: res.status,
     message: "メニューの作成に失敗しました",
   };
  }

  if (!res.ok) {
    console.error("createMenu error", {
      status: res.status,
      body: json,
    });
    if (res.status === 422) {
      throw {
        status: 422,
        message: json.message,
        errors: json.errors,
      };
    } else { 
      throw {
        status: res.status,
        message: "メニューの作成に失敗しました",
      }
    }
  }

  return json;
};
