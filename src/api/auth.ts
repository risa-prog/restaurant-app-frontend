export const register = async (
  name: string,
  email: string,
  password: string,
  passwordConfirmation: string
) => {
  const res = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name,
      email,
      password,
      password_confirmation: passwordConfirmation,
    }),
  });

  let json: any = {};
  try {
    json = await res.json();
  } catch { 
    throw {
      status: res.status,
      message: "新規登録に失敗しました",
    };
  }

  if (!res.ok) {
    console.error("register error", {
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
        message: "新規登録に失敗しました",
      };
    }
  }

  return json;
};

export const login = async (email: string, password: string) => {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  let json: any = {};
  try {
    json = await res.json();
  } catch {
    throw {
      status: res.status,
      message: "ログインに失敗しました",
    };
  }

  if (!res.ok) {
    if (res.status === 422) {
      throw {
        status: 422,
        message: json.message,
        errors: json.errors,
      };
    } else {
      throw {
        status: res.status,
        message: "ログインに失敗しました",
      };
    }
  }

  return json;
};

export const logout = async () => {
  const token = localStorage.getItem("token");
  const res = await fetch("/api/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  let json;
  try {
    json = await res.json();
  } catch {
    throw new Error("サーバーからのレスポンスが不正です");
  }

  if (!res.ok) {
    throw new Error(json.message || "ログアウトに失敗しました");
  }

  localStorage.removeItem("token");

  return json;
};
