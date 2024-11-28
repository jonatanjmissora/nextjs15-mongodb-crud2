import { Toaster } from "react-hot-toast"
import Footer from "../_components/Footer"
import Header from "../_components/Header"
import "./global.css"

export const metadata = {
  title: 'Next.js + mongosb',
  description: 'App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="h-dvh w-full flex flex-col bg-slate-900">
        <Header />
        <main className="flex-1">

          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#888',
                color: '#fff',
                padding: "1rem 3rem",
                boxShadow: "2px 2px 4px rgba(0,0,0,0.5)",
              },
              success: {
                duration: 2000,
                style: {
                  background: '#5a5',
                  border: '2px solid green',
                },
              },
              error: {
                duration: 4000,
                style: {
                  background: '#a55',
                  border: '2px solid darkred',
                },
              },
            }}
          />
        </main>
        <Footer />
      </body>
    </html>
  )
}

