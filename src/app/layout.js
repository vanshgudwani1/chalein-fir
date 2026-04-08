import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Chalein Fir - Travel Agency",
  description: "Your adventure begins here. Highly animated travel agency experience.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
