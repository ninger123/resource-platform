const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  uid: state => state.user.uid,
  roles: state => state.user.roles,
  name: state => state.user.name,
  phone:state => state.user.phone,
  email: state => state.user.email,
  permission_routes: state => state.permission.routes,
  errorLogs: state => state.errorLog.logs,
}
export default getters
