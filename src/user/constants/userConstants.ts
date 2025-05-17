import { getAvatarColor } from "user/utils/userAvatarUtils"

export const USER = {
  ROUTES: {
    API: {
      BASE: "/user",
      BASE_PLURAL: "/users",
      BY_NAME: (name: string, hasParamsChain: boolean) =>
        `${hasParamsChain ? "&" : ""}name=${encodeURIComponent(name)}`,
      BY_BACKGROUND: (id: number, hasParamsChain: boolean) =>
        `${hasParamsChain ? "&" : ""}background=${getAvatarColor(id)}`,
      BY_COLOR: (hasParamsChain: boolean) => `${hasParamsChain ? "&" : ""}color=fff`
    }
  }
}
