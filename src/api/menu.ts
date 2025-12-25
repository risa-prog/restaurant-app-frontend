export const getMenus = async () => {
    const res = await fetch("/api/menus");
    const json = await res.json();

  if (!res.ok) {
    console.log(json.message);
    return [];
  }

  return json.data;
};
