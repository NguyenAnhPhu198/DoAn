import templateItems from "./template"
import serviceItems from "@/config/nav"
import dashboardItems from "./dashboard"
import authItems from "./auth"

export default [
  ...dashboardItems,
  ...serviceItems,
  ...authItems,
  ...templateItems,
]