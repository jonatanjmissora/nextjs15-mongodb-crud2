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
          
        </main>
        <Footer />
      </body>
    </html>
  )
}

