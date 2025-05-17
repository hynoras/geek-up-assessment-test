import AlbumListPage from "album/pages/list/AlbumListPage"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router"
import MainLayoutPage from "shared/components/layouts/main/MainLayoutPage"
import UserListPage from "user/pages/list/UserListPage"

const App: React.FC = () => {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="albums" />} />
          <Route path="/*" element={<MainLayoutPage />}>
            <Route path="albums" element={<AlbumListPage />} />
            <Route path="users" element={<UserListPage />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  )
}

export default App
