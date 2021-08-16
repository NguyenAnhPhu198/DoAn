import templateItems from "./template"
import serviceItems from "@/mixins/nav"
import dashboardItems from "./dashboard"

function navItemsAvailable() {
  const nav = [
    ...dashboardItems,
    ...serviceItems,
    ...templateItems,
  ];

  return nav.filter((item) => {
    if (!item.visible_on) {
      return true
    }
    if (Array.isArray(item.visible_on)) {
      return item.visible_on.includes(process.env.NODE_ENV)
    }
    return item.visible_on == process.env.NODE_ENV
  })
}

export default navItemsAvailable()