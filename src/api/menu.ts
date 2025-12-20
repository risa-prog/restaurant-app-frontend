export const getMenus = async () => {
    const res = await fetch("http://localhost:8080/api/menus");
    const json = await res.json();

  if (!res.ok) {
    console.log(json.message);
    return [];
  }

  return json.data;
};
